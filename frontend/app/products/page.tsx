"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CategoryStockChart from "@/charts/productCharts/CategoryStockCart";
import CategoryTotalPriceChart from "@/charts/productCharts/CategoryTotalPriceChart";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
};

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name,
      price,
      category,
      stock,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Product added:", data);

        setName("");
        setPrice(0);
        setCategory("");
        setStock(0);
        setProducts((prevProducts) => [data, ...prevProducts]);
      } else {
        console.error("Failed to add product:", res.statusText);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Products</h1>
        <p className="text-muted-foreground">Manage your store inventory</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full h-full space-y-6 border p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="flex flex-col items-center text-2xl font-bold">
            Add New Product
          </h2>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>

          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </motion.form>
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoryStockChart products={products} />
        </motion.div>
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoryTotalPriceChart products={products} />
        </motion.div>
      </section>

      <motion.section
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-h-96 overflow-auto">
          <table className="min-w-full text-sm mt-4">
            <thead className="bg-muted text-muted-foreground sticky top-0 z-10">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Price</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};

export default function ProtectedProductsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProtectedRoute>
  );
}
