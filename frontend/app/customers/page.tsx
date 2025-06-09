"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CustomerTable from "@/tables/customerTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";

const Page = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [segment, setSegment] = useState("");

  const handleSubmit = async () => {
    if (!name || !company || !contactInfo || !segment) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            company,
            contact_info: contactInfo,
            segment,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add customer");
      alert("Customer added successfully");

      setName("");
      setCompany("");
      setContactInfo("");
      setSegment("");
    } catch (error) {
      console.error(error);
      alert("Error adding customer");
    }
  };

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Customers</h1>
        <p className="text-muted-foreground">Manage your customer records</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.form
          className="w-full space-y-8 border p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center mt-8">
            Add New Customer
          </h2>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Info</Label>
            <Input
              id="contact"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="segment">Segment</Label>
            <Input
              id="segment"
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
            />
          </div>

          <Button type="button" className="w-full" onClick={handleSubmit}>
            Add Customer
          </Button>
        </motion.form>

        <motion.section
          className="w-full lg:col-span-2 border p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CustomerTable />
        </motion.section>
      </div>
    </div>
  );
};

export default function ProtectedCustomerPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProtectedRoute>
  );
}
