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

// NAMA KOMPONEN DIUBAH MENJADI DashboardRektorat
const DashboardRektorat = () => {
  // ==========================================
  // LOGIKA & DATA DUMMY GUNANDA (TIDAK DISENTUH)
  // ==========================================
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState("Ganjil 2025/2026");

  const summaryData = {
    totalMahasiswa: 450,
    totalLulus: 385,
    pemasukan: 45000000, 
    persentaseLulus: 85.5
  };

  const dataKelulusan = [
    { name: 'FIP', Lulus: 120, Mengulang: 15 },
    { name: 'FTI', Lulus: 95, Mengulang: 20 },
    { name: 'FAI', Lulus: 130, Mengulang: 10 },
    { name: 'FEB', Lulus: 40, Mengulang: 20 },
  ];

  const dataMQ = [
    { name: 'Tingkat MQ 1', value: 250 },
    { name: 'Tingkat MQ 2', value: 200 },
  ];
  
  // Mengkalibrasi warna grafik agar sesuai palet BTA
  const COLORS = ['#FAEA29', '#074526']; 

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* BANNER EKSEKUTIF & FILTER */}
      <div className="bg-bta-green rounded-[2rem] p-8 md:p-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative overflow-hidden border-b-8 border-bta-yellow shadow-xl">
        
        {/* Dekorasi Latar Banner */}
        <div className="absolute top-[-50%] right-[-10%] w-80 h-80 bg-bta-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Dashboard Eksekutif</h1>
          <p className="text-white/80 mt-3 max-w-lg font-medium leading-relaxed">
            Ringkasan komprehensif performa akademik dan finansial Program BTA Universitas Nurul Huda.
          </p>
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Dropdown Filter Rentang Waktu (Kustom Styling Transparan) */}
          <div className="relative w-full sm:w-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar size={18} className="text-bta-yellow" />
            </div>
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full sm:w-60 pl-12 pr-10 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-bta-yellow focus:ring-1 focus:ring-bta-yellow shadow-sm appearance-none cursor-pointer transition-all hover:bg-white/20"
            >
              <option value="Genap 2024/2025" className="text-gray-800">Genap 2024/2025</option>
              <option value="Ganjil 2025/2026" className="text-gray-800">Ganjil 2025/2026</option>
              <option value="Genap 2025/2026" className="text-gray-800">Genap 2025/2026</option>
            </select>
            {/* Custom Arrow for Select */}
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
               <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          
          {/* Tombol Pintasan Laporan (URL disesuaikan ke Rektorat) */}
          <button 
            onClick={() => navigate('/rektorat/laporan-akademik')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-bta-yellow hover:bg-yellow-400 text-bta-black font-black text-sm py-3.5 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(250,234,41,0.39)] hover:shadow-[0_6px_20px_rgba(250,234,41,0.23)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Lihat Laporan Detail</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* KARTU RINGKASAN (KEY METRICS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Kartu Finansial */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-bta-green">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3.5 bg-bta-green/10 text-bta-green rounded-2xl">
              <Wallet size={24} strokeWidth={2.5} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Finansial</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-bta-black tracking-tight">{formatRupiah(summaryData.pemasukan)}</h3>
            <p className="text-sm text-gray-500 font-medium mt-2">Dari total <strong className="text-bta-green">{summaryData.totalMahasiswa}</strong> pendaftar administrasi</p>
          </div>
        </div>

        {/* Kartu Persentase Kelulusan */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-bta-yellow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3.5 bg-bta-yellow/20 text-yellow-600 rounded-2xl">
              <TrendingUp size={24} strokeWidth={2.5} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Akademik</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-bta-black tracking-tight">{summaryData.persentaseLulus}%</h3>
            <p className="text-sm text-gray-500 font-medium mt-2"><strong className="text-yellow-600">{summaryData.totalLulus}</strong> Mahasiswa dinyatakan lulus global</p>
          </div>
        </div>

        {/* Kartu Total Mahasiswa Aktif */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3.5 bg-gray-100 text-gray-700 rounded-2xl">
              <Users size={24} strokeWidth={2.5} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Populasi</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-bta-black tracking-tight">{summaryData.totalMahasiswa}</h3>
            <p className="text-sm text-gray-500 font-medium mt-2">Terbagi dalam klaster <strong className="text-gray-800">MQ 1 & MQ 2</strong></p>
          </div>
        </div>
      </div>

      {/* AREA VISUALISASI DATA (GRAFIK RECHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Grafik 1: Bar Chart Kelulusan per Fakultas */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-bta-green/10 p-2 rounded-lg text-bta-green">
              <GraduationCap size={20} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-black text-bta-green">Tingkat Kelulusan per Fakultas</h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataKelulusan}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '13px', fontWeight: 600, paddingTop: '20px'}} />
                {/* Lulus menggunakan warna Hijau BTA */}
                <Bar dataKey="Lulus" fill="#074526" radius={[6, 6, 0, 0]} barSize={28} />
                {/* Mengulang menggunakan warna Merah elegan UX */}
                <Bar dataKey="Mengulang" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik 2: Pie Chart Rasio Penempatan MQ */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-bta-yellow/20 p-2 rounded-lg text-yellow-600">
              <Users size={20} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-black text-bta-green">Distribusi Penempatan Kelas MQ</h3>
          </div>
          <div className="h-80 w-full flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataMQ}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                  stroke="none"
                >
                  {dataMQ.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '13px', fontWeight: 600, paddingTop: '20px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardRektorat;