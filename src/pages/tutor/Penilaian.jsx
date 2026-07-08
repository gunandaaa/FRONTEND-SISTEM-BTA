import { useRef, useState } from "react";

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
      case "Belum Unggah":
        return "bg-red-100 text-red-700";

      case "Menunggu Validasi Staf":
        return "bg-yellow-100 text-yellow-700";

      case "Disahkan":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Penilaian Mahasiswa
        </h1>

        <p className="text-gray-500 mt-2">
          Halaman ini digunakan untuk mengunduh template nilai,
          mengisi nilai mahasiswa, kemudian mengunggah kembali file
          Excel ke dalam sistem.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Deadline Penyerahan
          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">
            31 Juli 2026
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Kelas
          </p>

          <h2 className="text-2xl font-bold text-emerald-600 mt-2">
            MQ 2 - A
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Status Unggahan
          </p>

          <div className="mt-3">

            <span
              className={`px-4 py-2 rounded-full font-semibold ${badgeStatus()}`}
            >
              {status}
            </span>

          </div>

        </div>

      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Instruksi Pengisian Nilai
        </h2>

        <ol className="list-decimal ml-6 space-y-2 text-gray-700">

          <li>
            Unduh template nilai Excel yang telah disediakan sistem.
          </li>

          <li>
            Template sudah berisi NIM dan nama mahasiswa sesuai kelas
            yang Anda ampu.
          </li>

          <li>
            Isi seluruh nilai mahasiswa pada kolom yang telah
            disediakan.
          </li>

          <li>
            Simpan file dalam format Excel (.xlsx).
          </li>

          <li>
            Unggah kembali file tersebut sebelum batas waktu
            pengumpulan berakhir.
          </li>

        </ol>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Import / Export Nilai
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="border rounded-2xl p-6">

            <h3 className="text-xl font-semibold text-emerald-600">
              Download Template
            </h3>

            <p className="text-gray-500 mt-3">
              Unduh template nilai yang telah berisi data mahasiswa
              pada kelas Anda.
            </p>

            <button
              onClick={() =>
                alert("Template Excel akan diunduh.")
              }
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
            >
              Unduh Template Nilai Excel
            </button>

          </div>

          <div className="border rounded-2xl p-6">

            <h3 className="text-xl font-semibold text-blue-600">
              Upload Nilai
            </h3>

            <p className="text-gray-500 mt-3">
              Pilih file Excel yang telah diisi kemudian unggah ke
              sistem.
            </p>

            <input
              ref={inputFile}
              type="file"
              accept=".xlsx,.xls"
              onChange={pilihFile}
              className="hidden"
            />

            <button
              onClick={() => inputFile.current.click()}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
            >
              Pilih File
            </button>

            {file && (
              <div className="mt-4 bg-slate-100 rounded-lg p-3 text-sm text-gray-700">
                File dipilih :
                <br />
                <strong>{file.name}</strong>
              </div>
            )}

            <button
              onClick={uploadNilai}
              disabled={status !== "Belum Unggah"}
              className={`mt-5 w-full py-3 rounded-xl font-semibold transition ${
                status === "Belum Unggah"
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Unggah Nilai
            </button>

          </div>

        </div>

      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">

        <h2 className="text-lg font-semibold text-amber-700 mb-3">
          Informasi
        </h2>

        <ul className="list-disc ml-5 space-y-2 text-gray-700">

          <li>
            Template Excel hanya dapat digunakan untuk kelas yang
            diampu oleh Tutor.
          </li>

          <li>
            Setelah file berhasil diunggah, status akan berubah menjadi
            <strong> Menunggu Validasi Staf</strong>.
          </li>

          <li>
            Selama status masih <strong>Menunggu Validasi Staf</strong>,
            tombol upload akan dinonaktifkan untuk mencegah unggahan
            ganda.
          </li>

          <li>
            Apabila staf meminta revisi, status dapat dikembalikan
            sehingga Tutor dapat mengunggah ulang file nilai.
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Penilaian;