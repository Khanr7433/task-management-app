import express from "express";
import { Task } from "../models/Task.js";

const router = express.Router();

// Create a Task
router.post("/", async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newTask = new Task({
            title,
            description,
            status,
            dueDate,
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Get All Tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
