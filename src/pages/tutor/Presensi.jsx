import { useState } from "react";

function Presensi() {
  const [mahasiswa, setMahasiswa] = useState([
    {
      id: 1,
      nim: "23110001",
      nama: "Ahmad Fauzan",
      waktu: "13:02 WIB",
      status: "Hadir",
    },
    {
      id: 2,
      nim: "23110002",
      nama: "Muhammad Rizki",
      waktu: "-",
      status: "Belum Hadir",
    },
    {
      id: 3,
      nim: "23110003",
      nama: "Nur Aisyah",
      waktu: "13:05 WIB",
      status: "Hadir",
    },
    {
      id: 4,
      nim: "23110004",
      nama: "Siti Rahma",
      waktu: "-",
      status: "Izin",
    },
    {
      id: 5,
      nim: "23110005",
      nama: "Dimas Pratama",
      waktu: "13:04 WIB",
      status: "Hadir",
    },
  ]);

  const ubahKeAlpa = (id) => {
    setMahasiswa(
      mahasiswa.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Alpa",
              waktu: "-",
            }
          : item
      )
    );
  };

  const warnaStatus = (status) => {
    switch (status) {
      case "Hadir":
        return "bg-green-100 text-green-700";

      case "Belum Hadir":
        return "bg-yellow-100 text-yellow-700";

      case "Izin":
        return "bg-blue-100 text-blue-700";

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
          Monitoring Presensi Mahasiswa
        </h1>

        <p className="text-gray-500 mt-2">
          Halaman ini digunakan untuk memantau kehadiran mahasiswa selama
          proses pembelajaran berlangsung.
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Nama Kelas
          </p>

          <h2 className="text-2xl font-bold text-emerald-600 mt-2">
            MQ 2 - A
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Jadwal
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-2">
            Jumat
          </h2>

          <p className="text-gray-500">
            13.00 - 15.00 WIB
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Mahasiswa Hadir
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {
              mahasiswa.filter(
                (m) => m.status === "Hadir"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Total Mahasiswa
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {mahasiswa.length}
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="px-6 py-5 border-b">

          <h2 className="text-xl font-semibold text-gray-800">
            Daftar Kehadiran Mahasiswa
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  No
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  NIM
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Nama Mahasiswa
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Timestamp
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody>

              {mahasiswa.map((item, index) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {item.nim}
                  </td>

                  <td className="px-6 py-4">
                    {item.nama}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.waktu}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${warnaStatus(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-center">

                    {item.status === "Hadir" ? (

                      <button
                        onClick={() => ubahKeAlpa(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Batalkan Kehadiran
                      </button>

                    ) : (

                      <button
                        disabled
                        className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
                      >
                        Tidak Tersedia
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">

        <h2 className="text-lg font-semibold text-amber-700 mb-3">
          Informasi
        </h2>

        <ul className="list-disc ml-5 space-y-2 text-gray-700">

          <li>
            Data presensi mahasiswa diperoleh dari tombol presensi yang
            diklik pada aplikasi mahasiswa.
          </li>

          <li>
            Waktu kehadiran ditampilkan berdasarkan timestamp saat
            mahasiswa melakukan presensi.
          </li>

          <li>
            Jika mahasiswa tercatat <strong>Hadir</strong> tetapi tidak
            berada di ruang kelas, Tutor dapat menekan tombol
            <strong> Batalkan Kehadiran</strong> sehingga status berubah
            menjadi <strong>Alpa</strong>.
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Presensi;