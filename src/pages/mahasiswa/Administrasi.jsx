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

  const statusColor = () => {
    switch (status) {
      case "Belum Bayar":
        return "bg-red-100 text-red-600";

      case "Menunggu Validasi Staff":
        return "bg-yellow-100 text-yellow-700";

      case "Tervalidasi":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Administrasi BTA
        </h1>

        <p className="text-gray-500 mt-2">
          Selesaikan administrasi terlebih dahulu sebelum mengikuti proses
          pembelajaran BTA.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">

        <h2 className="text-xl font-semibold text-emerald-700 mb-6">
          Informasi Pembayaran
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-50 rounded-xl p-5">

            <p className="text-gray-500 text-sm">
              Biaya Administrasi
            </p>

            <h3 className="text-3xl font-bold text-emerald-600 mt-2">
              Rp100.000
            </h3>

          </div>

          <div className="bg-slate-50 rounded-xl p-5">

            <p className="text-gray-500 text-sm">
              Rekening Tujuan
            </p>

            <h3 className="text-xl font-semibold mt-2">
              BSI 7123456789
            </h3>

            <p className="text-gray-500">
              a.n. Universitas Nurul Huda
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold text-emerald-700">
            Status Administrasi
          </h2>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor()}`}
          >
            {status}
          </span>

        </div>

        {status !== "Tervalidasi" && (

          <div className="space-y-6">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Bukti Pembayaran
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:bg-emerald-600 file:text-white file:border-0 file:px-4 file:py-2 file:mr-4 file:cursor-pointer"
              />

              {file && (
                <p className="mt-3 text-sm text-gray-600">
                  File dipilih :
                  <span className="font-semibold ml-1">
                    {file.name}
                  </span>
                </p>
              )}

            </div>

            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Kirim Bukti Pembayaran
            </button>

          </div>

        )}

        {status === "Tervalidasi" && (

          <div className="bg-green-50 border border-green-200 rounded-xl p-5">

            <p className="text-green-700 font-semibold">
              Pembayaran telah tervalidasi.
            </p>

            <p className="text-green-600 mt-2">
              Anda sudah dapat mengakses seluruh fitur akademik BTA.
            </p>

          </div>

        )}

      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">

        <h3 className="font-semibold text-emerald-700 mb-3">
          Petunjuk
        </h3>

        <ul className="list-disc ml-5 space-y-2 text-gray-700">

          <li>
            Lakukan pembayaran administrasi sebesar <strong>Rp100.000</strong>.
          </li>

          <li>
            Upload bukti pembayaran dalam format PDF, JPG, JPEG, atau PNG.
          </li>

          <li>
            Tunggu proses validasi oleh Staff BTA.
          </li>

          <li>
            Setelah status berubah menjadi <strong>Tervalidasi</strong>, Anda
            dapat mengakses fitur pembelajaran.
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Administrasi;