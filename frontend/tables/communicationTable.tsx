import { useState, useEffect } from "react";

type Communication = {
  id: number;
  user_id: number;
  customer_id: number;
  type: string;
  content: string;
  timestamp: string;
};

const CommunicationTable = () => {
  const [communications, setCommunications] = useState<Communication[]>([]);

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/communications`
        );
        const data = await res.json();
        setCommunications(data);
      } catch (error) {
        console.log("Error fetching communications", error);
      }
    };
    fetchCommunications();
  }, []);

  if (communications.length === 0) {
    return (
      <p className="text-muted-foreground mt-4">No communications found.</p>
    );
  }

  return (
    <div className="mt-10 max-h-96 overflow-y-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <td className="border px-4 py-2 text-left">User ID</td>
            <td className="border px-4 py-2 text-left">Customer ID</td>
            <td className="border px-4 py-2 text-left">Type</td>
            <td className="border px-4 py-2 text-left">Content</td>
            <td className="border px-4 py-2 text-left">Timestamp</td>
          </tr>
        </thead>
        <tbody>
          {communications.map((communication) => (
            <tr key={communication.id}>
              <td className="border px-4 py-2">{communication.user_id}</td>
              <td className="border px-4 py-2">{communication.customer_id}</td>
              <td className="border px-4 py-2">{communication.type}</td>
              <td className="border px-4 py-2">{communication.content}</td>
              <td className="border px-4 py-2">{communication.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommunicationTable;
