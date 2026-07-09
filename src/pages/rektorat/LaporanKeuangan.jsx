import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Search, 
  Calendar, 
  Wallet, 
  Filter,
  FileSpreadsheet,
  CheckCircle2,
  Landmark
} from 'lucide-react';

const LaporanKeuangan = () => {
  const [transactions] = useState([
    { id: 1, tanggal: "2026-07-01", nim: "202601001", nama: "Rifqi Al-Faruq", nominal: 100000, status: "Tervalidasi" },
    { id: 2, tanggal: "2026-07-02", nim: "202602015", nama: "Siti Aminah", nominal: 100000, status: "Tervalidasi" },
    { id: 3, tanggal: "2026-07-05", nim: "202601044", nama: "Muhammad Rizqi", nominal: 100000, status: "Tervalidasi" },
    { id: 4, tanggal: "2026-07-07", nim: "202603009", nama: "Zainal Abidin", nominal: 100000, status: "Tervalidasi" },
  ]);

  const [startDate, setStartDate] = useState("2026-07-01");
  const [endDate, setEndDate] = useState("2026-07-31");

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => t.tanggal >= startDate && t.tanggal <= endDate);
  }, [startDate, endDate, transactions]);

  const totalDana = useMemo(() => {
    return filteredTransactions.reduce((acc, curr) => acc + curr.nominal, 0);
  }, [filteredTransactions]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-bta-green tracking-tight flex items-center gap-3">
            <div className="bg-bta-green/10 p-2.5 rounded-xl text-bta-green">
              <Landmark size={24} />
            </div>
            Laporan Keuangan
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Pemantauan transparan aliran dana biaya administrasi pendaftaran mahasiswa.
          </p>
        </div>
        
        {/* Tombol Unduh Laporan */}
        <button 
          onClick={() => alert("Mengunduh rekap keuangan ke Excel...")}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-bta-yellow hover:bg-yellow-400 text-bta-black font-black text-sm py-3.5 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(250,234,41,0.39)] hover:shadow-[0_6px_20px_rgba(250,234,41,0.23)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <FileSpreadsheet size={18} strokeWidth={2.5} /> 
          Unduh Rekap Keuangan
        </button>
      </div>

      {/* RINGKASAN & FILTER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kartu Akumulasi Dana (Focal Point) */}
        <div className="lg:col-span-1 bg-bta-green rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-center relative overflow-hidden border-b-8 border-bta-yellow">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-white/10 text-bta-yellow rounded-xl backdrop-blur-sm">
              <Wallet size={24} />
            </div>
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Total Dana Masuk</p>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white tracking-tight">{formatRupiah(totalDana)}</h2>
            <p className="text-xs text-bta-yellow mt-2 font-bold uppercase tracking-wider">
              {filteredTransactions.length} Transaksi Tervalidasi
            </p>
          </div>
        </div>

        {/* Filter Rentang Tanggal */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h3 className="text-sm font-black text-bta-green mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
            <Calendar size={18} /> Rentang Waktu Laporan
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-5 items-end">
            <div className="flex-1 w-full">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Tanggal Mulai</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green transition-all cursor-text" 
              />
            </div>
            
            <div className="hidden sm:block pb-4 text-gray-300 font-black">—</div>
            
            <div className="flex-1 w-full">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Tanggal Selesai</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:border-bta-green focus:ring-1 focus:ring-bta-green transition-all cursor-text" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* TABEL RIWAYAT KEUANGAN */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Tanggal Transfer</th>
                <th className="p-5 text-xs font-black text-bta-green uppercase tracking-wider">Data Mahasiswa</th>
                <th className="p-5 text-center text-xs font-black text-bta-green uppercase tracking-wider">Status Validasi</th>
                <th className="p-5 text-right text-xs font-black text-bta-green uppercase tracking-wider">Nominal (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50/80 transition-colors duration-150">
                    <td className="p-5 text-gray-500 font-mono font-bold text-xs">{t.tanggal}</td>
                    <td className="p-5">
                      <div className="font-bold text-gray-800">{t.nama}</div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">{t.nim}</div>
                    </td>
                    <td className="p-5 text-center">
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-bta-green px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-bta-green/20">
                        <CheckCircle2 size={12} strokeWidth={3} /> {t.status}
                      </span>
                    </td>
                    <td className="p-5 text-right font-black text-gray-800 text-base">
                      {formatRupiah(t.nominal).replace('Rp', '').trim()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Calendar size={32} className="text-gray-300" />
                      <p>Tidak ada transaksi yang tercatat pada rentang tanggal tersebut.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
            {/* Footer Tabel untuk Total */}
            <tfoot className="bg-bta-green/5 border-t-2 border-bta-green/20">
              <tr>
                <td colSpan="3" className="p-5 text-right font-bold text-bta-green uppercase text-xs tracking-widest">
                  Total Akumulasi Periode:
                </td>
                <td className="p-5 text-right font-black text-bta-green text-xl">
                  {formatRupiah(totalDana)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};

export default LaporanKeuangan;