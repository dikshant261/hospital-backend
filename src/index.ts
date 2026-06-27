import express from "express";
import userRoute from "./routes/user.route.js"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.Frontend_Url || 'http://localhost:5173',
    credentials: true
}));
app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.use("/user", userRoute);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});