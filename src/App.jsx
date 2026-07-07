import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";

import MahasiswaLayout from "./layouts/MahasiswaLayout";
import TutorLayout from "./layouts/TutorLayout";
import AdminLayout from "./layouts/AdminLayout";

import DashboardMahasiswa from "./pages/mahasiswa/Dashboard";
import Administrasi from "./pages/mahasiswa/Administrasi";
import Kelasku from "./pages/mahasiswa/Kelasku";
import HasilStudi from "./pages/mahasiswa/HasilStudi";

import DashboardTutor from "./pages/tutor/Dashboard";
import KelaskuTutor from "./pages/tutor/Kelasku";
import PresensiTutor from "./pages/tutor/Presensi";
import PenilaianTutor from "./pages/tutor/Penilaian";

import DashboardAdmin from "./pages/admin_bta/Dashboard";
import ValidasiAdministrasi from "./pages/admin_bta/ValidasiAdministrasi";
import TesPenempatan from "./pages/admin_bta/TesPenempatan";
import ManajemenKelas from "./pages/admin_bta/ManajemenKelas";
import ValidasiNilai from "./pages/admin_bta/ValidasiNilai";

import DashboardKepala from "./pages/kepala/Dashboard";
import DashboardRektorat from "./pages/rektorat/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================= LOGIN ========================= */}

        <Route path="/" element={<Login />} />

        {/* ======================= MAHASISWA ======================= */}

        <Route path="/mahasiswa" element={<MahasiswaLayout />}>
          <Route path="dashboard" element={<DashboardMahasiswa />} />
          <Route path="administrasi" element={<Administrasi />} />
          <Route path="kelasku" element={<Kelasku />} />
          <Route path="hasil-studi" element={<HasilStudi />} />
        </Route>

        {/* ========================= TUTOR ========================= */}

        <Route path="/tutor" element={<TutorLayout />}>
          <Route path="dashboard" element={<DashboardTutor />} />
          <Route path="kelasku" element={<KelaskuTutor />} />
          <Route path="presensi" element={<PresensiTutor />} />
          <Route path="penilaian" element={<PenilaianTutor />} />
        </Route>

        {/* ====================== ADMIN BTA ======================== */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="validasi-administrasi" element={<ValidasiAdministrasi />} />
          <Route path="tes-penempatan" element={<TesPenempatan />} />
          <Route path="manajemen-kelas" element={<ManajemenKelas />} />
          <Route path="validasi-nilai" element={<ValidasiNilai />} />


        </Route>

        {/* ===================== KEPALA PUSAT ====================== */}

        <Route
          path="/kepala/dashboard"
          element={<DashboardKepala />}
        />

        {/* ======================= REKTORAT ======================== */}

        <Route
          path="/rektorat/dashboard"
          element={<DashboardRektorat />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;