import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";

const DashboardApotek = () => {
  const [medicines, setMedicines] = useState([]);
  const [sortedMedicines, setSortedMedicines] = useState([]);
  const [sortBy, setSortBy] = useState("most");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/data/medicine.json")
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
        const sorted =
          sortBy === "most"
            ? [...data].sort((a, b) => b.quantity - a.quantity)
            : [...data].sort((a, b) => a.quantity - b.quantity);
        setSortedMedicines(sorted);
      })
      .catch((error) => console.error("Error fetching medicines:", error));
  }, [sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].quantity += 1;
    setMedicines(updatedMedicines);
    sortMedicines(updatedMedicines);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedMedicines = [...medicines];
    if (updatedMedicines[index].quantity > 0) {
      updatedMedicines[index].quantity -= 1;
      setMedicines(updatedMedicines);
      sortMedicines(updatedMedicines);
    }
  };

  const handleDeleteMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
    sortMedicines(updatedMedicines);
  };

  const sortMedicines = (medicinesToSort) => {
    const sorted =
      sortBy === "most"
        ? [...medicinesToSort].sort((a, b) => b.quantity - a.quantity)
        : [...medicinesToSort].sort((a, b) => a.quantity - b.quantity);
    setSortedMedicines(sorted);
  };

  const filteredMedicines = sortedMedicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar */}
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
      </div>
    </div>
  );
};

export default DashboardApotek;
