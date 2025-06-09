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
import UserTable from "@/tables/userTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to create user");
      const data = await res.json();
      console.log("User created:", data);

      setName("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
    }
  };

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Users</h1>
        <p className="text-muted-foreground">Add and manage users</p>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <motion.form
          className="w-full h-[calc(100vh-400px)] space-y-8 border p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center">Add New User</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="button" className="w-full" onClick={handleSubmit}>
            Create User
          </Button>
        </motion.form>

        <motion.section
          className="w-full h-full lg:col-span-2 border p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UserTable />
        </motion.section>
      </div>
    </div>
  );
};

export default function ProtectedUsersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProtectedRoute>
  );
}
