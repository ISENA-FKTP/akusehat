import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Administrasi from "./views/klinik/pages/administrasi";
import Dokter from "./views/klinik/pages/dokter";
import Laporan from "./views/klinik/pages/laporan";
import KajianAwal from "./views/klinik/pages/kajianawal";
import DashboardKlinik from "./views/klinik";
import Login from "./views/loginpage/index";
import Statistik from "./views/statistik/";
import DataSakitPolisi from "./views/statistik/pages/data-sakit-polisi";
import DataPengunjungKlinik from "./views/statistik/pages/data-pengunjung-klinik";
import DataObatKlinik from "./views/statistik/pages/data-obat-klinik";
import TambahObat from "./views/apoteker/pages/tambahObat";
import DashboardApotekUtama from "./views/apoteker/pages/DashboardApotek";
import DashboardApotek from "./views/apoteker/index";
import DashboardDokter from "./views/dokter/index";
import Manage from "./views/manage";
import HomeVisit from "./views/manage/pages/homevisit";
import RekamMedis from "./views/manage/pages/rekammedis";
import TambahDataSakit from "./views/manage/pages/tambahDataSakit";
import TambahDataHomeVisit from "./views/manage/pages/tambahDataHomeVisit";
import TambahDataRekamMedis from "./views/manage/pages/tambahDataRekamMedis";
import Pengingat from "./views/apoteker/pages/Pengingat";
import DetailPage from "./views/manage/pages/detail";
import LaporanApotek from "./views/apoteker/pages/LaporanApotek";

function App() {
  return (
    <Router>
      <Routes>
        {/* Klinik */}
        <Route path="/dashboard_klinik" element={<DashboardKlinik />} />
        <Route path="/dashboard_apotek" element={<DashboardApotek />} />
        <Route path="/dashboard_dokter" element={<DashboardDokter />} />
        <Route path="/administrasi" element={<Administrasi />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/kajianawal" element={<KajianAwal />} />
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/apotek/tambah-obat" element={<TambahObat />} />
        <Route path="/apotek" element={<DashboardApotekUtama />} />
        <Route path="/apotek/pengingat" element={<Pengingat />} />
        <Route path="/apotek/laporan-apotek" element={<LaporanApotek />} />

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

        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/data-home-visit" element={<HomeVisit />} />
        <Route path="/manage/data-rekam-medis" element={<RekamMedis />} />
<<<<<<< HEAD
        <Route 
        path="/manage/data-sakit/tambah-data"
        element={<TambahDataSakit/>} />
        <Route 
        path="/manage/data-home-visit/tambah-data"
        element={<TambahDataHomeVisit/>} />
        <Route 
        path="/manage/data-rekam-medis/tambah-data"
        element={<TambahDataRekamMedis/>} />
        <Route 
        path="/manage/detail/:nrp"
        element={<DetailPage/>} />


=======
        <Route
          path="/manage/data-sakit/tambah-data"
          element={<TambahDataSakit />}
        />
        <Route
          path="/manage/data-home-visit/tambah-data"
          element={<TambahDataHomeVisit />}
        />
        <Route
          path="/manage/data-rekam-medis/tambah-data"
          element={<TambahDataRekamMedis />}
        />
        <Route path="/manage/detail/:nrp" element={<DetailPage />} />
>>>>>>> f30e9cee008cc5e0a50f4e4bcfedabb54b64a120
      </Routes>
    </Router>
  );
}

export default App;
