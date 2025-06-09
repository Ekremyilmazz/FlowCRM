"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface Props {
  products: Product[];
}

const CategoryStockChart = ({ products }: Props) => {
  const data = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { category: product.category, stock: 0 };
      }
      acc[product.category].stock += Number(product.stock);
      return acc;
    }, {} as Record<string, { category: string; stock: number }>)
  );

  return (
    <div className="w-full p-2 border rounded-xl shadow-sm bg-white">
      <h2 className="text-2xl text-center font-semibold mb-4">Categories by Stock</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryStockChart;
