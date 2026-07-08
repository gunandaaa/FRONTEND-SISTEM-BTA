import { Link } from "react-router-dom";

function Dashboard() {
  const cards = [
    {
      title: "Slip Menunggu Validasi",
      total: 15,
      color: "bg-yellow-500",
      link: "/admin/validasi-administrasi",
    },
    {
      title: "Kelas Belum Mendapat Tutor",
      total: 3,
      color: "bg-blue-500",
      link: "/admin/manajemen-kelas",
    },
    {
      title: "Laporan Nilai Menunggu Pengecekan",
      total: 5,
      color: "bg-green-500",
      link: "/admin/validasi-nilai",
    },
    {
      title: "Mahasiswa Belum Tes Penempatan",
      total: 21,
      color: "bg-red-500",
      link: "/admin/tes-penempatan",
    },
  ];

  const todo = [
    "Validasi pembayaran mahasiswa baru.",
    "Melakukan plotting tutor ke kelas semester berjalan.",
    "Memeriksa file nilai yang diunggah tutor.",
    "Memasukkan hasil tes penempatan mahasiswa baru.",
  ];

  const aktivitas = [
    {
      waktu: "08.10",
      aktivitas: "Tutor Ust. Ahmad mengunggah nilai kelas MQ 2 - A",
    },
    {
      waktu: "09.25",
      aktivitas: "12 mahasiswa mengunggah bukti pembayaran.",
    },
    {
      waktu: "10.40",
      aktivitas: "Kelas MQ 1 - B berhasil dibuat.",
    },
    {
      waktu: "11.15",
      aktivitas: "3 mahasiswa telah menyelesaikan tes penempatan.",
    },
  ];

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-emerald-600 to-green-500 rounded-3xl p-8 text-white shadow-lg">

        <h1 className="text-3xl font-bold">
          Selamat Datang, Admin BTA 👋
        </h1>

        <p className="mt-3 text-green-100">
          Dashboard ini menampilkan seluruh pekerjaan operasional
          yang perlu diselesaikan hari ini.
        </p>

      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >

            <div
              className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center text-white text-2xl font-bold`}
            >
              {card.total}
            </div>

            <h2 className="font-bold text-gray-800 mt-5 text-lg">
              {card.title}
            </h2>

            <Link
              to={card.link}
              className="inline-block mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl transition"
            >
              Lihat Antrean
            </Link>

          </div>

        ))}

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-md">

          <div className="border-b px-6 py-4">

            <h2 className="text-xl font-bold text-gray-800">
              To-Do Hari Ini
            </h2>

          </div>

          <div className="p-6">

            <ul className="space-y-4">

              {todo.map((item, index) => (

                <li
                  key={index}
                  className="flex items-start gap-3"
                >

                  <div className="w-3 h-3 rounded-full bg-emerald-500 mt-2"></div>

                  <span className="text-gray-700">
                    {item}
                  </span>

                </li>

              ))}

            </ul>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-md">

          <div className="border-b px-6 py-4">

            <h2 className="text-xl font-bold text-gray-800">
              Aktivitas Terbaru
            </h2>

          </div>

          <div className="divide-y">

            {aktivitas.map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center px-6 py-4"
              >

                <span className="font-semibold text-emerald-600">
                  {item.waktu}
                </span>

                <span className="text-gray-700 text-right">
                  {item.aktivitas}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">

        <h2 className="font-bold text-blue-700 text-lg">
          Informasi
        </h2>

        <p className="mt-3 text-gray-700 leading-7">
          Seluruh data pada dashboard ini masih menggunakan data
          simulasi (dummy). Ketika backend selesai dibuat, seluruh
          angka pada kartu indikator, daftar pekerjaan, dan aktivitas
          terbaru akan diperbarui secara otomatis berdasarkan data
          yang tersimpan di database.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;