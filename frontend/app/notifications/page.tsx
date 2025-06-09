"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import NotificationTable from "@/tables/notificationTable";
import ProtectedRoute from "@/components/ProtectedRoute";


const Page = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmit = async () => {
    if (!userId || !message) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: Number(userId),
          message,
          is_read: false,
        }),
      });

      if (!res.ok) throw new Error("Failed to create notification");
      alert("Notification created successfully");

      setUserId("");
      setMessage("");
      setIsRead(false);
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error(error);
      alert("Error creating notification");
    }
  };

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-center text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Manage notifications for users</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <motion.form
          className="w-full h-[calc(100vh-400px)] lg:col-span-1 space-y-4 border p-4 rounded-xl flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-center">Add Notification</h2>

          <div className="space-y-4">
            <Label htmlFor="user_id">User ID</Label>
            <Input
              id="user_id"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 space-y-4">
            <Switch
              id="is_private"
              checked={isRead}
              onCheckedChange={setIsRead}
            />
            <Label htmlFor="is_private">Mark as Read</Label>
          </div>

          <Button type="button" className="w-full" onClick={handleSubmit}>
            Create Notification
          </Button>
        </motion.form>

        <motion.section
          className="lg:col-span-2 border rounded-xl h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NotificationTable userId={userId} refreshKey={refreshKey}/>
        </motion.section>
      </div>
    </div>
  );
};

export default function ProtectedNotificationsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProtectedRoute>
  );
}
