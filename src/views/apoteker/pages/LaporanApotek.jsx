import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";

const LaporanApotek = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [totalUsedMedicinePrice, setTotalUsedMedicinePrice] = useState(0);
  const [totalRemainingMedicinePrice, setTotalRemainingMedicinePrice] = useState(0);
  const reportRef = useRef(null);

  useEffect(() => {
    fetch('/data/medicine.json')
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => a.medicineName.localeCompare(b.medicineName));
        setMedicines(sortedData);
        setFilteredMedicines(sortedData);
        calculatePrices(sortedData);
      })
      .catch(error => console.error('Error fetching medicines:', error));
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
    const filtered = medicines.filter(medicine => {
      const entryDate = new Date(medicine.entryDate);
      const monthMatches = selectedMonth ? entryDate.getMonth() + 1 === parseInt(selectedMonth) : true;
      const yearMatches = selectedYear ? entryDate.getFullYear() === parseInt(selectedYear) : true;
      return monthMatches && yearMatches;
    });
    setFilteredMedicines(filtered);
    calculatePrices(filtered);
  };

  const calculatePrices = (medicinesToCalculate) => {
    const totalUsedPrice = medicinesToCalculate.reduce((sum, medicine) => sum + medicine.price * medicine.usedMedicine, 0);
    const totalRemainingPrice = medicinesToCalculate.reduce((sum, medicine) => sum + medicine.price * medicine.quantity, 0);
    setTotalUsedMedicinePrice(totalUsedPrice);
    setTotalRemainingMedicinePrice(totalRemainingPrice);
  };

  const startYear = 2020;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - startYear + 1 }, (v, i) => startYear + i);

  const groupByCategory = (medicines) => {
    return medicines.reduce((grouped, medicine) => {
      const category = medicine.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(medicine);
      return grouped;
    }, {});
  };

  const calculateCategoryTotals = (categoryMedicines) => {
    const totalUsed = categoryMedicines.reduce((sum, medicine) => sum + medicine.price * medicine.usedMedicine, 0);
    const totalRemaining = categoryMedicines.reduce((sum, medicine) => sum + medicine.price * medicine.quantity, 0);
    return { totalUsed, totalRemaining };
  };

  const groupedMedicines = groupByCategory(filteredMedicines);

  const calculateOverallTotals = () => {
    const totalUsedOverall = filteredMedicines.reduce((sum, medicine) => sum + medicine.price * medicine.usedMedicine, 0);
    const totalRemainingOverall = filteredMedicines.reduce((sum, medicine) => sum + medicine.price * medicine.quantity, 0);
    return { totalUsedOverall, totalRemainingOverall };
  };

  const { totalUsedOverall, totalRemainingOverall } = calculateOverallTotals();

  const downloadPDF = () => {
    const input = reportRef.current;
    const options = {
      scale: 2,
      backgroundColor: '#fff',
      useCORS: true,
      logging: true,
      scrollX: 0,
      scrollY: 0,
    };
    
    html2canvas(input, options)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('laporan_apotek.pdf');
      });
  };

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
        <div className="container mx-auto" ref={reportRef}>
          <h1 className="text-2xl font-bold mt-4 mb-2">
            Laporan Penggunaan Obat Apotek
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-secondary-400">
            Seluruh data terkait keluar masuknya obat di apotek
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
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
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
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {Object.keys(groupedMedicines).map((category, index) => {
            const { totalUsed, totalRemaining } = calculateCategoryTotals(groupedMedicines[category]);
            return (
              <div key={index} className="mb-6">
                <h1 className="text-xl font-bold mt-4 mb-2">{category}</h1>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Nama Obat</th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Harga</th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Kategori</th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Jenis</th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Tanggal Masuk</th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Tanggal Kadaluarsa</th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Obat Keluar</th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Total Harga Obat Keluar</th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Sisa Obat</th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">Total Harga Sisa Obat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedMedicines[category].map((medicine, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-primary-50" : "bg-primary-100"
                          }
                        >
                          <td className="border px-4 py-2">
                            {medicine.medicineName}
                          </td>
                          <td className="border px-4 py-2">Rp{medicine.price}</td>
                          <td className="border px-4 py-2">{medicine.category}</td>
                          <td className="border px-4 py-2">{medicine.type}</td>
                          <td className="border px-4 py-2">{medicine.entryDate}</td>
                          <td className="border px-4 py-2">{medicine.expiryDate}</td>
                          <td className="border px-4 py-2">{medicine.usedMedicine}</td>
                          <td className="border px-4 py-2">Rp{medicine.price * medicine.usedMedicine}</td>
                          <td className="border px-4 py-2">{medicine.quantity}</td>
                          <td className="border px-4 py-2">Rp{medicine.price * medicine.quantity}</td>
                        </tr>
                      ))}
                      <tr className="bg- bg-primary-500 text-white font-semibold">
                        <td className="border px-4 py-2 text-left" colSpan="7">Total Harga Keseluruhan {category}</td>
                        <td className="border px-4 py-2">Rp{totalUsed}</td>
                        <td className="border px-4 py-2"></td>
                        <td className="border px-4 py-2">Rp{totalRemaining}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
          <div className="mt-8">
            <h2 className="text-xl font-bold">Total Keseluruhan</h2>
            <table className="table-auto w-full mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-primary-600 text-white">Total Harga Obat Keluar</th>
                  <th className="border px-4 py-2 bg-primary-600 text-white">Total Harga Sisa Obat</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg- bg-primary-500 text-white font-semibold">
                  <td className="border px-4 py-2">Rp{totalUsedOverall}</td>
                  <td className="border px-4 py-2">Rp{totalRemainingOverall}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={downloadPDF}
              className="bg-secondary-500 text-white px-4 py-2 mb-4 rounded-md"
            >
              Download PDF
            </button>
          </div>
      </div>
    </div>
  );
};

export default LaporanApotek;
