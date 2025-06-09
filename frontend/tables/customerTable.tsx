"use client";

import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  company: string;
  contact_info: string;
  segment: string;
};

const CustomerTable = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`);
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers", err);
      }
    };

    fetchCustomers();
  }, []);

  if (customers.length === 0) {
    return <p className="text-muted-foreground mt-4">No customers found.</p>;
  }

  return (
    <div className="w-full h-full p-6 rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Customer List</h2>
      <div className="mt-10 max-h-96 overflow-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Company</th>
              <th className="border px-4 py-2 text-left">Contact</th>
              <th className="border px-4 py-2 text-left">Segment</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="border px-4 py-2">{c.name}</td>
                <td className="border px-4 py-2">{c.company}</td>
                <td className="border px-4 py-2">{c.contact_info}</td>
                <td className="border px-4 py-2">{c.segment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
