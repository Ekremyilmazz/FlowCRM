"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type Notification = {
  id: number;
  user_id: number;
  message: string;
  is_read: boolean;
  created_at: string;
};

type Props = {
  userId?: string; // Optional userId prop
  refreshKey?: number;
};

const NotificationTable = ({ userId: initialUserId = "", refreshKey }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState(initialUserId);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [userId, refreshKey]);

  return (
    <div className="w-full h-full p-6 rounded-xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Notification List</h2>
        <div className="flex gap-2 items-center">
          <span className="text-sm">Filter by User ID:</span>
          <Input
            type="number"
            className="w-32"
            placeholder="e.g. 1"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
      </div>

      <div className="max-h-96 overflow-auto">
        <table className="min-w-full text-sm text-left border rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Read</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <tr key={notif.id} className="border-t">
                  <td className="px-4 py-2">{notif.id}</td>
                  <td className="px-4 py-2">{notif.user_id}</td>
                  <td className="px-4 py-2">{notif.message}</td>
                  <td className="px-4 py-2">{notif.is_read ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">
                    {new Date(notif.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={5}>
                  No notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationTable;
