import { useState } from "react";

function HasilStudi() {
  const [hasil] = useState({
    tajwid: 82,
    tahsin: 78,
    makhorijulHuruf: 80,
    disahkan: true,
  });

  const totalNilai = Math.round(
    (hasil.tajwid + hasil.tahsin + hasil.makhorijulHuruf) / 3
  );

  const getHurufMutu = (nilai) => {
    if (nilai >= 85) return "A";
    if (nilai >= 80) return "A-";
    if (nilai >= 75) return "B+";
    if (nilai >= 69) return "B-";
    if (nilai >= 60) return "C";
    return "D";
  };

  const hurufMutu = getHurufMutu(totalNilai);
  const lulus = totalNilai >= 69;
  const bisaDownload = lulus && hasil.disahkan;

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">

      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-black text-bta-green tracking-tight">
          Hasil Studi
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Ringkasan hasil pembelajaran BTA selama satu semester.
        </p>
      </div>

      {/* KARTU 1: Tabel Rincian Nilai */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-black text-bta-green mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          Rincian Nilai Komponen
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-sm font-black text-bta-green uppercase tracking-wider">
                  Komponen Penilaian
                </th>
                <th className="text-center py-4 px-6 text-sm font-black text-bta-green uppercase tracking-wider w-32">
                  Nilai Skor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">Tajwid</td>
                <td className="text-center py-4 px-6 font-extrabold text-bta-black text-lg">
                  {hasil.tajwid}
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">Tahsin</td>
                <td className="text-center py-4 px-6 font-extrabold text-bta-black text-lg">
                  {hasil.tahsin}
                </td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">Makhorijul Huruf</td>
                <td className="text-center py-4 px-6 font-extrabold text-bta-black text-lg">
                  {hasil.makhorijulHuruf}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* KARTU 2: Grid Ringkasan Akhir (Responsif Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Skor */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-bta-green">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Total Skor Akhir
          </p>
          <h2 className="text-5xl font-black text-bta-green mt-3 tracking-tight">
            {totalNilai}
          </h2>
        </div>

        {/* Huruf Mutu */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-bta-yellow">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Huruf Mutu
          </p>
          <h2 className="text-5xl font-black text-bta-black mt-3">
            {hurufMutu}
          </h2>
        </div>

        {/* Status Akhir */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-gray-200">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
            Status Akhir
          </p>
          <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
            lulus 
              ? "bg-green-50 text-bta-green border border-bta-green/20" 
              : "bg-red-50 text-red-600 border border-red-200"
          }`}>
            {lulus ? "LULUS" : "TIDAK LULUS"}
          </span>
          {!lulus && (
            <p className="text-red-500 text-xs font-bold mt-3 animate-pulse">
              Wajib Mengulang Semester Pendek
            </p>
          )}
        </div>

      </div>

      {/* KARTU 3: Sertifikat Dokumen */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-black text-bta-green flex items-center">
              <svg className="w-6 h-6 mr-2 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 14zm0 0zm0 0l-6.16-3.422a12.083 12.083 0 00-.665 6.479A11.952 11.952 0 0112 14z"></path></svg>
              Sertifikat Resmi BTA
            </h2>
            <p className="text-gray-500 mt-2 font-medium text-sm leading-relaxed">
              Sertifikat kelulusan format PDF hanya dapat diunduh apabila Anda dinyatakan lulus secara kriteria nilai akademis dan berkas hasil studi telah disahkan oleh Kepala Pusat.
            </p>
          </div>

          <div className="flex-shrink-0">
            {bisaDownload ? (
              <button
                onClick={() => alert("Download Sertifikat PDF dimulai.")}
                className="w-full lg:w-auto bg-bta-yellow hover:bg-yellow-400 text-bta-black font-black px-8 py-4 rounded-xl shadow-[0_4px_14px_0_rgba(250,234,41,0.39)] hover:shadow-[0_6px_20px_rgba(250,234,41,0.23)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Download Sertifikat (.PDF)
              </button>
            ) : (
              <button
                disabled
                className="w-full lg:w-auto bg-gray-100 text-gray-400 border border-gray-200 px-8 py-4 rounded-xl font-bold cursor-not-allowed text-center"
              >
                Sertifikat Belum Tersedia
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KARTU 4: Informasi Kebijakan Kelulusan */}
      <div className="bg-bta-green/5 border border-bta-green/10 rounded-3xl p-6 md:p-8">
        <h3 className="font-black text-bta-green mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-bta-green opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Informasi Standar Akademik
        </h3>
        <ul className="space-y-3 text-gray-700 text-sm font-medium">
          <li className="flex items-start">
            <span className="text-bta-green font-bold mr-3">•</span>
            <span>Nilai akhir dikalkulasi secara transparan dari akumulasi seluruh ujian komponen dasar (Tajwid, Tahsin, Makhorijul Huruf) yang diinput oleh tutor kelas.</span>
          </li>
          <li className="flex items-start">
            <span className="text-bta-green font-bold mr-3">•</span>
            <span>Sesuai ketetapan institusi, batas standar kelulusan minimal adalah skor <strong className="text-bta-black">69 (Predikat Huruf Mutu B-)</strong>.</span>
          </li>
          <li className="flex items-start">
            <span className="text-bta-green font-bold mr-3">•</span>
            <span>Proses penerbitan nomor registrasi sertifikat digital memerlukan pengesahan mutlak dari Kepala Pusat BTA Universitas Nurul Huda.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default HasilStudi;