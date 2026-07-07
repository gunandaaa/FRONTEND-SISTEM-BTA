function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Assalamu'alaikum,
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Status Akun
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-3">
            Aktif
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Tingkat MQ
          </h2>

          <p className="text-3xl font-bold text-blue-600 mt-3">
            MQ 2
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Pengumuman
          </h2>

          <p className="mt-3">
            Selamat datang di Sistem Informasi BTA.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;