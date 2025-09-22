'use client'
import { useEffect, useState } from 'react';

type UserData = {
  pesuser_name: string;
  dept: string;
  appraisal?: {
    teaching_quality_evaluation?: number;
    research_quality_evaluation?: number;
    administrative_quality_evaluation?: number;
    community_quality_evaluation?: number;
  };
  performance?: {
    competence?: number;
    integrity?: number;
    compatibility?: number;
    use_of_resources?: number;
  };
  stress?: {
    staff_stress_category_form?: number;
    stress_theme_form?: number;
    stress_feeling_frequency_form?: number;
  };
  lead_scores?: {
    competence?: number;
    integrity?: number;
    compatibility?: number;
    use_of_resources?: number;
  };
};

export default function EmployeeDataEntryScores() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dept, setDept] = useState<string>("");
  const [leadScores, setLeadScores] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    // Optionally, get department from user token or context
    const token = localStorage.getItem('access_token');
    let userDept = "";
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userDept = payload.role || payload.dept || "";
      } catch {}
    }
    setDept(userDept);
    if (!userDept) return;
    setLoading(true);
    fetch(`/api/getAllDataScores?dept=${encodeURIComponent(userDept)}`)
      .then(res => res.json())
      .then((users) => {
        setData(users);
        // Pre-fill leadScores state with existing lead scores if present
        const initialLeadScores: Record<string, any> = {};
        users.forEach((u: any) => {
          if (u.lead_scores) initialLeadScores[u.pesuser_name] = u.lead_scores;
        });
        setLeadScores(initialLeadScores);
      })
      .catch(() => setError('Failed to fetch data'))
      .finally(() => setLoading(false));
  }, []);

  const handleLeadScoreChange = (user: string, field: string, value: string) => {
    setLeadScores(prev => ({
      ...prev,
      [user]: {
        ...prev[user],
        [field]: value === '' ? undefined : Number(value)
      }
    }));
  };

  const handleSaveLeadScores = async (user: string) => {
    setSaving(user);
    try {
      const res = await fetch('/api/saveLeadScores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesuser_name: user, dept, scores: leadScores[user] })
      });
      if (!res.ok) throw new Error('Failed to save');
      alert('Lead scores saved!');
    } catch {
      alert('Error saving lead scores');
    } finally {
      setSaving(null);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">{dept ? `${dept} Department` : ''} Employee Data Entry Scores</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Appraisal</th>
              <th className="p-2 border">Performance</th>
              <th className="p-2 border">Stress</th>
              <th className="p-2 border">Lead Scores</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.pesuser_name} className="border-b">
                <td className="p-2 border font-semibold">{user.pesuser_name}</td>
                <td className="p-2 border">{user.dept}</td>
                <td className="p-2 border text-xs">
                  {user.appraisal ? (
                    <ul>
                      <li>TQ: {user.appraisal.teaching_quality_evaluation ?? '-'}</li>
                      <li>RQ: {user.appraisal.research_quality_evaluation ?? '-'}</li>
                      <li>AQ: {user.appraisal.administrative_quality_evaluation ?? '-'}</li>
                      <li>CQ: {user.appraisal.community_quality_evaluation ?? '-'}</li>
                    </ul>
                  ) : '-'}
                </td>
                <td className="p-2 border text-xs">
                  {user.performance ? (
                    <ul>
                      <li>Comp: {user.performance.competence ?? '-'}</li>
                      <li>Int: {user.performance.integrity ?? '-'}</li>
                      <li>Compat: {user.performance.compatibility ?? '-'}</li>
                      <li>Res: {user.performance.use_of_resources ?? '-'}</li>
                    </ul>
                  ) : '-'}
                </td>
                <td className="p-2 border text-xs">
                  {user.stress ? (
                    <ul>
                      <li>Cat: {user.stress.staff_stress_category_form ?? '-'}</li>
                      <li>Theme: {user.stress.stress_theme_form ?? '-'}</li>
                      <li>Freq: {user.stress.stress_feeling_frequency_form ?? '-'}</li>
                    </ul>
                  ) : '-'}
                </td>
                <td className="p-2 border text-xs">
                  <div className="flex flex-col gap-1">
                    <input
                      type="number"
                      placeholder="Lead Comp"
                      className="border rounded px-2 py-1 text-xs mb-1"
                      value={leadScores[user.pesuser_name]?.competence ?? ''}
                      onChange={e => handleLeadScoreChange(user.pesuser_name, 'competence', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Lead Int"
                      className="border rounded px-2 py-1 text-xs mb-1"
                      value={leadScores[user.pesuser_name]?.integrity ?? ''}
                      onChange={e => handleLeadScoreChange(user.pesuser_name, 'integrity', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Lead Compat"
                      className="border rounded px-2 py-1 text-xs mb-1"
                      value={leadScores[user.pesuser_name]?.compatibility ?? ''}
                      onChange={e => handleLeadScoreChange(user.pesuser_name, 'compatibility', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Lead Res"
                      className="border rounded px-2 py-1 text-xs mb-1"
                      value={leadScores[user.pesuser_name]?.use_of_resources ?? ''}
                      onChange={e => handleLeadScoreChange(user.pesuser_name, 'use_of_resources', e.target.value)}
                    />
                  </div>
                  {user.lead_scores && (
                    <div className="text-green-700 text-xs mt-1">(Saved)</div>
                  )}
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-pes text-white px-3 py-1 rounded disabled:opacity-50"
                    disabled={saving === user.pesuser_name}
                    onClick={() => handleSaveLeadScores(user.pesuser_name)}
                  >
                    {saving === user.pesuser_name ? 'Saving...' : 'Save'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}