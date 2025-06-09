"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CommunicationTable from "@/tables/communicationTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";

const Page = () => {
  const [userId, setUserId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!userId || !customerId || !type || !content) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/communications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: Number(userId),
            customer_id: Number(customerId),
            type,
            content,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create communication");
      alert("Communication created successfully");

      setUserId("");
      setCustomerId("");
      setType("");
      setContent("");
    } catch (error) {
      console.error(error);
      alert("Error creating communication");
    }
  };

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Communications</h1>
        <p className="text-muted-foreground">
          Manage your communication with your customers
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.form
          className="w-full h-full lg:col-span-1 space-y-4 border p-4 rounded-xl flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-center text-2xl font-bold">
            Add New Communication
          </h2>

          <div className="space-y-2">
            <Label htmlFor="user_id">User ID</Label>
            <Input
              id="user_id"
              type="number"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_id">Customer ID</Label>
            <Input
              id="customer_id"
              type="number"
              placeholder="Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              type="text"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button type="button" className="w-full" onClick={handleSubmit}>
            Create
          </Button>
        </motion.form>

        <motion.section
          className="w-full lg:col-span-2 border p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center">Communication Lists</h2>
          <CommunicationTable />
        </motion.section>
      </div>
    </div>
  );
};

export default function ProtectedCommunicationsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProtectedRoute>
  );
}
