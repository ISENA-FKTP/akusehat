import { useState } from "react";
import Sidebar from "../../../components/statistik/sidebar";
import Header from "../../../components/header";
import BarChartPoliUmum from "../diagram/BarChart/BarChartPoliUmum";
import BarChartPoliGigi from "../diagram/BarChart/BarChartPoliGigi";
import { calculateTotals } from "../model/dataKunjunganKlinik";
import PieChartTotalPengunjungKlinik from "../diagram/PieChart/PieChartTotalPengunjungKlinik";
import PieChatStatusPasien from "../diagram/PieChart/PieChartStatusPasienKlinik";

const currentYear = new Date().getFullYear();

export default function DataPengunjungKlinik() {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const { totalHealthy, totalSick } = calculateTotals();

  const totalVisits = totalHealthy + totalSick;

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
            {/* Bar Chart */}
            <div className="">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                <div className="flex">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>10 Penyakit Terbanyak Poli Umum</h1>
                  </div>
                </div>
                <div className="h-96 w-[20rem] mt-2">
                  <BarChartPoliUmum colors={colorsPenyakit} />
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                <div className="flex">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>10 Penyakit Terbanyak Poli Gigi</h1>
                  </div>
                </div>
                <div className="h-96 w-[20rem] mt-2">
                  <BarChartPoliGigi colors={colorsPenyakit} />
                </div>
              </div>
            </div>

            {/* Pie Chart Total Pasien */}
            <div className="pb-7">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center h-[19rem] text-center">
                  <div>
                    <h1 className="text-3xl text-primary-950 font-semibold">
                      {totalVisits}
                    </h1>
                    <p className="text-secondary-400 font-semibold">Total</p>
                  </div>
                </div>
                <div className="flex place-content-between">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Total Pengunjung</h1>
                  </div>
                </div>
                <div className="flex z-50">
                  <div className="h-56 w-44 mt-2">
                    <PieChartTotalPengunjungKlinik colors={colorsSektor} />
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart Polisi */}
            <div className="w-72">
              <div className="shadow-lg py-2 rounded-lg bg-white">
                <div className="flex pl-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Status Pasien Klinik</h1>
                  </div>
                </div>
                <div className="h-56 mb-2">
                  <PieChatStatusPasien colors={colorsPenyakit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
