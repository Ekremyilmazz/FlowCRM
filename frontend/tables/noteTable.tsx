"use client";

import { useEffect, useState } from "react";

type Note = {
  id: number;
  customer_id: number;
  user_id: number;
  content: string;
  is_private: boolean;
  customer_name: string;
  user_name: string;
};

const NoteTable = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
      const data = await res.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <div className="w-full h-full p-6 rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Notes List</h2>
      <div className="max-h-96 overflow-auto">
        <table className="min-w-full text-sm text-left border rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Private</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id} className="border-t">
                <td className="px-4 py-2">{note.id}</td>
                <td className="px-4 py-2">{note.customer_name}</td>
                <td className="px-4 py-2">{note.user_name}</td>
                <td className="px-4 py-2">{note.content}</td>
                <td className="px-4 py-2">{note.is_private ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoteTable;
