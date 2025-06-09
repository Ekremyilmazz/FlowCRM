"use client";

import { useEffect, useState } from "react";
import SalesChart from "@/charts/saleCharts/SaleChart";
import CategoryStockChart from "@/charts/productCharts/CategoryStockCart";
import CategoryTotalPriceChart from "@/charts/productCharts/CategoryTotalPriceChart";
import ActivityLogTable from "@/tables/activityLogTable";
import CustomerTable from "@/tables/customerTable";
import TaskTable from "@/tables/taskTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";

const Page = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`);
      const data = await res.json();
      setCustomerCount(data.length);
    };

    const fetchSalesData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales`);
      const data = await res.json();
      const total = data.reduce(
        (sum: number, sale: any) => sum + Number(sale.amount),
        0
      );
      setTotalRevenue(total);
    };

    const fetchUserCount = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const data = await res.json();
      setUserCount(data.length);
    };

    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    };

    const fetchTasks = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    };

    fetchCustomerCount();
    fetchSalesData();
    fetchUserCount();
    fetchProducts();
    fetchTasks();
  }, []);

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center max-w-12xl mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Welcome back👋
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Here's what’s happening with your CRM today.
        </p>
      </section>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="rounded-xl border p-4 shadow-sm bg-white dark:bg-muted">
          <h3 className="text-sm text-muted-foreground">Total Customers</h3>
          <p className="text-xl sm:text-2xl font-bold">{customerCount}</p>
        </div>

        <div className="rounded-xl border p-4 shadow-sm bg-white dark:bg-muted">
          <h3 className="text-sm text-muted-foreground">Total Revenue</h3>
          <p className="texl-lg sm:text-2xl font-bold">${totalRevenue}</p>
        </div>

        <div className="rounded-xl border p-4 shadow-sm bg-white dark:bg-muted">
          <h3 className="text-sm text-muted-foreground">Active Users</h3>
          <p className="text-lg sm:text-2xl font-bold">{userCount}</p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SalesChart />
        <CategoryStockChart products={products} />
        <CategoryTotalPriceChart products={products} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mt-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center bg-blue-200 p-6 rounded-xl mb-6">
            Activity Logs
          </h2>
          <ActivityLogTable />
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-center bg-blue-200 p-6 rounded-xl mb-6">
            Customers
          </h2>
          
          <CustomerTable />
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-center bg-blue-200 p-6 rounded-xl mb-6">
            Tasks
          </h2>
          <TaskTable tasks={tasks} />
        </div>
      </motion.div>
    </div>
  );
};

export default function ProtectedDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "user", "staff"]}>
      <Page />
    </ProtectedRoute>
  );
}
