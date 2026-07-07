import { useState } from "react";

function Kelasku() {
  const [sudahHadir, setSudahHadir] = useState(false);

  const daftarKelas = [
    {
      id: 1,
      kelas: "MQ 2 - A",
      hari: "Jumat",
      jam: "13.00 - 15.00 WIB",
      ruangan: "Ruang BTA 1",
      mahasiswa: 24,
    },
    {
      id: 2,
      kelas: "MQ 1 - B",
      hari: "Sabtu",
      jam: "08.00 - 10.00 WIB",
      ruangan: "Ruang BTA 2",
      mahasiswa: 27,
    },
  ];

  const handleHadir = () => {
    setSudahHadir(true);
    alert("Kehadiran tutor berhasil dicatat.");
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Kelasku & Jadwal Mengajar
        </h1>

        <p className="text-gray-500 mt-2">
          Daftar kelas yang ditugaskan kepada Anda pada semester ini.
        </p>

      </div>

      {daftarKelas.map((kelas) => (

        <div
          key={kelas.id}
          className="bg-white rounded-2xl shadow-md p-8"
        >

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

            <div className="space-y-5">

              <div>

                <p className="text-sm text-gray-500">
                  Nama Kelas
                </p>

                <h2 className="text-3xl font-bold text-emerald-600 mt-1">
                  {kelas.kelas}
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <p className="text-sm text-gray-500">
                    Hari
                  </p>

                  <h3 className="font-semibold text-gray-800 mt-1">
                    {kelas.hari}
                  </h3>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Jam
                  </p>

                  <h3 className="font-semibold text-gray-800 mt-1">
                    {kelas.jam}
                  </h3>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Ruangan
                  </p>

                  <h3 className="font-semibold text-gray-800 mt-1">
                    {kelas.ruangan}
                  </h3>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Jumlah Mahasiswa
                  </p>

                  <h3 className="font-semibold text-gray-800 mt-1">
                    {kelas.mahasiswa} Mahasiswa
                  </h3>

                </div>

              </div>

            </div>

            <div className="flex flex-col gap-4 lg:w-64">

              <button
                onClick={handleHadir}
                disabled={sudahHadir}
                className={`rounded-xl py-3 font-semibold transition-all ${
                  sudahHadir
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg"
                }`}
              >
                {sudahHadir ? "Sudah Hadir" : "Klik Hadir"}
              </button>

              <button
                onClick={() =>
                  alert("Membuka daftar mahasiswa kelas.")
                }
                className="rounded-xl py-3 font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all"
              >
                Lihat Daftar Mahasiswa
              </button>

            </div>

          </div>

        </div>

      ))}

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">

        <h2 className="text-xl font-semibold text-emerald-700 mb-3">
          Informasi
        </h2>

        <ul className="list-disc ml-5 space-y-2 text-gray-700">

          <li>
            Tutor hanya dapat melihat kelas yang ditugaskan oleh Staf BTA.
          </li>

          <li>
            Kehadiran tutor dicatat melalui tombol <strong>Klik Hadir</strong>.
          </li>

          <li>
            Gunakan tombol <strong>Lihat Daftar Mahasiswa</strong> untuk
            membuka daftar peserta pada kelas tersebut.
          </li>

          <li>
            Jadwal mengajar dapat berubah sesuai keputusan pihak BTA.
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Kelasku;