import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./views/klinik/pages/dashboard";
import Administrasi from "./views/klinik/pages/administrasi";
import Dokter from "./views/klinik/pages/dokter";
import Laporan from "./views/klinik/pages/laporan";
import KajianAwal from "./views/klinik/pages/kajianawal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/administrasi" element={<Administrasi />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/kajianawal" element={<KajianAwal />} />
      </Routes>
    </Router>
  );
}

export default App;
