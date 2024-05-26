import Statistik from "./views/statistik";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataSakitPolisi from "./views/statistik/pages/data-sakit-polisi";
import DataPengunjungKlinik from "./views/statistik/pages/data-pengunjung-klinik";
import DataObatKlinik from "./views/statistik/pages/data-obat-klinik";
import Dashboard from "./views/klinik/pages/dashboard";
import Administrasi from "./views/klinik/pages/administrasi";
import Dokter from "./views/klinik/pages/dokter";
import Laporan from "./views/klinik/pages/laporan";
import Klinik from "./views/klinik";
import LoginAdmin from "./views/loginpage/LoginAdmin";
import LoginDokter from "./views/loginpage/LoginDokter";
import LoginApoteker from "./views/loginpage/LoginApoteker";
import LoginPawas from "./views/loginpage/LoginPawas";
import LoginStatistik from "./views/loginpage/LoginStatistik";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Statistik />} />
        <Route path="/data-sakit-polisi" element={<DataSakitPolisi />} />
        <Route
          path="/data-pengunjung-klinik"
          element={<DataPengunjungKlinik />}
        />
        <Route path="/data-obat-klinik" element={<DataObatKlinik />} />
        <Route path="/" element={<Klinik />} />
        <Route path="/administrasi" element={<Administrasi />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/adminlog" element={<LoginAdmin />} />
        <Route path="/dokterlog" element={<LoginDokter />} />
        <Route path="/apotekerlog" element={<LoginApoteker />} />
        <Route path="/pawaslog" element={<LoginPawas />} />
        <Route path="/statistiklog" element={<LoginStatistik />} />
      </Routes>
    </Router>
  );
}

export default App;
