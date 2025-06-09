"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { signIn, getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { LayoutDashboard, CalendarDays } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await signIn(email, password);
      alert(`Hoşgeldin, ${data.user.name}`);

      setUserName(data.user.name);
      setUserRole(data.user.role);

      setShowForm(false); // Close the form
      setEmail(""); // Clean the inputs
      setPassword("");
    } catch (error) {
      alert("Failed to sign in");
      console.log(error);
    }
  };

  const handleLogOut = () => {
    const confirmed = window.confirm("Are you sure you want to exit?");
    if (confirmed) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUserName(null);
      setUserRole(null);
      router.push("/");
    }
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserName(user.name);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowForm(false);
        setEmail("");
        setPassword("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full h-16 border-t shadow-md transition-colors duration-300 ${
        isScrolled ? "bg-gray-100" : "bg-blue-200"
      }`}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between max-w-8xl px-2 sm:px-4 py-2">
        {/* Left side - Logo */}
        <div className="flex items-center gap-4 sm:gap-12">
          <Sidebar />
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <LayoutDashboard className="h-6 w-6 text-blue-600" />
            FlowCRM
          </Link>
        </div>

        {/* Right side of the navbar */}
        <div className="flex items-center gap-2 sm:gap-4 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-400 text-white"
            onClick={() => router.push("/notifications")}
          >
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-1 text-white h-9 bg-gray-400 rounded px-2 whitespace-nowrap">
            <CalendarDays className="w-4 h-4" />
            {new Date().toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>

          {userName ? (
            <>
              <div className="h-9 bg-gray-400 rounded px-2 text-white hidden sm:flex">
                <span className="flex items-center px-2 text-white">
                  👤 {userName} ({userRole})
                </span>
              </div>
              <Button size="default" className="px-2 py-1" onClick={handleLogOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="default" className="px-2 py-1" onClick={toggleForm}>
                Sign In
              </Button>
              {/* Login Form */}
              <AnimatePresence>
                {showForm && (
                  <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
                    onClick={() => setShowForm(false)}
                  >
                    <motion.form
                      onSubmit={handleSubmit}
                      className="bg-white p-6 rounded shadow-md w-[90%] max-w-md h-auto"
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="tex-2xl font-bold text-center mb-6 text-gray-800">
                        Sign In to FlowCRM
                      </h2>
                      <p className="text-center mb-6 tex-gray-500">
                        Please enter your email and password to sign in.
                      </p>
                      <div className="relative mb-4">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-14 py-3 text-base"
                          required
                        />
                      </div>
                      <div className="relative mb-4">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="password"
                          placeholder="Your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-14 py-3 text-base"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="default"
                        className="w-full py-3 text-lg font-semibold"
                      >
                        Login
                      </Button>
                    </motion.form>
                  </div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
