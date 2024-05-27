import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./views/klinik/pages/dashboard";
import Administrasi from "./views/klinik/pages/administrasi";
import Dokter from "./views/klinik/pages/dokter";
import Laporan from "./views/klinik/pages/laporan";
import Klinik from "./views/klinik";
import TambahObat from "./views/apoteker/pages/tambahObat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Klinik />} />
        <Route path="/administrasi" element={<Administrasi />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/tambah-obat" element={<TambahObat />} />
      </Routes>
    </Router>
  );
}

export default App;
