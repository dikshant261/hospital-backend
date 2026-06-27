import { prisma } from "../lib/prisma.js";

async function main() {
    // Roles
    const adminRole = await prisma.role.upsert({
        where: { name: "Admin" },
        update: {},
        create: {
            name: "Admin",
        },
    });

    const doctorRole = await prisma.role.upsert({
        where: { name: "Doctor" },
        update: {},
        create: {
            name: "Doctor",
        },
    });

    const frontDeskRole = await prisma.role.upsert({
        where: { name: "Frontdesk" },
        update: {},
        create: {
            name: "Frontdesk",
        },
    });

    // Menus
    await prisma.menu.upsert({
        where: { path: "/dashboard" },
        update: {},
        create: {
            title: "Dashboard",
            path: "/dashboard",
            icon: "LayoutDashboard",
            access: {
                connect: [
                    { id: adminRole.id },
                    { id: doctorRole.id },
                    { id: frontDeskRole.id },
                ],
            },
        },
    });

    await prisma.menu.upsert({
        where: { path: "/patients" },
        update: {},
        create: {
            title: "Patients",
            path: "/patients",
            icon: "Users",
            access: {
                connect: [
                    { id: adminRole.id },
                    { id: doctorRole.id },
                    { id: frontDeskRole.id },
                ],
            },
        },
    });

    await prisma.menu.upsert({
        where: { path: "/appointments" },
        update: {},
        create: {
            title: "Appointments",
            path: "/appointments",
            icon: "Calendar",
            access: {
                connect: [
                    { id: doctorRole.id },
                    { id: frontDeskRole.id },
                ],
            },
        },
    });

    await prisma.menu.upsert({
        where: { path: "/doctors" },
        update: {},
        create: {
            title: "Doctors",
            path: "/doctors",
            icon: "Stethoscope",
            access: {
                connect: [
                    { id: adminRole.id },
                    { id: frontDeskRole.id },
                ],
            },
        },
    });

    await prisma.menu.upsert({
        where: { path: "/users" },
        update: {},
        create: {
            title: "User Management",
            path: "/users",
            icon: "Shield",
            access: {
                connect: [{ id: adminRole.id }],
            },
        },
    });

    await prisma.user.create({
        data: {
            name: "Admin User",
            email: "admin@test.com",
            password: "123456",
            roles: {
                connect: [{ id: adminRole.id }],
            },
        },
    });

    await prisma.user.create({
        data: {
            name: "Doctor User",
            email: "doctor@test.com",
            password: "123456",
            roles: {
                connect: [{ id: doctorRole.id }],
            },
        },
    });

    await prisma.user.create({
        data: {
            name: "Front Desk User",
            email: "frontdesk@test.com",
            password: "123456",
            roles: {
                connect: [{ id: frontDeskRole.id }],
            },
        },
    });
    console.log("✅ Seed completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });