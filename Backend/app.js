import express from "express";
import cors from "cors";
import employeeRouter from "./src/routers/employees.router.js";

const app = express();

app.use(cors());
app.use(express.json());

// Use the router
app.use("/api/employees", employeeRouter);


export { app };