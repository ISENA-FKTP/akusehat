/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import useAxios from "../../../useAxios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PrintPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(""); // State untuk memilih periode
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [, setTotalUsedMedicinehargaobat] = useState(0);
  const [, setTotalRemainingMedicinehargaobat] = useState(0);
  const axiosInstance = useAxios();
  const token = localStorage.getItem("accessToken");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatCurrency = (number) => {
    return number
      .toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace("Rp", "Rp ");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataobatsResponse, deletedDataobatsResponse] = await Promise.all(
          [
            axiosInstance.get("/dataobats", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axiosInstance.get("/deletedataobats", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]
        );

        const dataobats = dataobatsResponse.data;
        const deletedDataobats = deletedDataobatsResponse.data;

        // Gabungkan data obat dan data obat yang dihapus
        const mergedData = dataobats.map((obat) => {
          const deleted = deletedDataobats.find(
            (delObat) =>
              delObat.namaobat === obat.namaobat &&
              delObat.jenisobat === obat.jenisobat
          );
          return {
            ...obat,
            deletedJumlah: deleted ? deleted.jumlahobat : 0,
            deletedHarga: deleted ? deleted.hargaobat : 0,
            tanggalPengeluaran: deleted ? deleted.tanggalPengeluaran : null,
          };
        });

        const sortedData = mergedData.sort((a, b) =>
          a.namaobat.localeCompare(b.namaobat)
        );
        setMedicines(sortedData);
        setFilteredMedicines(sortedData); // Initialize filtered medicines
        calculatehargaobats(sortedData);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [axiosInstance, token]);

  useEffect(() => {
    filterMedicines();
  }, [selectedMonth, selectedYear, selectedPeriod]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const filterMedicines = () => {
    const filtered = medicines.filter((medicine) => {
      if (!medicine.tanggalPengeluaran) return false;
      const tanggalPengeluaran = new Date(medicine.tanggalPengeluaran);
      const month = tanggalPengeluaran.getMonth() + 1;
      const yearMatches = selectedYear
        ? tanggalPengeluaran.getFullYear() === parseInt(selectedYear)
        : true;

      let monthMatches = true;

      if (selectedPeriod === "firstHalf") {
        monthMatches = month >= 1 && month <= 6;
      } else if (selectedPeriod === "secondHalf") {
        monthMatches = month >= 7 && month <= 12;
      } else {
        monthMatches = selectedMonth ? month === parseInt(selectedMonth) : true;
      }

      return monthMatches && yearMatches;
    });
    setFilteredMedicines(filtered); // Update filtered medicines
    calculatehargaobats(filtered);
  };

  const calculatehargaobats = (medicinesToCalculate) => {
    const totalUsedhargaobat = medicinesToCalculate.reduce(
      (sum, medicine) => sum + medicine.deletedHarga * medicine.deletedJumlah,
      0
    );
    const totalRemaininghargaobat = medicinesToCalculate.reduce(
      (sum, medicine) => sum + medicine.hargaobat * medicine.jumlahobat,
      0
    );
    setTotalUsedMedicinehargaobat(totalUsedhargaobat);
    setTotalRemainingMedicinehargaobat(totalRemaininghargaobat);
  };

  const startYear = 2020;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (v, i) => startYear + i
  );

  const groupBykategori = (medicines) => {
    return medicines.reduce((grouped, medicine) => {
      const kategori = medicine.kategori;
      if (!grouped[kategori]) {
        grouped[kategori] = [];
      }
      grouped[kategori].push(medicine);
      return grouped;
    }, {});
  };

  const calculatekategoriTotals = (kategoriMedicines) => {
    const totalUsed = kategoriMedicines.reduce((sum, medicine) => {
      return sum + medicine.deletedHarga * medicine.deletedJumlah;
    }, 0);
    const totalRemaining = kategoriMedicines.reduce(
      (sum, medicine) => sum + medicine.hargaobat * medicine.jumlahobat,
      0
    );
    const totalObatKeluar = kategoriMedicines.reduce(
      (sum, medicine) => sum + medicine.deletedJumlah,
      0
    );
    const totalSisaObat = kategoriMedicines.reduce(
      (sum, medicine) => sum + medicine.jumlahobat,
      0
    );
    return { totalUsed, totalRemaining, totalObatKeluar, totalSisaObat };
  };

  const groupedMedicines = groupBykategori(filteredMedicines);

  const calculateOverallTotals = () => {
    const totalUsedOverall = filteredMedicines.reduce(
      (sum, medicine) => sum + medicine.deletedHarga * medicine.deletedJumlah,
      0
    );
    const totalRemainingOverall = filteredMedicines.reduce(
      (sum, medicine) => sum + medicine.hargaobat * medicine.jumlahobat,
      0
    );
    const totalObatKeluarOverall = filteredMedicines.reduce(
      (sum, medicine) => sum + medicine.deletedJumlah,
      0
    );
    const totalRemainingObatOverall = filteredMedicines.reduce(
      (sum, medicine) => sum + medicine.jumlahobat,
      0
    );
    return {
      totalUsedOverall,
      totalRemainingOverall,
      totalObatKeluarOverall,
      totalRemainingObatOverall,
    };
  };

  const {
    totalUsedOverall,
    totalRemainingOverall,
    totalObatKeluarOverall,
    totalRemainingObatOverall,
  } = calculateOverallTotals();

  const handlePrint = () => {
    const input = document.getElementById("report");
    const pdf = new jsPDF("l", "mm", "a4"); // Menggunakan orientasi potrait ('p') untuk format A4
    const margin = 10; // margin dalam mm
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      // Menyesuaikan skala untuk meningkatkan kualitas gambar
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("laporan_apotek.pdf");
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
        <div className="container mx-auto pl-5 text-black">
          <div className="flex flex-col md:flex-row justify-start mb-4 mt-4 space-y-4 md:space-y-0 md:space-x-4">
            <div>
              <label htmlFor="month">Bulan:</label>
              <select
                id="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Bulan</option>
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
              <label htmlFor="period">Periode:</label>
              <select
                id="period"
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Periode</option>
                <option value="firstHalf">6 Bulan Awal</option>
                <option value="secondHalf">6 Bulan Akhir</option>
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
                <option value="">Pilih Tahun</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="mt-2 px-4 py-2 bg-success-500 text-white rounded hover:bg-success-400 focus:outline-none"
          >
            Print Laporan
          </button>
          <div id="report">
            <div className="flex items-center justify-center ml-8 mt-8">
              <img
                src="/logo.png"
                className="w-24 h-24 mr-32 mb-5"
                alt="Logo"
              />
              <div className="mr-24 text-center ">
                <div className="mr-24">
                  <h1 className="text-xl font-bold font-primary-Poppins">
                    LAPORAN PENGGUNAAN OBAT{" "}
                  </h1>
                </div>
                <div className=" mr-24">
                  <h1 className="text-3xl font-extrabold font-primary-Poppins">
                    ISENA FKTP
                  </h1>
                </div>
                <div className="mr-24">
                  <h1 className="text-lg font-medium font-primary-Poppins">
                    Klinik Bidokkes Polisi Daerah Nusa Tenggara Barat
                  </h1>
                </div>
                <div className="mr-24">
                  <h1 className="text-sm font-medium font-primary-Poppins">
                    Jl. Langko No. 77; Taman Sari, Ampenan, Kota Mataram, Nusa
                    Tenggara Barat, Indonesia
                  </h1>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-gray-800 mt-2  mx-auto flex justify-center mb-4" />

            <div>
              {Object.keys(groupedMedicines).map((kategori) => {
                const kategoriTotals = calculatekategoriTotals(
                  groupedMedicines[kategori]
                );
                const {
                  totalUsed,
                  totalRemaining,
                  totalObatKeluar,
                  totalSisaObat,
                } = kategoriTotals;
                return (
                  <div key={kategori} className="mb-8">
                    <h2 className="text-xl font-bold mb-2">{kategori}</h2>
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2 text-black border-black">
                              Nama Obat
                            </th>
                            <th className="border px-4 py-2 text-black border-black">
                              Harga Obat
                            </th>
                            <th className="border px-4 py-2 text-black border-black">
                              Kategori
                            </th>
                            <th className="border px-4 py-2 text-black border-black">
                              Jenis
                            </th>
                            <th className="border px-4 py-2 text-black border-black">
                              Tanggal Masuk
                            </th>
                            <th className="border px-4 py-2 text-black border-black">
                              Tanggal Kadaluarsa
                            </th>
                            <th className="border px-4 py-2 text-black border-black">
                              Obat Keluar
                            </th>
                            <th className="border px-4 py-2 text-black border-black">
                              Total Harga Obat Keluar
                            </th>
                            <th className="border px-4 py-2 text-black border-black">
                              Sisa Obat
                            </th>
                            <th className="border px-4 py-2 text-black border-black">
                              Total Harga Sisa Obat
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedMedicines[kategori].map((medicine, index) => {
                            return (
                              <tr key={index}>
                                <td className="border px-4 py-2 border-black">
                                  {medicine.namaobat}
                                </td>
                                <td className="border px-4 py-2 border-black">
                                  {formatCurrency(medicine.hargaobat)}){" "}
                                </td>
                                <td className="border px-4 py-2 border-black">
                                  {medicine.kategori}
                                </td>
                                <td className="border px-4 py-2 border-black">
                                  {medicine.jenisobat}
                                </td>
                                <td className="border px-4 py-2 border-black">
                                  {formatDate(medicine.tglmasuk)}
                                </td>
                                <td className="border px-4 py-2 border-black">
                                  {formatDate(medicine.tglkadaluarsa)}
                                </td>
                                <td className="border px-4 py-2 border-black">
                                  {medicine.deletedJumlah}
                                </td>
                                <td className="border px-4 py-2 border-black">
                                  {formatCurrency(
                                    medicine.deletedHarga *
                                      medicine.deletedJumlah
                                  )}
                                </td>
                                <td className="border px-4 py-2 border-black">
                                  {medicine.jumlahobat}
                                </td>
                                <td className="border px-4 py-2 border-black">
                                  {formatCurrency(
                                    medicine.hargaobat * medicine.jumlahobat
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                          <tr className="bg-white text-black font-semibold">
                            <td
                              className="border px-4 py-2 text-left border-black"
                              colSpan="6"
                            >
                              Total Harga Keseluruhan {kategori}
                            </td>
                            <td className="border px-4 py-2 border-black">
                              {totalObatKeluar}
                            </td>
                            <td className="border px-4 py-2 border-black">
                              {formatCurrency(totalUsed)}
                            </td>
                            <td className="border px-4 py-2 border-black">
                              {totalSisaObat}
                            </td>
                            <td className="border px-4 py-2 border-black">
                              {formatCurrency(totalRemaining)}
                            </td>
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
                      <th className="border px-4 py-2 text-black border-black">
                        Total Obat Keluar
                      </th>
                      <th className="border px-4 py-2 text-black border-black">
                        Total Harga Obat Keluar
                      </th>
                      <th className="border px-4 py-2 text-black border-black">
                        Total Sisa Obat
                      </th>
                      <th className="border px-4 py-2 text-black border-black">
                        Total Harga Sisa Obat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border px-4 py-2 text-black border-black">
                      <td className="border px-4 py-2 border-black">
                        {totalObatKeluarOverall}
                      </td>
                      <td className="border px-4 py-2 border-black">
                        {formatCurrency(totalUsedOverall)}
                      </td>
                      <td className="border px-4 py-2 border-black">
                        {totalRemainingObatOverall}
                      </td>
                      <td className="border px-4 py-2 border-black">
                        {formatCurrency(totalRemainingOverall)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
