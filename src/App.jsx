import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Administrasi from "./views/klinik/pages/administrasi";
import Dokter from "./views/klinik/pages/dokter";
import Laporan from "./views/klinik/pages/laporan";
import KajianAwal from "./views/klinik/pages/kajianawal";
import Dashboard from "./views/klinik";
import Login from "./views/loginpage/LoginAdmin";
import LoginAdmin from "./views/loginpage/LoginAdmin";
import LoginDokter from "./views/loginpage/LoginDokter";
import LoginApoteker from "./views/loginpage/LoginApoteker";
import LoginPawas from "./views/loginpage/LoginPawas";
import LoginStatistik from "./views/loginpage/LoginStatistik";
import Statistik from "./views/statistik/";
import DataSakitPolisi from "./views/statistik/pages/data-sakit-polisi";
import DataPengunjungKlinik from "./views/statistik/pages/data-pengunjung-klinik";
import DataObatKlinik from "./views/statistik/pages/data-obat-klinik";
import TambahObat from "./views/apoteker/pages/tambahObat";
import DashboardApotek from "./views/apoteker/pages/DashboardApotek";
import Manage from "./views/manage";
import HomeVisit from "./views/manage/pages/homevisit";
import RekamMedis from "./views/manage/pages/rekammedis";


function App() {
  return (
    <Router>
      <Routes>
        {/* Klinik */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/administrasi" element={<Administrasi />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/kajianawal" element={<KajianAwal />} />
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/adminlog" element={<LoginAdmin />} />
        <Route path="/dokterlog" element={<LoginDokter />} />
        <Route path="/apotekerlog" element={<LoginApoteker />} />
        <Route path="/pawaslog" element={<LoginPawas />} />
        <Route path="/statistiklog" element={<LoginStatistik />} />
        <Route path="/apotek/tambah-obat" element={<TambahObat />} />
        <Route path="/apotek" element={<DashboardApotek />} />

        {/* Statistik */}
        <Route path="/statistik" element={<Statistik />} />
        <Route
          path="/statistik/data-sakit-polisi"
          element={<DataSakitPolisi />}
        />
        <Route
          path="/statistik/data-pengunjung-klinik"
          element={<DataPengunjungKlinik />}
        />
        <Route
          path="/statistik/data-obat-klinik"
          element={<DataObatKlinik />}
        />

        <Route 
        path="/manage/data-home-visit"
        element={<HomeVisit/>} />
        <Route 
        path="/manage/data-rekam-medis"
        element={<RekamMedis/>} />
      </Routes>
    </Router>
  );
}

export default App;
