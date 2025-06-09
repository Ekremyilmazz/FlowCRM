"use client";

import { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ProductRoute from "@/components/ProtectedRoute";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ActivityLogTable = dynamic(() => import("@/tables/activityLogTable"), {
  ssr: false,
  loading: () => <p className="text-center">Loading activity log...</p>,
});

const Page = () => {
  const [userId, setUserId] = useState("");
  const [action, setAction] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  const handleSubmit = useCallback(async () => {
    if (!userId || !action || !ipAddress) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/activity-log`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            action,
            ip_address: ipAddress,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add activity log");
      alert("Activity log added successfully");

      setUserId("");
      setAction("");
      setIpAddress("");
    } catch (error) {
      console.error(error);
      alert("Error adding activity log");
    }
  }, [userId, action, ipAddress]);

  const formFields = useMemo(
    () => (
      <>
        <h2 className="text-2xl font-bold text-center mt-8">Add New Activity</h2>

        <div className="space-y-4">
          <Label htmlFor="user_id">User ID</Label>
          <Input
            id="user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="action">Action</Label>
          <Input
            id="action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="ip_address">IP Address</Label>
          <Input
            id="ip_address"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
        </div>

        <Button type="button" className="w-full" onClick={handleSubmit}>
          Add New Activity
        </Button>
      </>
    ),
    [userId, action, ipAddress]
  );

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Activity Logs</h1>
        <p className="text-muted-foreground text-center">
          View recent system activity by users
        </p>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <motion.form
          className="w-full h-full lg:col-span-1 space-y-4 border p-4 rounded-xl flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {formFields}
        </motion.form>

        <motion.section
          className="w-full h-full lg:col-span-2 space-y-4 border p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ActivityLogTable />
        </motion.section>
      </div>
    </div>
  );
};

export default function ProtectedActivityLogPage() {
  return (
    <ProductRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProductRoute>
  );
}
