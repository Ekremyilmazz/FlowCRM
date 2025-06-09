"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SaleChart from "@/charts/saleCharts/SaleChart";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";

const Page = () => {
  const [customerId, setCustomerId] = useState("");
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    if (!customerId || !userId || !amount || !status || !date) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: Number(customerId),
          user_id: Number(userId),
          amount: Number(amount),
          status,
          date,
        }),
      });

      if (!res.ok) throw new Error("Failed to create sale");
      const data = await res.json();
      console.log("Sale created:", data);

      setCustomerId("");
      setUserId("");
      setAmount("");
      setStatus("");
      setDate("");

      alert("Sale created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating sale");
    }
  };

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Sales</h1>
        <p className="text-muted-foreground">Create and view your sales</p>
      </section>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 items-start">
        <motion.form
          className="w-full h-full lg:col-span-1 space-y-4 border p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center">Add New Sale</h2>

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
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Button type="button" className="w-full" onClick={handleSubmit}>
            Create Sale
          </Button>
        </motion.form>
        <motion.section
          className="w-full h-full lg:col-span-2 min-h-[500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SaleChart />
        </motion.section>
      </div>
    </div>
  );
};

export default function ProtectedSalesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProtectedRoute>
  );
}
