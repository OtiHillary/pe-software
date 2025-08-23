// app/auditor/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Row = {
  id: string;
  type: 'STRESS' | 'APPRAISAL' | 'PERFORMANCE';
  periodType: 'SEMESTER' | 'YEAR';
  periodLabel: string;
  status: string;
  department: { name: string };
  createdAt: string;
  submittedAt: string | null;
};

type SubmissionDetail = Row & {
  aggregatePayload: any;
  computedTotals: any;
  audits: {
    id: string;
    decision: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES';
    remarks: string;
    createdAt: string;
    auditor: { name: string };
  }[];
};

export default function AuditorDashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<SubmissionDetail | null>(null);
  const [remarks, setRemarks] = useState("");
  const [filter, setFilter] = useState<'ALL'|'STRESS'|'APPRAISAL'|'PERFORMANCE'>('ALL');
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auditor/submissions', { cache: 'no-store' });
      const data = await res.json();
      setRows(data);
    })();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    (async () => {
      const res = await fetch(`/api/auditor/submissions/${selectedId}`, { cache: 'no-store' });
      const data = await res.json();
      setDetail(data);
      setRemarks("");
    })();
  }, [selectedId]);

  const filtered = useMemo(() => {
    return rows.filter(r => 
      (filter === 'ALL' || r.type === filter) &&
      (search.trim() === '' || r.department.name.toLowerCase().includes(search.toLowerCase()) || r.periodLabel.toLowerCase().includes(search.toLowerCase()))
    );
  }, [rows, filter, search]);

  const act = async (decision: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES') => {
    if (!detail) return;
    const res = await fetch(`/api/auditor/submissions/${detail.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision, remarks }),
    });
    if (res.ok) {
      alert(`Submission ${decision.toLowerCase().replace('_',' ')}d`);
      // refresh list and close
      const list = await fetch('/api/auditor/submissions', { cache: 'no-store' });
      setRows(await list.json());
      setSelectedId(null);
      setDetail(null);
    } else {
      alert('Action failed');
    }
  };

  return (
    <div className="w-full p-12">
      <h1 className="text-2xl font-bold mb-6">External Auditor Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select className="border rounded px-3 py-2" value={filter} onChange={e => setFilter(e.target.value as any)}>
          <option value="ALL">All Types</option>
          <option value="STRESS">Stress</option>
          <option value="APPRAISAL">Appraisal</option>
          <option value="PERFORMANCE">Performance</option>
        </select>
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Search by department or period…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-3 border">Department</th>
              <th className="px-4 py-3 border">Type</th>
              <th className="px-4 py-3 border">Period</th>
              <th className="px-4 py-3 border">Submitted</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border">{r.department.name}</td>
                <td className="px-4 py-3 border">{r.type}</td>
                <td className="px-4 py-3 border">{r.periodLabel}</td>
                <td className="px-4 py-3 border">{r.submittedAt ? new Date(r.submittedAt).toLocaleString() : '-'}</td>
                <td className="px-4 py-3 border">{r.status}</td>
                <td className="px-4 py-3 border">
                  <button className="bg-pes text-white px-3 py-1 rounded" onClick={() => setSelectedId(r.id)}>
                    Review
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={6}>No submissions</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer / Detail */}
      {detail && (
        <div className="fixed inset-0 bg-black/30 flex justify-end">
          <div className="w-full max-w-2xl h-full bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Review — {detail.department.name}</h2>
              <button className="px-3 py-1 rounded bg-gray-200" onClick={() => { setSelectedId(null); setDetail(null); }}>Close</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div><span className="text-gray-500">Type:</span> {detail.type}</div>
              <div><span className="text-gray-500">Period:</span> {detail.periodType} — {detail.periodLabel}</div>
              <div><span className="text-gray-500">Status:</span> {detail.status}</div>
              <div><span className="text-gray-500">Submitted:</span> {detail.submittedAt ? new Date(detail.submittedAt).toLocaleString() : '-'}</div>
            </div>

            {/* Computed totals (read-only) */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Computed Totals</h3>
              <pre className="bg-gray-50 p-3 rounded border overflow-x-auto text-sm">
                {JSON.stringify(detail.computedTotals ?? detail.aggregatePayload, null, 2)}
              </pre>
            </div>

            {/* Previous audits */}
            {detail.audits?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Audit History</h3>
                <ul className="space-y-2 text-sm">
                  {detail.audits.map(a => (
                    <li key={a.id} className="border rounded p-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{a.decision}</span>
                        <span className="text-gray-500">{new Date(a.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="text-gray-700 mt-1">{a.remarks}</div>
                      <div className="text-gray-500 text-xs mt-1">By: {a.auditor?.name ?? 'External Auditor'}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Remarks + Actions */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Remarks</label>
              <textarea
                className="w-full border rounded p-2"
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add objective justification for your decision…"
              />
            </div>

            <div className="flex gap-3">
              <button className="bg-pes text-white px-4 py-2 rounded" onClick={() => act('APPROVE')}>Approve</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => act('REJECT')}>Reject</button>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded" onClick={() => act('REQUEST_CHANGES')}>Request Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
