import Statistik from "./views/statistik";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataSakitPolisi from "./views/statistik/pages/data-sakit-polisi";
import DataPengunjungKlinik from "./views/statistik/pages/data-pengunjung-klinik";
import DataObatKlinik from "./views/statistik/pages/data-obat-klinik";

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
      </Routes>
    </Router>
  );
}

export default App;
