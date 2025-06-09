"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" className="p-2" onClick={() => setOpen(true)}>
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-14 left-0 w-64 h-full bg-blue-100 z-50 shadow-lg px-4 py-6 rounded-r-xl"
          >
            <h2 className="text-2xl font-bold mb-6">CRM Menu</h2>

            <nav className="flex flex-col gap-4 text-2xl">
              {[
                { href: "/", label: "Homepage" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/users", label: "Users" },
                { href: "/customers", label: "Customers" },
                { href: "/products", label: "Products" },
                { href: "/tasks", label: "Tasks" },
                { href: "/sales-products", label: "Sales Products" },
                { href: "/sales", label: "Sales" },
                { href: "/notes", label: "Notes" },
                { href: "/activity-log", label: "Activity Log" },
                { href: "/communications", label: "Communications" },
              ].map(({ href, label }) => (
                <Link key={href} href={href}>
                  <Button
                    variant="ghost"
                    className="justify-start w-full"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Button>
                </Link>
              ))}
            </nav>

            {/* Close Button */}
            <Button
              variant="outline"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Close Menu
            </Button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
