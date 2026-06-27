import express from "express";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
//user login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" })
        }

        const user = await prisma.user.findUnique({ where: { email }, include: { roles: true } })

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            roles: user.roles.map(role => role.name),
        }, process.env.JWT_SECRET as string, { expiresIn: '1d' })

        const { password: _, ...userWithoutPassword } = user;
        // For now, just return the user

        res.json({
            token,
            userWithoutPassword
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//get menus

router.get("/menus", authMiddleware, async (req: any, res: any) => {
    try {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                roles: {
                    include: {
                        menus: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Remove duplicate menus if multiple roles share them
        const menus = [
            ...new Map(
                user.roles
                    .flatMap((role) => role.menus)
                    .map((menu) => [menu.id, menu])
            ).values(),
        ];

        res.json({
            status: true,
            message: "Menus fetched successfully",
            menus,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
export default router;