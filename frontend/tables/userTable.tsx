"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  if (users.length === 0) {
    return <p className="text-muted-foreground mt-4">No users found.</p>;
  }

  return (
    <div className="max-h-108 overflow-auto">
      <h2 className="text-2xl font-bold text-center mb-4">All Users</h2>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
