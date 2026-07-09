import { useRef, useState } from "react";
import { Upload, Download, FileSpreadsheet, Calendar, BookOpen, ShieldCheck, AlertCircle } from "lucide-react";

function Penilaian() {
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Belum Unggah");

  const pilihFile = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadNilai = () => {
    if (!file) {
      alert("Silakan pilih file Excel terlebih dahulu.");
      return;
    }
    alert("File berhasil diunggah.");
    setStatus("Menunggu Validasi Staf");
  };

  const badgeStatus = () => {
    switch (status) {
      case "Belum Unggah": return "bg-red-50 text-red-600 border-red-200";
      case "Menunggu Validasi Staf": return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "Disahkan": return "bg-emerald-50 text-emerald-600 border-emerald-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black text-[#0F4C3A] tracking-tight">Penilaian Mahasiswa</h1>
        <p className="text-gray-500 mt-2 font-medium max-w-2xl">
          Unduh template, isi nilai mahasiswa, dan unggah kembali untuk diproses oleh sistem.
        </p>
      </div>

      {/* STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-500 rounded-2xl"><Calendar size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deadline</p>
            <h2 className="font-black text-gray-800 text-lg">31 Juli 2026</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><BookOpen size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kelas</p>
            <h2 className="font-black text-gray-800 text-lg">MQ 2 - A</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><ShieldCheck size={24} /></div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeStatus()}`}>
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* INSTRUKSI */}
      <div className="bg-[#0F4C3A] rounded-3xl p-8 text-white">
        <h2 className="text-xl font-black mb-6 flex items-center gap-3">
          <AlertCircle className="text-yellow-400" /> Instruksi Pengisian Nilai
        </h2>
        <ol className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm font-medium opacity-90 list-decimal ml-5">
          <li>Unduh template nilai Excel sistem.</li>
          <li>Data NIM dan nama sudah otomatis terisi.</li>
          <li>Isi seluruh nilai pada kolom tersedia.</li>
          <li>Simpan dalam format Excel (.xlsx).</li>
          <li>Unggah sebelum batas waktu berakhir.</li>
        </ol>
      </div>

      {/* IMPORT / EXPORT */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-black text-gray-800 mb-8">Import / Export Nilai</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* DOWNLOAD */}
          <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center text-center hover:border-[#0F4C3A] transition-colors">
            <Download size={48} className="text-[#0F4C3A] mb-4" />
            <h3 className="text-xl font-black text-gray-800">Download Template</h3>
            <p className="text-gray-500 mt-2 mb-6">Unduh file Excel siap isi.</p>
            <button onClick={() => alert("Template Excel akan diunduh.")} className="mt-auto w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800">
              Download Template
            </button>
          </div>

          {/* UPLOAD */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <h3 className="text-xl font-black text-blue-600 flex items-center gap-2"><Upload size={20} /> Upload Nilai</h3>
            <p className="text-gray-500 mt-2 mb-6 text-sm">Pilih file hasil kerja Anda.</p>
            
            <input ref={inputFile} type="file" accept=".xlsx,.xls" onChange={pilihFile} className="hidden" />
            <button onClick={() => inputFile.current.click()} className="w-full bg-white border border-gray-200 py-4 rounded-2xl font-bold text-gray-700 hover:border-gray-400">
              Pilih File Excel
            </button>

            {file && (
              <div className="mt-4 flex items-center gap-3 bg-white p-3 rounded-xl border border-blue-100">
                <FileSpreadsheet className="text-blue-500" />
                <span className="text-sm font-bold truncate">{file.name}</span>
              </div>
            )}

            <button
              onClick={uploadNilai}
              disabled={status !== "Belum Unggah"}
              className={`mt-5 w-full py-4 rounded-2xl font-black transition ${
                status === "Belum Unggah" ? "bg-[#0F4C3A] text-white hover:bg-[#0a382a]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Unggah Nilai Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* INFO TAMBAHAN */}
      <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
        <h2 className="text-lg font-black text-amber-800 mb-4">Informasi Penting</h2>
        <ul className="space-y-3 text-sm text-amber-900 font-medium">
          <li className="flex gap-2"><span>•</span> Template bersifat personal per kelas.</li>
          <li className="flex gap-2"><span>•</span> Status akan otomatis berubah menjadi "Menunggu Validasi" setelah upload.</li>
          <li className="flex gap-2"><span>•</span> Tombol upload terkunci setelah pengiriman untuk mencegah duplikasi.</li>
          <li className="flex gap-2"><span>•</span> Status dapat direset oleh staf jika diperlukan revisi.</li>
        </ul>
      </div>
    </div>
  );
}

export default Penilaian;