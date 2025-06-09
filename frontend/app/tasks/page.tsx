"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import TaskTable from "@/tables/taskTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";

type Task = {
  id: number;
  title: string;
  assigned_to: number;
  assigned_user: string;
  priority: number;
  deadline: string;
  is_completed: boolean;
};

const Page = () => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState<string | null>(null);
  const [deadline, setDeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = async () => {
    if (!title || !assignedTo || priority === null || !deadline) {
      alert("Please fulfill all fields");
      return;
    }

    setIsLoading(true);

    const newTask = {
      title,
      assigned_to: Number(assignedTo),
      priority,
      deadline,
      is_completed: false,
    };

    console.log("Sending task: ", newTask);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error("Task could not be added");

      alert("Task added successfully");

      // Reset form fields
      setTitle("");
      setAssignedTo("");
      setPriority("");
      setDeadline("");
    } catch (error) {
      console.error(error);
      alert("Error adding task");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Tasks</h1>
        <p className="text-muted-foreground">Manage and track your tasks</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <motion.form
          className="w-full h-full lg:col-span-1 space-y-4 border p-2 rounded-xl flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center mt-8">Add New Task</h2>

          <div className="space-y-2">
            <Label htmlFor="assigned_to">Assigned To (User ID)</Label>
            <Input
              id="assigned_to"
              type="number"
              placeholder="User ID"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              placeholder="Task Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select onValueChange={(value) => setPriority(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Task"}
          </Button>
        </motion.form>
        <motion.section
          className="lg:col-span-2 border p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TaskTable tasks={tasks} />
        </motion.section>
      </div>
    </div>
  );
};

export default function ProtectedTasksPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProtectedRoute>
  );
}
