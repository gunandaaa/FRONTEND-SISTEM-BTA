import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, 
  BookOpen, 
  Wallet, 
  Calendar, 
  TrendingUp 
} from 'lucide-react';

const DashboardRektorat = () => {
  const [selectedSemester, setSelectedSemester] = useState("Ganjil 2025/2026");

  // Mock Data untuk Key Metrics
  const metrics = [
    { title: "Mahasiswa Aktif MQ", value: "1,240", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Kelas Berjalan", value: "48", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Total Dana Administrasi", value: "Rp 124.000.000", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  // Mock Data untuk Grafik Kelulusan (Bar Chart)
  const dataKelulusan = [
    { name: 'FIP', Lulus: 85, Mengulang: 15 },
    { name: 'FTI', Lulus: 78, Mengulang: 22 },
    { name: 'FAI', Lulus: 92, Mengulang: 8 },
    { name: 'FEB', Lulus: 70, Mengulang: 30 },
  ];

  // Mock Data untuk Tren Penempatan (Pie Chart)
  const dataPenempatan = [
    { name: 'MQ 1 (Dasar)', value: 650 },
    { name: 'MQ 2 (Lanjutan)', value: 590 },
  ];
  const COLORS = ['#f59e0b', '#10b981'];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header & Filter Global */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Eksekutif Rektorat</h1>
          <p className="text-sm text-slate-500 mt-1">Ringkasan performa sistem BTA secara keseluruhan.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-slate-600">Periode:</label>
          <select 
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm cursor-pointer"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option>Ganjil 2025/2026</option>
            <option>Genap 2025/2026</option>
          </select>
        </div>
      </div>

      {/* Kartu Indikator Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${m.bg} ${m.color}`}>
              <m.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{m.title}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{m.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Visualisasi Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Batang Kelulusan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-600" />
            Persentase Kelulusan per Fakultas
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataKelulusan} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                <Legend />
                <Bar dataKey="Lulus" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Mengulang" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik Lingkaran Tren Penempatan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Users size={20} className="text-emerald-600" />
            Tren Penempatan MQ 1 vs MQ 2
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPenempatan}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {dataPenempatan.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRektorat;