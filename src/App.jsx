import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./views/klinik/pages/dashboard";
import Administrasi from "./views/klinik/pages/administrasi";
import Dokter from "./views/klinik/pages/dokter";
import Laporan from "./views/klinik/pages/laporan";
import Klinik from "./views/klinik";
import KajianAwal from "./views/klinik/pages/kajianawal";
import Statistik from "./views/statistik/";
import DataSakitPolisi from "./views/statistik/pages/data-sakit-polisi";
import DataPengunjungKlinik from "./views/statistik/pages/data-pengunjung-klinik";
import DataObatKlinik from "./views/statistik/pages/data-obat-klinik";
import TambahObat from "./views/apoteker/pages/tambahObat";
import Manage from "./views/manage";
import HomeVisit from "./views/manage/pages/homevisit";
import RekamMedis from "./views/manage/pages/rekammedis";
import TambahDataSakit from "./views/manage/pages/tambahDataSakit";
import TambahDataHomeVisit from "./views/manage/pages/tambahDataHomeVisit";
import TambahDataRekamMedis from "./views/manage/pages/tambahDataRekamMedis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/apotek/tambah-obat" element={<TambahObat />} />

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
        <Route path="/klinik" element={<Klinik />} />
        <Route path="/administrasi" element={<Administrasi />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/kajianawal" element={<KajianAwal />} />

        <Route 
        path="/manage"
        element={<Manage/>} />

        <Route 
        path="/manage/data-home-visit"
        element={<HomeVisit/>} />

        <Route 
        path="/manage/data-rekam-medis"
        element={<RekamMedis/>} />

        <Route 
        path="/manage/data-sakit/tambah-data"
        element={<TambahDataSakit/>} />
        
        <Route 
        path="/manage/data-home-visit/tambah-data"
        element={<TambahDataHomeVisit/>} />
        <Route 
        path="/manage/data-rekam-medis/tambah-data"
        element={<TambahDataRekamMedis/>} />
      </Routes>
    </Router>
  );
}

export default App;
