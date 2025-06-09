"use client";

import { useEffect, useState } from "react";

interface ActivityLog {
  id: number;
  user_name: string;
  action: string;
  ip_address: string;
  timestamp: string;
}

export default function ActivityLogTable() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/activity-log`
        );
        const data = await res.json();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch activity logs", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="w-full h-full p-6 rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Log Entries</h2>
      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full text-sm text-left border rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Action</th>
              <th className="px-4 py-2 border">IP Address</th>
              <th className="px-4 py-2 border">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="px-4 py-2">{log.user_name}</td>
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">{log.ip_address}</td>
                <td className="px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
