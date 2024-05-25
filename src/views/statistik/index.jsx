import { useState } from "react";
import PieChartPolisi from "./diagram/PieChart/PieChartPolisi";
import PieChartApotik from "./diagram/PieChart/PieChartApotik";
import Sidebar from "../../components/statistik/sidebar";
import BarChart from "./diagram/BarChart/BarChart";
import LineChart from "./diagram/LineChart";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { calculateTotals } from "./model/dataObat";
import { BsPeopleFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { FaVirus } from "react-icons/fa6";
import Header from "../../components/header";

const currentYear = new Date().getFullYear();

export default function Statistik() {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { totalJumlahObat, totalObatKeluar } = calculateTotals();

  const total = totalJumlahObat + totalObatKeluar;
  const persen_obat_masuk = ((totalJumlahObat / total) * 100).toFixed(2);
  const persen_obat_keluar = ((totalObatKeluar / total) * 100).toFixed(2);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <>
      <div className="bg-[#E0F1EE] font-primary ">
        {/* Sidebar */}
        <div className="fixed z-50">
          <Sidebar />
        </div>
        <Header
          userName="Rifki Rusdi Satma Putra"
          userStatus="Kepala Polisi"
          profilePicture="logo.png"
        />
        <div className="container mx-auto pl-5">
          {/* Filter */}
          <div className="flex pt-7 gap-3 place-content-end">
            <div>
              <label htmlFor="year" className="mr-2">
                Tahun:
              </label>
              <select
                id="year"
                value={year}
                onChange={handleYearChange}
                className="p-2 rounded-md"
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
            <div>
              <label htmlFor="month" className="mr-2">
                Bulan:
              </label>
              <select
                id="month"
                value={month}
                onChange={handleMonthChange}
                className="p-2 rounded-md"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Informasi */}
          <div className="flex pt-7 gap-3 place-content-center">
            {/* Polisi Sakit */}
            <div className="flex bg-white px-5 py-3 rounded-lg shadow-lg">
              <div className="text-white bg-primary-600 rounded-md">
                <BsPeopleFill size={75} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">28</h1>
                <h3 className="font-semibold text-lg">Polisi Sakit</h3>
              </div>
            </div>

            {/* Pengunjung Klinik */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg">
              <div className="text-white bg-primary-600 rounded-md place-content-center">
                <FaPeopleGroup size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">108</h1>
                <h3 className="font-semibold text-lg">Pengunjung Klinik</h3>
              </div>
            </div>

            {/* Obat Masuk */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg">
              <div className="text-white bg-primary-600 rounded-md">
                <GiMedicines size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">{totalJumlahObat}</h1>
                <h3 className="font-semibold text-lg">Obat Masuk</h3>
              </div>
            </div>

            {/* Obat Keluar */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg">
              <div className="text-white bg-primary-600 rounded-md">
                <GiMedicines size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">{totalObatKeluar}</h1>
                <h3 className="font-semibold text-lg">Obat Keluar</h3>
              </div>
            </div>

            {/* Jenis Penyakit */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg">
              <div className="text-white bg-primary-600 rounded-md">
                <FaVirus size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">12</h1>
                <h3 className="font-semibold text-lg">Jenis Penyakit</h3>
              </div>
            </div>
          </div>

          {/* Statistik */}
          <div className="flex gap-3 place-content-center">
            {/* Pie Chart Polisi */}
            <div className="py-7">
              <div className="shadow-lg py-2 rounded-lg bg-white">
                <div className="flex place-content-between pl-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Jenis Penyakit</h1>
                  </div>
                  <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 mr-5 rounded-full font-medium">
                    {year}
                  </p>
                </div>
                <div className="h-96 w-96 mb-2 ">
                  <PieChartPolisi />
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="py-7">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                <div className="flex place-content-between px-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Jumlah Sakit Kesatuan Polisi</h1>
                  </div>
                  <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                    {year}
                  </p>
                </div>
                <div className="h-96 w-96 mt-2 ">
                  <BarChart />
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="flex-col">
              <div className="pt-7 pb-3">
                <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                  <div className="flex place-content-between px-5">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Jumlah Sakit Kesatuan Polisi</h1>
                    </div>
                    <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                      {year}
                    </p>
                  </div>
                  <div className="h-[149px] w-96 mt-2 ">
                    <LineChart />
                  </div>
                </div>
              </div>

              {/* Pie Chaart Apotik */}
              <div className="pb-7">
                <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                  <div className="flex place-content-between px-5">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Jumlah Obat Keluar/Masuk</h1>
                    </div>
                    <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                      {year}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="h-[151px] w-44 mt-2 ">
                      <PieChartApotik />
                    </div>
                    <div className="place-content-center text-base font-semibold ">
                      <div className="flex gap-4 place-content-center mb-3">
                        <div className="text-success-700 place-content-center">
                          <FaCircleArrowUp />
                        </div>
                        <p>
                          {persen_obat_masuk}% Obat Masuk ({totalJumlahObat})
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-error-600 place-content-center">
                          <FaCircleArrowDown />
                        </div>
                        <p>
                          {persen_obat_keluar}% Obat Keluar ({totalObatKeluar})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
