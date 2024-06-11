/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";

const LaporanApotek = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("/data/medicine.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) =>
          a.medicineName.localeCompare(b.medicineName)
        );
        setMedicines(sortedData);
        setFilteredMedicines(sortedData);
        calculateTotalPrice(sortedData);
      })
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    filterMedicines();
  }, [selectedMonth, selectedYear]);

  const filterMedicines = () => {
    const filtered = medicines.filter((medicine) => {
      const entryDate = new Date(medicine.entryDate);
      const monthMatches = selectedMonth
        ? entryDate.getMonth() + 1 === parseInt(selectedMonth)
        : true;
      const yearMatches = selectedYear
        ? entryDate.getFullYear() === parseInt(selectedYear)
        : true;
      return monthMatches && yearMatches;
    });
    setFilteredMedicines(filtered);
    calculateTotalPrice(filtered);
  };

  const calculateTotalPrice = (medicinesToCalculate) => {
    const total = medicinesToCalculate.reduce(
      (sum, medicine) => sum + medicine.price * medicine.quantity,
      0
    );
    setTotalPrice(total);
  };

  const startYear = 2020; // Menentukan awal tahun untuk filtering
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (v, i) => startYear + i
  );

  return (
    <div className="flex">
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header
          title="Laporan Apotek"
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
              <label htmlFor="month">Bulan:</label>
              <select
                id="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year">Tahun:</label>
              <select
                id="year"
                value={selectedYear}
                onChange={handleYearChange}
                className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tl-lg">
                    Nama Obat
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Jumlah
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Kategori
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">Jenis</th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Entry Date
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Expiry Date
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tr-lg">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map((medicine, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-primary-50" : "bg-primary-100"
                    }
                  >
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {medicine.medicineName}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {medicine.quantity}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {medicine.category}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {medicine.type}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {medicine.entryDate}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {medicine.expiryDate}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      Rp{medicine.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">
              Total Harga Obat: Rp{totalPrice}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanApotek;
