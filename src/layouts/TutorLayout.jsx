import { Outlet, Link, useLocation } from "react-router-dom";

function TutorLayout() {
  const location = useLocation();

  const menus = [
    {
      title: "Dashboard",
      path: "/tutor/dashboard",
    },
    {
      title: "Kelasku",
      path: "/tutor/kelasku",
    },
    {
      title: "Monitoring Presensi",
      path: "/tutor/presensi",
    },
    {
      title: "Penilaian",
      path: "/tutor/penilaian",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <aside className="w-72 bg-gradient-to-b from-green-700 to-emerald-800 text-white shadow-xl">

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
              className={`block rounded-xl px-4 py-3 transition-all duration-300 ${
                location.pathname === menu.path
                  ? "bg-white text-green-700 font-semibold shadow"
                  : "hover:bg-green-600"
              }`}
            >
              {menu.title}
            </Link>
          ))}

          <button
            className="w-full text-left rounded-xl px-4 py-3 mt-8 bg-red-500 hover:bg-red-600 transition-all"
          >
            Logout
          </button>

        </nav>

      </aside>

      <div className="flex-1 flex flex-col">

        <header className="bg-white h-20 shadow-sm flex items-center justify-between px-8">

          <div>

            <h1 className="text-2xl font-bold text-gray-800">
              Sistem Informasi BTA
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Portal Tutor
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="font-semibold text-gray-800">
                Dr. Ahmad Ulin Niam, M. Pd.
              </p>

              <p className="text-sm text-gray-500">
                Tutor BTA
              </p>

            </div>

            <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow">
              U
            </div>

          </div>

        </header>

        <main className="flex-1 p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default TutorLayout;