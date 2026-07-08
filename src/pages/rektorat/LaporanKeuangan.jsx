import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Search, 
  Calendar, 
  Wallet, 
  Filter,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';

const LaporanKeuangan = () => {
  // Data dummy riwayat pembayaran
  const [transactions] = useState([
    { id: 1, tanggal: "2026-07-01", nim: "202601001", nama: "Rifqi Al-Faruq", nominal: 100000, status: "Tervalidasi" },
    { id: 2, tanggal: "2026-07-02", nim: "202602015", nama: "Siti Aminah", nominal: 100000, status: "Tervalidasi" },
    { id: 3, tanggal: "2026-07-05", nim: "202601044", nama: "Muhammad Rizqi", nominal: 100000, status: "Tervalidasi" },
    { id: 4, tanggal: "2026-07-07", nim: "202603009", nama: "Zainal Abidin", nominal: 100000, status: "Tervalidasi" },
  ]);

  const [startDate, setStartDate] = useState("2026-07-01");
  const [endDate, setEndDate] = useState("2026-07-31");

  // Logika Filter Rentang Tanggal
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => t.tanggal >= startDate && t.tanggal <= endDate);
  }, [startDate, endDate, transactions]);

  // Kalkulasi Total Dana
  const totalDana = useMemo(() => {
    return filteredTransactions.reduce((acc, curr) => acc + curr.nominal, 0);
  }, [filteredTransactions]);

  // Format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header & Aksi */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan Keuangan Administrasi</h1>
          <p className="text-sm text-slate-500 mt-1">Transparansi aliran dana pendaftaran BTA mahasiswa.</p>
        </div>
        <button 
          onClick={() => alert("Mengunduh rekap keuangan ke Excel...")}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-sm transition"
        >
          <FileSpreadsheet size={18} /> Unduh Rekap Keuangan
        </button>
      </div>

      {/* Ringkasan & Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Kartu Akumulasi Dana */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Wallet size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Dana Masuk</p>
            <h2 className="text-2xl font-black text-slate-800">{formatRupiah(totalDana)}</h2>
          </div>
        </div>

        {/* Filter Rentang Tanggal */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Calendar size={18} /> Filter Rentang Tanggal
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Mulai</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Selesai</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Riwayat */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
              <th className="p-4">Tanggal</th>
              <th className="p-4">NIM</th>
              <th className="p-4">Nama Mahasiswa</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Nominal (Rp)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-4 text-slate-600">{t.tanggal}</td>
                  <td className="p-4 font-mono">{t.nim}</td>
                  <td className="p-4 font-semibold text-slate-800">{t.nama}</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-100">
                      <CheckCircle2 size={12} /> {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-slate-800">{formatRupiah(t.nominal).replace('Rp', '')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">Tidak ada transaksi pada rentang tanggal yang dipilih.</td>
              </tr>
            )}
          </tbody>
          <tfoot className="bg-slate-50">
            <tr>
              <td colSpan="4" className="p-4 text-right font-bold text-slate-700 uppercase text-xs">Total Akumulasi:</td>
              <td className="p-4 text-right font-black text-slate-800">{formatRupiah(totalDana)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default LaporanKeuangan;