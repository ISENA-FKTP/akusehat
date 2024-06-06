
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";

const DashboardApotek = () => {
  const [medicines, setMedicines] = useState([]);
  const [sortedMedicines, setSortedMedicines] = useState([]);
  const [sortBy, setSortBy] = useState('most');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);

  const categories = ['Obat Cair', 'Obat Padat']; // Kategori yang tersedia
  const types = ["Tablet", "Syrup"]; // Jenis obat yang tersedia

  useEffect(() => {
    // Fetch data saat komponen dimount
    fetch('/data/medicine.json')
      .then(response => response.json())
      .then(data => {
        setMedicines(data);
        sortMedicines(data); // Mengurutkan data saat pertama kali diambil
      })
      .catch(error => console.error('Error fetching medicines:', error));
  }, [sortBy]); // Diaktifkan kembali saat sortBy berubah


  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openEditModal = (medicine) => {
    setCurrentMedicine({ ...medicine });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentMedicine(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentMedicine(prevMedicine => ({
      ...prevMedicine,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    const updatedMedicines = medicines.map(medicine =>
      medicine.medicineName === currentMedicine.medicineName ? currentMedicine : medicine
    );
    setMedicines(updatedMedicines);
    sortMedicines(updatedMedicines);
    closeEditModal();
  };

  const sortMedicines = (medicinesToSort) => {

    const sorted = sortBy === 'most'
      ? [...medicinesToSort].sort((a, b) => b.quantity - a.quantity)
      : [...medicinesToSort].sort((a, b) => a.quantity - b.quantity);

    setSortedMedicines(sorted);
  };

  const filteredMedicines = sortedMedicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <div className="flex-1">
        {" "}
        {/* margin-left disesuaikan dengan lebar sidebar */}
        <Header
          title="Dashboard Apotek"
          userName="Rifki Rusdi Satma Putra"
          userStatus="Apoteker"
          profilePicture="/logo.png"
        />
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mt-4 mb-2">
            Data Seluruh Obat Apotek
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-secondary-700">
            Seluruh data terkait obat di apotek
          </h2>
          <div className="flex justify-between mb-4">
            <div>
              <label htmlFor="sort">Urutkan berdasarkan:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="most">Paling Banyak</option>
                <option value="least">Paling Sedikit</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Cari obat..."
                value={searchTerm}
                onChange={handleSearch}
                className="ml-2 px-2 py-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-warning-400">Nama Obat</th>
                  <th className="border px-4 py-2 bg-warning-400">Jumlah</th>
                  <th className="border px-4 py-2 bg-warning-400">Kategori</th>
                  <th className="border px-4 py-2 bg-warning-400">Jenis</th>
                  <th className="border px-4 py-2 bg-warning-400">
                    Entry Date
                  </th>
                  <th className="border px-4 py-2 bg-warning-400">
                    Expiry Date
                  </th>
                  <th className="border px-4 py-2 bg-warning-400">Harga</th>
                  <th className="border px-4 py-2 bg-warning-400">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map((medicine, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-warning-100" : "bg-warning-200"
                    }
                  >
                    <td className="border px-4 py-2">
                      {medicine.medicineName}
                    </td>
                    <td className="border px-4 py-2">{medicine.quantity}</td>
                    <td className="border px-4 py-2">{medicine.category}</td>
                    <td className="border px-4 py-2">{medicine.type}</td>
                    <td className="border px-4 py-2">{medicine.entryDate}</td>
                    <td className="border px-4 py-2">{medicine.expiryDate}</td>
                    <td className="border px-4 py-2">Rp{medicine.price}</td>
                    <td className="border px-4 py-2 flex items-center justify-center">

                      <button
                        onClick={() => handleIncreaseQuantity(index)}
                        className="p-2 rounded-xl mr-2 bg-primary-300"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => handleDecreaseQuantity(index)}
                        className="p-2 rounded-xl mr-2 bg-primary-300"
                      >
                        <FaMinus />
                      </button>
                      <button
                        onClick={() => handleDeleteMedicine(index)}
                        className="p-2 rounded-xl bg-primary-300"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isEditModalOpen && (
          <EditModal
            medicine={currentMedicine}
            handleEditChange={handleEditChange}
            handleSaveChanges={handleSaveChanges}
            closeEditModal={closeEditModal}
            categories={categories}
            types={types}
          />
        )}
      </div>
    </div>
  );
};

const EditModal = ({ medicine, handleEditChange, handleSaveChanges, closeEditModal, categories, types }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/2 max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4">Edit Obat</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Obat</label>
          <input 
            type="text" 
            name="medicineName" 
            value={medicine.medicineName} 
            onChange={handleEditChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Jumlah</label>
          <input 
            type="number" 
            name="quantity" 
            value={medicine.quantity} 
            onChange={handleEditChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kategori</label>
          <select 
            name="category" 
            value={medicine.category} 
            onChange={handleEditChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Jenis</label>
          <select 
            name="type" 
            value={medicine.type} 
            onChange={handleEditChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            {types.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Entry Date</label>
          <input 
            type="date" 
            name="entryDate" 
            value={medicine.entryDate} 
            onChange={handleEditChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input 
            type="date" 
            name="expiryDate" 
            value={medicine.expiryDate} 
            onChange={handleEditChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Harga</label>
          <input 
            type="number" 
            name="price" 
            value={medicine.price} 
            onChange={handleEditChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="flex justify-end">
          <button 
            onClick={closeEditModal} 
            className="px-4 py-2 bg-error-600 text-white rounded-md mr-2"
          >
            Batal
          </button>
          <button 
            onClick={handleSaveChanges} 
            className="px-4 py-2 bg-success-600 text-white rounded-md"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardApotek;
