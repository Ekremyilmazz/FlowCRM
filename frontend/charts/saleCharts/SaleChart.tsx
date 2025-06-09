"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

type Sale = {
  amount: number;
  date: string;
};

const SalesChart = () => {
  const [salesData, setSalesData] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales`);
        const data = await res.json();
       
        const formatted = data
          .map((sale: any) => ({
            amount: sale.amount,
            date: new Date(sale.date).toLocaleDateString(), 
          }))
          .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setSalesData(formatted);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="w-full h-full p-2 border rounded-xl shadow-sm bg-white">
      <h2 className="text-2xl text-center font-bold mb-4">Sales Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
