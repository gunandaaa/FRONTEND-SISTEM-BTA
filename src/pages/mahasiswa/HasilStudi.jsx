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

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Hasil Studi
        </h1>

        <p className="text-gray-500 mt-2">
          Ringkasan hasil pembelajaran BTA selama satu semester.
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">

        <h2 className="text-2xl font-semibold text-emerald-700 mb-6">
          Rincian Nilai
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Komponen Penilaian
                </th>

                <th className="text-center py-4">
                  Nilai
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-4">
                  Tajwid
                </td>

                <td className="text-center py-4 font-semibold">
                  {hasil.tajwid}
                </td>

              </tr>

              <tr className="border-b">

                <td className="py-4">
                  Tahsin
                </td>

                <td className="text-center py-4 font-semibold">
                  {hasil.tahsin}
                </td>

              </tr>

              <tr className="border-b">

                <td className="py-4">
                  Makhorijul Huruf
                </td>

                <td className="text-center py-4 font-semibold">
                  {hasil.makhorijulHuruf}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Total Skor Akhir
          </p>

          <h2 className="text-4xl font-bold text-emerald-600 mt-3">
            {totalNilai}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Huruf Mutu
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            {hurufMutu}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Status Akhir
          </p>

          <h2
            className={`text-2xl font-bold mt-3 ${
              lulus
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {lulus
              ? "LULUS"
              : "TIDAK LULUS"}
          </h2>

          {!lulus && (
            <p className="text-red-500 text-sm mt-2">
              Wajib Mengulang Semester Pendek
            </p>
          )}

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>

            <h2 className="text-2xl font-semibold text-emerald-700">
              Sertifikat BTA
            </h2>

            <p className="text-gray-500 mt-2">
              Sertifikat hanya dapat diunduh apabila mahasiswa dinyatakan
              lulus dan hasil telah disahkan oleh Kepala Pusat.
            </p>

          </div>

          {bisaDownload ? (
            <button
              onClick={() =>
                alert("Download Sertifikat PDF dimulai.")
              }
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Download Sertifikat
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-8 py-3 rounded-xl cursor-not-allowed"
            >
              Sertifikat Belum Tersedia
            </button>
          )}

        </div>

      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">

        <h3 className="font-semibold text-emerald-700 mb-3">
          Informasi
        </h3>

        <ul className="list-disc ml-5 space-y-2 text-gray-700">

          <li>
            Nilai akhir dihitung berdasarkan seluruh komponen penilaian yang
            diberikan oleh tutor.
          </li>

          <li>
            Mahasiswa dinyatakan lulus apabila memperoleh nilai minimal
            <strong> 69 (B-)</strong>.
          </li>

          <li>
            Sertifikat hanya dapat diunduh setelah hasil studi disahkan oleh
            Kepala Pusat BTA.
          </li>

        </ul>

      </div>

    </div>
  );
}

export default HasilStudi;