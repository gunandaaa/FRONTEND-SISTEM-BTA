import { Outlet, Link, useLocation } from "react-router-dom";

function MahasiswaLayout() {
  const location = useLocation();

  const menus = [
    {
      title: "Dashboard",
      path: "/mahasiswa/dashboard",
    },
    {
      title: "Administrasi",
      path: "/mahasiswa/administrasi",
    },
    {
      title: "Kelasku",
      path: "/mahasiswa/kelasku",
    },
    {
      title: "Hasil Studi",
      path: "/mahasiswa/hasil-studi",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <aside className="w-64 bg-green-700 text-white shadow-xl">

        <div className="p-6 border-b border-green-600">
          <h1 className="text-2xl font-bold">
            SIM BTA
          </h1>

          <p className="text-sm text-green-100 mt-2">
            Universitas Nurul Huda
          </p>
        </div>

        <nav className="p-4 space-y-2">

          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`block rounded-lg px-4 py-3 transition-all ${
                location.pathname === menu.path
                  ? "bg-white text-green-700 font-semibold"
                  : "hover:bg-green-600"
              }`}
            >
              {menu.title}
            </Link>
          ))}

          <button
            className="w-full text-left mt-8 rounded-lg px-4 py-3 bg-red-500 hover:bg-red-600 transition"
          >
            Logout
          </button>

        </nav>

      </aside>

      <div className="flex-1 flex flex-col">

        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Sistem Informasi BTA
            </h2>

            <p className="text-sm text-gray-500">
              Dashboard Mahasiswa
            </p>
          </div>

          <div className="text-right">

            <p className="font-semibold">
              Gunanda Dwi Tara
            </p>

            <p className="text-sm text-gray-500">
              Mahasiswa
            </p>

          </div>

        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MahasiswaLayout;