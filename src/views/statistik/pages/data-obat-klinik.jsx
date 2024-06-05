import { useEffect, useState } from "react";
import Sidebar from "../../../components/statistik/sidebar";
import Header from "../../../components/header";
import BarChartObatTerpakai from "../diagram/BarChart/BarChartObatTerpakai";
import PieChartTotalObat from "../diagram/PieChart/PieChartTotalObat";
import { DataObat, calculateTotalObat } from "../model/dataObat";
import LineChart from "../diagram/LineChart/LineChartObat";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import BarChart from "../diagram/BarChart/BarChartDataObat";
import { IoSearch } from "react-icons/io5";
import { apotek } from "../model/data/apotek";

const currentYear = new Date().getFullYear();

export default function DataObatKlinik() {
  const [year, setYear] = useState(currentYear);
  const [showNextSixMonthsForLine, setShowNextSixMonthsForLine] =
    useState(false);
  const [showNextSixMonthsForBar, setShowNextSixMonthsForBar] = useState(false);
  const [sortBy, setSortBy] = useState("most");
  const [sortedMedicines, setSortedMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleMonthsForLine = () => {
    setShowNextSixMonthsForLine(!showNextSixMonthsForLine);
  };

  const handleToggleMonthsForBar = () => {
    setShowNextSixMonthsForBar(!showNextSixMonthsForBar);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const startMonthIndexLine = showNextSixMonthsForLine ? 6 : 0;
  const endMonthIndexLine = showNextSixMonthsForLine ? 12 : 6;

  const startMonthIndexBar = showNextSixMonthsForBar ? 6 : 0;
  const endMonthIndexBar = showNextSixMonthsForBar ? 12 : 6;

  const filteredData = DataObat.filter(
    (data) => new Date(data.tanggal).getFullYear() === parseInt(year)
  );

  const totalObat = calculateTotalObat(filteredData);

  const colorsPenyakit = [
    "#5726FF",
    "#FACC15",
    "#FCE073",
    "#DDD4FF",
    "#0099FF",
  ];

  const colorsSektor = ["#5726FF", "#FD9A28"];

  useEffect(() => {
    const sorted =
      sortBy === "most"
        ? [...apotek].sort((a, b) => b.quantity - a.quantity)
        : [...apotek].sort((a, b) => a.quantity - b.quantity);
    setSortedMedicines(sorted);
  }, [sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMedicines = sortedMedicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-[#E0F1EE] font-primary">
        {/* Sidebar */}
        <div className="fixed z-50">
          <Sidebar
            userName="Rifki Rusdi Satma Putra"
            userStatus="Kepala Polisi"
            profilePicture="/logo.png"
          />
        </div>

        <Header
          title="Statistik Obat Apotek"
          userName="Rifki Rusdi Satma Putra"
          userStatus="Kepala Polisi"
          profilePicture="logo.png"
        />

        <div className="container mx-auto pl-5 pt-20 lg:pt-0">
          {/* Filter */}
          <div className="flex place-content-end pt-7 pr-5">
            <div>
              <label htmlFor="year" className="mr-2">
                Tahun:
              </label>
              <select
                id="year"
                value={year}
                onChange={handleYearChange}
                className="px-2 rounded-md"
              >
                {[...Array(10)].map((_, i) => {
                  const y = currentYear - i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Statistik */}
          <div className="lg:flex gap-3 place-content-center pt-7 mr-5 lg:mr-0">
            {/* Pie Chart Total Pasien */}
            <div className="h-[30rem] shadow-lg py-2 px-5 rounded-lg bg-white relative">
              <div className="absolute inset-0 flex items-center justify-center h-[29rem] text-center">
                <div>
                  <h1 className="text-4xl text-primary-950 font-semibold">
                    {totalObat}
                  </h1>
                  <p className="text-secondary-400 font-semibold">Total</p>
                </div>
              </div>
              <div className="flex place-content-between">
                <div className="font-semibold">
                  <h1 className="text-secondary-400">Jenis Data</h1>
                  <h1>Total Stok Obat</h1>
                </div>
              </div>
              <div className="flex z-50">
                <div className="h-96 lg:w-[13rem] w-full px-5 lg:px-0 mt-2">
                  <PieChartTotalObat
                    colors={colorsSektor}
                    year={year.toString()}
                  />
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-[30rem] shadow-lg py-2 my-5 lg:my-0 px-5 rounded-lg bg-white">
              <div className="flex">
                <div className="font-semibold">
                  <h1 className="text-secondary-400">Jenis Data</h1>
                  <h1>Obat Terbanyak Terpakai</h1>
                </div>
              </div>
              <div className="h-96 lg:w-[18rem] mt-2">
                <BarChartObatTerpakai
                  colors={colorsPenyakit}
                  year={year.toString()}
                />
              </div>
            </div>

            {/* Line Chart */}
            <div className="flex-col">
              <div className="lg:pb-3 pb-0 lg:w-[21rem]">
                <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                  <div className="flex place-content-between">
                    <div className="flex place-content-between px-5">
                      <div className="font-semibold">
                        <h1 className="text-secondary-400">Jenis Data</h1>
                        <h1>Total Sisa Persediaan Obat </h1>
                      </div>
                    </div>
                    {/* Button untuk menampilkan 6 bulan sisanya */}
                    <button
                      className=" p-2 mt-8 bg-secondary-400 text-sm text-white rounded-md flex gap-4 place-items-center hover:bg-secondary-700"
                      onClick={handleToggleMonthsForLine}
                    >
                      {showNextSixMonthsForLine ? (
                        <MdOutlineKeyboardDoubleArrowRight />
                      ) : (
                        <MdOutlineKeyboardDoubleArrowLeft />
                      )}
                    </button>
                  </div>
                  <div className="h-[24.6rem] mt-2">
                    <LineChart
                      showNextSixMonths={showNextSixMonthsForLine}
                      startMonthIndex={startMonthIndexLine}
                      endMonthIndex={endMonthIndexLine}
                      year={year.toString()}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="lg:w-[21rem] my-5 lg:my-0">
              <div className="shadow-lg py-2 px-5 lg rounded-lg bg-white">
                <div className="flex place-content-between">
                  <div className="flex place-content-between px-5">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Kenaikan Jumlah Sakit Polisi</h1>
                    </div>
                  </div>
                  {/* Button untuk menampilkan 6 bulan sisanya */}
                  <button
                    className=" p-2 mt-8 bg-secondary-400 text-sm text-white rounded-md flex gap-4 place-items-center hover:bg-secondary-700"
                    onClick={handleToggleMonthsForBar}
                  >
                    {showNextSixMonthsForBar ? (
                      <MdOutlineKeyboardDoubleArrowRight />
                    ) : (
                      <MdOutlineKeyboardDoubleArrowLeft />
                    )}
                  </button>
                </div>
                <div className="h-96 mt-2">
                  <BarChart
                    colors={colorsSektor}
                    showNextSixMonths={showNextSixMonthsForBar}
                    startMonthIndex={startMonthIndexBar}
                    endMonthIndex={endMonthIndexBar}
                    year={year.toString()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Obat */}
        <div className="container mx-auto pb-10 lg:pl-3 pl-5">
          <h1 className="text-2xl font-bold mt-4 mb-2 ">
            Data Seluruh Obat Apotek
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-secondary-500">
            Seluruh data terkait obat di apotek
          </h2>
          <div className="flex justify-between mb-4">
            <div>
              <label htmlFor="sort">Urutkan berdasarkan:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="lg:ml-2 mt-2 lg:mt-0 border border-primary-600 rounded-md shadow-sm "
              >
                <option value="most">Paling Banyak</option>
                <option value="least">Paling Sedikit</option>
              </select>
            </div>
            <div className="flex items-center mt-9 lg:mt-0">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <IoSearch className="text-xl text-gray-500" />
                </span>
                <input
                  type="text"
                  placeholder="Cari obat..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="lg:px-2 lg:w-auto w-40 py-1 pl-8 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-primary-600 placeholder:ml-5"
                  style={{ paddingLeft: "2rem" }}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto pr-5 lg:pr-0">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tl-lg">
                    No
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
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
                    Harga (Rp)
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
                      {index + 1}
                    </td>
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
                      {medicine.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
