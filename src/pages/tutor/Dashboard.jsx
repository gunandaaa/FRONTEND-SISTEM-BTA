import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Al Mukarom,
        </h1>

        <h2 className="text-2xl font-semibold text-emerald-600 mt-2">
          Dr. Ahmad Ulin Niam, M. Pd.
        </h2>

        <p className="text-gray-500 mt-3">
          Selamat datang di Sistem Informasi BTA Universitas Nurul Huda.
          Semoga aktivitas mengajar hari ini berjalan dengan lancar.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Total Kelas Diampu
          </p>

          <h2 className="text-4xl font-bold text-emerald-600 mt-3">
            4
          </h2>

          <p className="text-gray-500 mt-2">
            Kelas Semester Ganjil
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Mahasiswa Bimbingan
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            96
          </h2>

          <p className="text-gray-500 mt-2">
            Total mahasiswa aktif
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-gray-500 text-sm">
            Jadwal Terdekat
          </p>

          <h2 className="text-xl font-bold text-orange-500 mt-3">
            Jumat
          </h2>

          <p className="text-gray-600">
            13.00 - 15.00 WIB
          </p>

          <p className="text-gray-500 mt-2">
            MQ 2 - A
          </p>

        </div>

      </div>

      <div>

        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Pintasan
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          <Link
            to="/tutor/kelasku"
            className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg p-8 text-white hover:scale-[1.02] transition-all duration-300"
          >

            <h3 className="text-2xl font-bold">
              Jadwal Mengajar Hari Ini
            </h3>

            <p className="mt-3 text-green-100">
              Lihat jadwal kelas, lakukan absensi tutor, dan akses daftar mahasiswa.
            </p>

            <div className="mt-6 inline-block bg-white text-emerald-600 font-semibold px-5 py-2 rounded-lg">
              Buka Halaman
            </div>

          </Link>

          <Link
            to="/tutor/penilaian"
            className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-8 text-white hover:scale-[1.02] transition-all duration-300"
          >

            <h3 className="text-2xl font-bold">
              Masa Penilaian
            </h3>

            <p className="mt-3 text-blue-100">
              Upload nilai akhir mahasiswa menggunakan template Excel yang telah disediakan.
            </p>

            <div className="mt-6 inline-block bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg">
              Buka Halaman
            </div>

          </Link>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">

        <h2 className="text-2xl font-semibold text-emerald-700 mb-5">
          Informasi Terbaru
        </h2>

        <div className="space-y-4">

          <div className="border-l-4 border-emerald-500 pl-4">

            <h3 className="font-semibold text-gray-800">
              Jadwal Mengajar Berikutnya
            </h3>

            <p className="text-gray-600 mt-1">
              Jumat, 10 Juli 2026 • 13.00 - 15.00 WIB • Kelas MQ 2 - A
            </p>

          </div>

          <div className="border-l-4 border-blue-500 pl-4">

            <h3 className="font-semibold text-gray-800">
              Pengingat Penilaian
            </h3>

            <p className="text-gray-600 mt-1">
              Pengunggahan nilai mahasiswa dibuka hingga tanggal
              <strong> 31 Juli 2026</strong>.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;