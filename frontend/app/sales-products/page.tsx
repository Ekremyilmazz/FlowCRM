"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CategoryStockChart from "@/charts/productCharts/CategoryStockCart";
import CategoryTotalPriceChart from "@/charts/productCharts/CategoryTotalPriceChart";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";

const Page = () => {
  const [saleId, setSaleId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = {
        sale_id: parseInt(saleId),
        product_id: parseInt(productId),
        quantity: parseInt(quantity),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sales-products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to add product to sale");

      const data = await res.json();
      console.log("Product added to sale:", data);

      setSaleId("");
      setProductId("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding product to sale:", error);
    }
  };

  return (
    <div className="mt-20 space-y-6 mr-10">
      <section className="max-w-screen-4xl text-center mx-auto bg-blue-200 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Sale Products</h1>
        <p className="text-muted-foreground">Assign products to sales</p>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <motion.section
          className="w-full h-full lg:col-span-1 space-y-4 border p-4 rounded-xl flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-center text-2xl font-bold">
            Add Product to Sale
          </h2>

          <div className="space-y-2">
            <Label htmlFor="sale_id">Sale ID</Label>
            <Input
              id="sale_id"
              type="number"
              placeholder="Sale ID"
              value={saleId}
              onChange={(e) => setSaleId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product_id">Product ID</Label>
            <Input
              id="product_id"
              type="number"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <Button type="button" className="w-full" onClick={handleSubmit}>
            Add to Sale
          </Button>
        </motion.section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoryStockChart products={products} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategoryTotalPriceChart products={products} />
        </motion.div>
      </div>
    </div>
  );
};

export default function ProtectedSalesProducsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <Page />
    </ProtectedRoute>
  );
}
