export const roleMenus = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manajemen Kelas", path: "/admin/manajemen-kelas" },
    { label: "Manajemen Mahasiswa", path: "/admin/manajeme-mahasiswa" },
    { label: "Nilai Tes", path: "/admin/tes-penempatan" },
    { label: "Validasi Admin", path: "/admin/validasi-admin" },
    { label: "Validasi Nilai", path: "/admin/validasi-nilai" },

    
  ],
  tutor: [
    { label: "Dashboard", path: "/tutor/dashboard" },
    { label: "Kelasku", path: "/tutor/kelasku" },
    { label: "Monitoring Presensi", path: "/tutor/presensi" },
    { label: "Penilaian", path: "/tutor/penilaian" }
  ],
  mahasiswa: [
    { label: "Dashboard", path: "/mahasiswa/dashboard" },
    { label: "Administrasi", path: "/mahasiswa/administrasi" },
    { label: "Hasil Studi", path: "/mahasiswa/hasil-studi" },
    { label: "Kelasku", path: "/mahasiswa/kelasku" },
  ],
  rektorat: [
    { label: "Dashboard", path: "/rektorat/dashboard" },
    { label: "Laporan Akademik", path: "/rektorat/laporan-akademik" },
    { label: "Laporan Keuangan", path: "/rektorat/laporan-keuangan" },
  ],
  kepala: [
    { label: "Dashboard", path: "/kepala/dashboard" },
    { label: "Manajemen Pengguna", path: "/kepala/manajemen-pengguna" },
    { label: "Pelaporan & Export", path: "/kepala/pelaporan" },
    { label: "Pengesahan Kelulusan", path: "/kepala/pengesahan-kelulusan" },
  ]
};