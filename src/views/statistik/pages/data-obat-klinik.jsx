import { useState } from "react";
import Sidebar from "../../../components/statistik/sidebar";
import Header from "../../../components/header";
import BarChartObatTerpakai from "../diagram/BarChart/BarChartObatTerpakai";
import PieChartTotalObat from "../diagram/PieChart/PieChartTotalObat";
import { calculateTotalObat } from "../model/dataObat";

const currentYear = new Date().getFullYear();

export default function DataObatKlinik() {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const totalObat = calculateTotalObat();

  const colorsPenyakit = [
    "#5726FF",
    "#FACC15",
    "#FCE073",
    "#DDD4FF",
    "#0099FF",
  ];

  const colorsSektor = ["#5726FF", "#FD9A28"];

  return (
    <>
      <div className="bg-[#E0F1EE] font-primary">
        {/* Sidebar */}
        <div className="fixed z-50">
          <Sidebar />
        </div>

        <Header
          title="Statistik Data Sakit Polisi"
          userName="Rifki Rusdi Satma Putra"
          userStatus="Kepala Polisi"
          profilePicture="logo.png"
        />

        <div className="container mx-auto pl-5 py-7">
          {/* Filter */}
          <div className="flex gap-3 place-content-end">
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

          {/* Statistik */}
          <div className="flex gap-3 place-content-center pt-7">
            {/* Pie Chart Total Pasien */}
            <div className="pb-3">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white relative">
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
                  <div className="h-96 w-[20rem] mt-2">
                    <PieChartTotalObat colors={colorsSektor} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                <div className="flex">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Obat Terbanyak Terpakai</h1>
                  </div>
                </div>
                <div className="h-96 w-[20rem] mt-2">
                  <BarChartObatTerpakai colors={colorsPenyakit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
