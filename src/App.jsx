import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";

// --- IMPORT LANDING PAGE ---
import LandingPage from "./pages/LandingPage";

import MahasiswaLayout from "./layouts/MahasiswaLayout";
import TutorLayout from "./layouts/TutorLayout";
import AdminLayout from "./layouts/AdminLayout";
import KepalaLayout from "./layouts/KepalaLayout";
import RektoratLayout from "./layouts/RektoratLayout";

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
import PengesahanKelulusan from "./pages/kepala/PengesahanKelulusan";
import PelaporanDanEkspor from "./pages/kepala/PelaporanDanEkspor";
import ManajemenPengguna from "./pages/kepala/ManajemenPengguna";

import DashboardRektorat from "./pages/rektorat/Dashboard";
import LaporanAkademik from "./pages/rektorat/LaporanAkademik";
import LaporanKeuangan from "./pages/rektorat/LaporanKeuangan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ======================= PUBLIK ========================== */}
        <Route path="/" element={<LandingPage />} />

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
        <Route path="/kepala" element={<KepalaLayout />}>
          <Route path="dashboard" element={<DashboardKepala />} />
          <Route path="pengesahan-kelulusan" element={<PengesahanKelulusan />} />
          <Route path="pelaporan" element={<PelaporanDanEkspor />} />
          <Route path="manajemen-pengguna" element={<ManajemenPengguna />} />
        </Route>

        {/* ======================= REKTORAT ======================== */}
        <Route path="/rektorat" element={<RektoratLayout />}>
          <Route path="dashboard" element={<DashboardRektorat />} />
          <Route path="laporan-akademik" element={<LaporanAkademik />} />
          <Route path="laporan-keuangan" element={<LaporanKeuangan />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;