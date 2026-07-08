import { useMemo } from "react";

function Kelasku() {
  const kelas = {
    nama: "MQ 2 - A",
    tutor: "Dr. Ahmad Ulin Niam, M. Pd.",
    hari: "Jumat",
    jam: "13.00 - 15.00",
  };

  const riwayatPresensi = [
    {
      tanggal: "04 Juli 2026",
      status: "Hadir",
    },
    {
      tanggal: "11 Juli 2026",
      status: "Hadir",
    },
    {
      tanggal: "18 Juli 2026",
      status: "Izin",
    },
    {
      tanggal: "25 Juli 2026",
      status: "Alpa",
    },
  ];

  const presensiAktif = useMemo(() => {
    const sekarang = new Date();

    const hari = sekarang.getDay();

    const jam = sekarang.getHours();

    return hari === 5 && jam >= 13 && jam < 15;
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Hadir":
        return "bg-green-100 text-green-700";

      case "Izin":
        return "bg-yellow-100 text-yellow-700";

      case "Alpa":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Kelasku
        </h1>

        <p className="text-gray-500 mt-2">
          Informasi kelas dan riwayat kehadiran mahasiswa.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Kelas
          </p>

          <h2 className="text-3xl font-bold text-emerald-600 mt-2">
            {kelas.nama}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Tutor
          </p>

          <h2 className="text-xl font-semibold mt-2">
            {kelas.tutor}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Jadwal
          </p>

          <h2 className="text-xl font-semibold mt-2">
            {kelas.hari}
          </h2>

          <p className="text-gray-600">
            {kelas.jam}
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>

            <h2 className="text-2xl font-semibold text-emerald-700">
              Presensi Hari Ini
            </h2>

            <p className="text-gray-500 mt-1">
              Tombol presensi hanya aktif sesuai jadwal kelas.
            </p>

          </div>

          <button
            disabled={!presensiAktif}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              presensiAktif
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => alert("Presensi berhasil diisi.")}
          >
            Isi Kehadiran / Presensi Sekarang
          </button>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">

        <h2 className="text-2xl font-semibold text-emerald-700 mb-6">
          Riwayat Kehadiran
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  No
                </th>

                <th className="text-left py-4">
                  Tanggal
                </th>

                <th className="text-left py-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {riwayatPresensi.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">
                    {index + 1}
                  </td>

                  <td className="py-4">
                    {item.tanggal}
                  </td>

                  <td className="py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">

        <h3 className="font-semibold text-emerald-700 mb-3">
          Informasi
        </h3>

        <ul className="list-disc ml-5 space-y-2 text-gray-700">

          <li>
            Presensi hanya dapat dilakukan pada hari dan jam kelas berlangsung.
          </li>

          <li>
            Apabila tombol berwarna abu-abu berarti jadwal presensi belum dibuka.
          </li>

          <li>
            Kehadiran akan direkap secara otomatis oleh sistem.
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Kelasku;