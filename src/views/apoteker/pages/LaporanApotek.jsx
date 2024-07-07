/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import useAxios from "../../../useAxios";

const LaporanApotek = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
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
          };
        });

        const sortedData = mergedData.sort((a, b) =>
          a.namaobat.localeCompare(b.namaobat)
        );
        setMedicines(sortedData);
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
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filterMedicines = () => {
    const filtered = medicines.filter((medicine) => {
      const tglmasuk = new Date(medicine.tglmasuk);
      const monthMatches = selectedMonth
        ? tglmasuk.getMonth() + 1 === parseInt(selectedMonth)
        : true;
      const yearMatches = selectedYear
        ? tglmasuk.getFullYear() === parseInt(selectedYear)
        : true;
      return monthMatches && yearMatches;
    });
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
    return { totalUsed, totalRemaining, totalObatKeluar };
  };

  const groupedMedicines = groupBykategori(medicines);

  const calculateOverallTotals = () => {
    const totalUsedOverall = medicines.reduce(
      (sum, medicine) => sum + medicine.deletedHarga * medicine.deletedJumlah,
      0
    );
    const totalRemainingOverall = medicines.reduce(
      (sum, medicine) => sum + medicine.hargaobat * medicine.jumlahobat,
      0
    );
    const totalObatKeluarOverall = medicines.reduce(
      (sum, medicine) => sum + medicine.deletedJumlah,
      0
    );
    return { totalUsedOverall, totalRemainingOverall, totalObatKeluarOverall };
  };

  const { totalUsedOverall, totalRemainingOverall, totalObatKeluarOverall } =
    calculateOverallTotals();

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
        <div className="container mx-auto pl-5">
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
          {Object.keys(groupedMedicines).map((kategori, index) => {
            const { totalUsed, totalRemaining, totalObatKeluar } =
              calculatekategoriTotals(groupedMedicines[kategori]);
            return (
              <div key={index} className="mb-6">
                <h1 className="text-xl font-bold mt-4 mb-2">{kategori}</h1>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Nama Obat
                        </th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Harga
                        </th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Kategori
                        </th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Jenis
                        </th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Tanggal Masuk
                        </th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Tanggal Kadaluarsa
                        </th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Obat Keluar
                        </th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Total Harga Obat Keluar
                        </th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Sisa Obat
                        </th>
                        <th className="border px-4 py-2 bg-primary-600 text-white">
                          Total Harga Sisa Obat
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedMedicines[kategori].map((medicine, index) => {
                        return (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-primary-50"
                                : "bg-primary-100"
                            }
                          >
                            <td className="border px-4 py-2">
                              {medicine.namaobat}
                            </td>
                            <td className="border px-4 py-2">
                              Rp{medicine.hargaobat}
                            </td>
                            <td className="border px-4 py-2">
                              {medicine.kategori}
                            </td>
                            <td className="border px-4 py-2">
                              {medicine.jenisobat}
                            </td>
                            <td className="border px-4 py-2">
                              {formatDate(medicine.tglmasuk)}
                            </td>
                            <td className="border px-4 py-2">
                              {formatDate(medicine.tglkadaluarsa)}
                            </td>
                            <td className="border px-4 py-2">
                              {medicine.deletedJumlah}
                            </td>
                            <td className="border px-4 py-2">
                              Rp{medicine.deletedHarga * medicine.deletedJumlah}
                            </td>
                            <td className="border px-4 py-2">
                              {medicine.jumlahobat}
                            </td>
                            <td className="border px-4 py-2">
                              Rp{medicine.hargaobat * medicine.jumlahobat}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-primary-500 text-white font-semibold">
                        <td className="border px-4 py-2 text-left" colSpan="6">
                          Total Harga Keseluruhan {kategori}
                        </td>
                        <td className="border px-4 py-2">{totalObatKeluar}</td>
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
                  <th className="border px-4 py-2 bg-primary-600 text-white">
                    Total Obat Keluar
                  </th>
                  <th className="border px-4 py-2 bg-primary-600 text-white">
                    Total Harga Obat Keluar
                  </th>
                  <th className="border px-4 py-2 bg-primary-600 text-white">
                    Total Harga Sisa Obat
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-primary-500 text-white font-semibold">
                  <td className="border px-4 py-2">{totalObatKeluarOverall}</td>
                  <td className="border px-4 py-2">Rp{totalUsedOverall}</td>
                  <td className="border px-4 py-2">
                    Rp{totalRemainingOverall}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanApotek;
