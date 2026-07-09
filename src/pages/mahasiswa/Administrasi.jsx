import { useState } from "react";

function Administrasi() {

  const [status, setStatus] = useState("Belum Bayar");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Silakan pilih bukti pembayaran terlebih dahulu.");
      return;
    }
    alert("Bukti pembayaran berhasil dikirim.");
    setStatus("Menunggu Validasi Staff");
  };

  // Hanya memodifikasi output string kelas Tailwind agar sesuai palet BTA
  const statusColor = () => {
    switch (status) {
      case "Belum Bayar":
        return "bg-red-50 text-red-600 border border-red-200";
      case "Menunggu Validasi Staff":
        return "bg-orange-50 text-orange-600 border border-orange-200";
      case "Tervalidasi":
        return "bg-green-50 text-bta-green border border-bta-green/30";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  // ==========================================
  // TAMPILAN UI/UX BTA (DIPERBARUI)
  // ==========================================
  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-black text-bta-green tracking-tight">
          Administrasi BTA
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Selesaikan administrasi terlebih dahulu sebelum mengikuti proses pembelajaran BTA.
        </p>
      </div>

      {/* KARTU 1: Informasi Pembayaran */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
        <h2 className="text-xl font-black text-bta-green mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          Informasi Pembayaran
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Box Biaya */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-bta-green/5 rounded-bl-full"></div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">
              Biaya Administrasi
            </p>
            <h3 className="text-4xl font-black text-bta-green">
              Rp100.000
            </h3>
          </div>

          {/* Box Rekening */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-bta-yellow/10 rounded-bl-full"></div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">
              Rekening Tujuan
            </p>
            <h3 className="text-2xl font-black text-bta-black tracking-tight">
              BSI <span className="text-bta-green">7123456789</span>
            </h3>
            <p className="text-gray-500 font-medium mt-1">
              a.n. Universitas Nurul Huda
            </p>
          </div>
        </div>
      </div>

      {/* KARTU 2: Status & Form Upload */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 relative overflow-hidden">
        
        {/* Header Kartu 2 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-xl font-black text-bta-green flex items-center">
            <svg className="w-6 h-6 mr-2 text-bta-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Status Administrasi
          </h2>
          <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${statusColor()}`}>
            {status}
          </span>
        </div>

        {/* Form Upload (Muncul jika belum tervalidasi) */}
        {status !== "Tervalidasi" && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300 hover:border-bta-green transition-colors">
              <label className="block text-sm font-bold text-bta-green mb-4">
                Upload Bukti Pembayaran
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 cursor-pointer
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-xl file:border-0
                  file:text-sm file:font-black file:uppercase file:tracking-wider
                  file:bg-bta-yellow file:text-bta-black
                  hover:file:bg-yellow-400 file:transition-colors file:cursor-pointer
                  focus:outline-none"
              />
              {file && (
                <div className="mt-4 flex items-center text-sm bg-white p-3 rounded-xl border border-gray-100 shadow-sm inline-block">
                  <svg className="w-5 h-5 text-bta-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                  <span className="text-gray-500 mr-1">File:</span> 
                  <span className="font-bold text-bta-green truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-bta-green hover:bg-green-900 text-white px-8 py-4 rounded-xl font-black tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Kirim Bukti Pembayaran
            </button>
          </div>
        )}

        {/* Pesan Sukses (Muncul jika tervalidasi) */}
        {status === "Tervalidasi" && (
          <div className="bg-bta-green/5 border border-bta-green/20 rounded-2xl p-6 flex items-start">
            <div className="bg-bta-green p-2 rounded-full mr-4 flex-shrink-0">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <div>
              <p className="text-bta-green font-black text-lg">
                Pembayaran telah tervalidasi.
              </p>
              <p className="text-gray-600 mt-1 font-medium leading-relaxed">
                Terima kasih. Anda sekarang sudah dapat mengakses seluruh fitur kelas dan akademik BTA.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* KARTU 3: Petunjuk */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
        <h3 className="font-black text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Petunjuk Administrasi
        </h3>
        <ul className="space-y-3 text-gray-600 font-medium">
          <li className="flex items-start">
            <span className="text-bta-yellow mr-3 font-bold">1.</span>
            <span>Lakukan pembayaran administrasi sebesar <strong className="text-bta-black">Rp100.000</strong> ke rekening yang tertera.</span>
          </li>
          <li className="flex items-start">
            <span className="text-bta-yellow mr-3 font-bold">2.</span>
            <span>Upload bukti transfer/pembayaran dalam format PDF, JPG, JPEG, atau PNG yang jelas terbaca.</span>
          </li>
          <li className="flex items-start">
            <span className="text-bta-yellow mr-3 font-bold">3.</span>
            <span>Tunggu proses validasi oleh Staff BTA maksimal 1x24 jam kerja.</span>
          </li>
          <li className="flex items-start">
            <span className="text-bta-yellow mr-3 font-bold">4.</span>
            <span>Setelah status berubah menjadi <strong className="text-bta-green">Tervalidasi</strong>, menu Kelasku akan terbuka.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Administrasi;