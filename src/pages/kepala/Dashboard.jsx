import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Wallet, 
  Users, 
  GraduationCap, 
  ArrowRight, 
  Calendar,
  TrendingUp
} from 'lucide-react';

const DashboardKepala = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState("Ganjil 2025/2026");

  // Data Dummy Finansial & Metrik Utama
  const summaryData = {
    totalMahasiswa: 450,
    totalLulus: 385,
    pemasukan: 45000000, // 450 mahasiswa * Rp100.000
    persentaseLulus: 85.5
  };

  // Data Dummy Grafik Kelulusan per Fakultas
  const dataKelulusan = [
    { name: 'FIP', Lulus: 120, Mengulang: 15 },
    { name: 'FTI', Lulus: 95, Mengulang: 20 },
    { name: 'FAI', Lulus: 130, Mengulang: 10 },
    { name: 'FEB', Lulus: 40, Mengulang: 20 },
  ];

  // Data Dummy Grafik Perbandingan Penempatan MQ
  const dataMQ = [
    { name: 'Tingkat MQ 1', value: 250 },
    { name: 'Tingkat MQ 2', value: 200 },
  ];
  
  // Palet Warna untuk Pie Chart
  const COLORS = ['#f59e0b', '#10b981']; // Amber untuk MQ 1, Emerald untuk MQ 2

  // Format angka ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Eksekutif & Filter */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Dashboard Eksekutif</h1>
          <p className="text-slate-500 mt-2">Ringkasan performa akademik dan finansial Program BTA Universitas Nurul Huda.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Dropdown Filter Rentang Waktu */}
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-slate-400" />
            </div>
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full sm:w-56 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-emerald-500 shadow-sm appearance-none cursor-pointer"
            >
              <option value="Genap 2024/2025">Genap 2024/2025</option>
              <option value="Ganjil 2025/2026">Ganjil 2025/2026</option>
              <option value="Genap 2025/2026">Genap 2025/2026</option>
            </select>
          </div>
          
          {/* Tombol Pintasan */}
          <button 
            onClick={() => navigate('/kepala/pelaporan')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-5 rounded-xl shadow-sm transition-colors"
          >
            <span>Lihat Laporan Lengkap</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Kartu Ringkasan (Key Metrics) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Kartu Finansial */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Wallet size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Pemasukan Administrasi</p>
            <h3 className="text-2xl font-black text-slate-800">{formatRupiah(summaryData.pemasukan)}</h3>
            <p className="text-xs text-slate-400 mt-1">Dari total {summaryData.totalMahasiswa} pendaftar baru</p>
          </div>
        </div>

        {/* Kartu Persentase Kelulusan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Rasio Kelulusan Global</p>
            <h3 className="text-2xl font-black text-slate-800">{summaryData.persentaseLulus}%</h3>
            <p className="text-xs text-slate-400 mt-1">{summaryData.totalLulus} Mahasiswa dinyatakan lulus</p>
          </div>
        </div>

        {/* Kartu Total Mahasiswa Aktif */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Total Mahasiswa Aktif</p>
            <h3 className="text-2xl font-black text-slate-800">{summaryData.totalMahasiswa}</h3>
            <p className="text-xs text-slate-400 mt-1">Terbagi dalam tingkat MQ 1 & MQ 2</p>
          </div>
        </div>
      </div>

      {/* Area Visualisasi Data (Grafik) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik 1: Bar Chart Kelulusan per Fakultas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="text-slate-400" size={20} />
            <h3 className="text-lg font-bold text-slate-800">Tingkat Kelulusan per Fakultas</h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataKelulusan}
                margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                <Bar dataKey="Lulus" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="Mengulang" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik 2: Pie Chart Rasio Penempatan MQ */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-slate-400" size={20} />
            <h3 className="text-lg font-bold text-slate-800">Distribusi Penempatan Kelas MQ</h3>
          </div>
          <div className="h-80 w-full flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataMQ}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {dataMQ.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardKepala;