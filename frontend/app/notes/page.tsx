"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import NoteTable from "@/tables/noteTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";

const Page = () => {
  const [customerId, setCustomerId] = useState("");
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async () => {
    if (!customerId || !userId || !content) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: Number(customerId),
          user_id: Number(userId),
          content,
          is_private: isPrivate,
        }),
      });

      if (!res.ok) throw new Error("Failed to create note");
      alert("Note created successfully");

      setCustomerId("");
      setUserId("");
      setContent("");
      setIsPrivate(false);
    } catch (error) {
      console.error(error);
      alert("Error creating note");
    }
  };

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-center text-2xl font-bold">Notes</h1>
        <p className="text-muted-foreground"> Manage your notes</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <motion.form
          className="w-full h-full lg:col-span-1 space-y-4 border p-4 rounded-xl flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center mt-4">Add Note</h2>

          <div className="space-y-2">
            <Label htmlFor="customer_id">Customer ID</Label>
            <Input
              id="customer_id"
              type="number"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user_id">User ID</Label>
            <Input
              id="user_id"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_private"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
            <Label htmlFor="is_private">Private Note</Label>
          </div>

          <Button type="button" className="w-full" onClick={handleSubmit}>
            Create Note
          </Button>
        </motion.form>

        <motion.section
          className="lg:col-span-2 border rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NoteTable />
        </motion.section>
      </div>
    </div>
  );
};

export default function ProtectedNotesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProtectedRoute>
  );
}
