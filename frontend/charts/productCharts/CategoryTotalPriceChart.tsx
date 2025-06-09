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

const CategoryTotalPriceChart = ({ products }: Props) => {
  // Calculate total price for each category
  const data = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { category: product.category, total: 0 };
      }
      acc[product.category].total += Number(product.price);
      return acc;
    }, {} as Record<string, { category: string; total: number }>)
  );

  return (
    <div className="w-full p-2 border rounded-xl shadow-sm bg-white">
      <h2 className="text-2xl text-center font-semibold mb-4">Categories by Total Price</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat("en-US").format(value)
            }
          />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryTotalPriceChart;
