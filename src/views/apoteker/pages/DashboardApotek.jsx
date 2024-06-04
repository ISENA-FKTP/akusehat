import React, { useState, useEffect } from 'react';
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";

const DashboardApotek = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch('/data/medicine.json') // Mengambil data dari file JSON
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error fetching medicines:', error));
  }, []);

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
              {medicines.map((medicine, index) => (
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
