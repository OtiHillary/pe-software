"use client";

import { useEffect, useState } from "react";

export default function AdminAuditorsPage() {
  const [auditors, setAuditors] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const fetchAuditors = async () => {
    const res = await fetch("/api/admin/auditors");
    const data = await res.json();
    setAuditors(data);
  };

  const handleAction = async (id: number, action: "approve" | "reject") => {
    const res = await fetch("/api/admin/auditors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    fetchAuditors(); // refresh list
  };

  useEffect(() => {
    fetchAuditors();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Pending Auditor Submissions</h1>

      {message && <p className="mb-4 text-sm text-pes font-medium">{message}</p>}

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-pes text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">GSM</th>
            <th className="p-2">DOB</th>
            <th className="p-2">Address</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {auditors.map((a) => (
            <tr key={a.id} className="border-b text-sm">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.email}</td>
              <td className="p-2">{a.gsm}</td>
              <td className="p-2">{new Date(a.dob).toLocaleDateString()}</td>
              <td className="p-2">{a.address}</td>
              <td className="p-2">{a.status}</td>
              <td className="p-2 flex gap-2">
                {a.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAction(a.id, "approve")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:opacity-90"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(a.id, "reject")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:opacity-90"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
