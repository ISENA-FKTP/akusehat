import React, { useState, useEffect } from 'react';
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";

const DashboardApotek = () => {
  const [medicines, setMedicines] = useState([]);
  const [sortedMedicines, setSortedMedicines] = useState([]);
  const [sortBy, setSortBy] = useState('most'); // 'most' untuk paling banyak, 'least' untuk paling sedikit

  useEffect(() => {
    fetch('/data/medicine.json') // Mengambil data dari file JSON
      .then(response => response.json())
      .then(data => {
        setMedicines(data);
        // Mengurutkan obat berdasarkan jumlah (quantity) terbanyak atau terendah
        const sorted = sortBy === 'most' ? [...data].sort((a, b) => b.quantity - a.quantity) : [...data].sort((a, b) => a.quantity - b.quantity);
        setSortedMedicines(sorted);
      })
      .catch(error => console.error('Error fetching medicines:', error));
  }, [sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <Header
        title="Statistik Data Laporan"
        userName="Rifki Rusdi Satma Putra"
        userStatus="Kepala Polisi"
        profilePicture="/logo.png"
      />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mt-4 mb-2">Data Seluruh Obat Apotek</h1>
        <h2 className="text-xl font-semibold mb-4 text-secondary-700">Seluruh data terkait obat di apotek</h2>
        <div className="flex justify-between mb-4">
          <div>
            <label htmlFor="sort">Urutkan berdasarkan:</label>
            <select id="sort" value={sortBy} onChange={handleSortChange} className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="most">Paling Banyak</option>
              <option value="least">Paling Sedikit</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nama Obat</th>
                <th className="border px-4 py-2">Jumlah</th>
                <th className="border px-4 py-2">Kategori</th>
                <th className="border px-4 py-2">Jenis</th>
                <th className="border px-4 py-2">Entry Date</th>
                <th className="border px-4 py-2">Expiry Date</th>
                <th className="border px-4 py-2">Harga</th>
              </tr>
            </thead>
            <tbody>
              {sortedMedicines.map((medicine, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="border px-4 py-2">{medicine.medicineName}</td>
                  <td className="border px-4 py-2">{medicine.quantity}</td>
                  <td className="border px-4 py-2">{medicine.category}</td>
                  <td className="border px-4 py-2">{medicine.type}</td>
                  <td className="border px-4 py-2">{medicine.entryDate}</td>
                  <td className="border px-4 py-2">{medicine.expiryDate}</td>
                  <td className="border px-4 py-2">Rp{medicine.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardApotek;
