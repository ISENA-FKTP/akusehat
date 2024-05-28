import { useState } from "react";
import PieChartPolisi from "../diagram/PieChart/PieChartPolisi";
import PieChartTotalPolisi from "../diagram/PieChart/PieChartTotalPolisi";
import PieChartTotalRawat from "../diagram/PieChart/PieChartTotalRawat";
import Sidebar from "../../../components/statistik/sidebar";
import BarChart from "../diagram/BarChart/BarChart";
import BarChartSektor from "../diagram/BarChart/BarChartSektor";
import BarChartRawat from "../diagram/BarChart/BarChartRawat";
import LineChart from "../diagram/LineChart/LineChart";
import { calculateTotals } from "../model/dataPolisi";
import { calculateTotals as calculateBpjsTotals } from "../model/dataPegawaiRawat";
import Header from "../../../components/header";

const currentYear = new Date().getFullYear();

export default function DataSakitPolisi() {
  const percentages = calculateBpjsTotals();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const { totalJumlahPolda, totalObatPolres } = calculateTotals();

  const totalJumlahSemua = totalJumlahPolda + totalObatPolres;

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const renderTreatmentText = () => {
    const { bpjs, nonBpjs } = percentages;

    if (bpjs > nonBpjs && bpjs) {
      return `${bpjs}% Sumber Biaya Berasal dari BPJS`;
    } else if (nonBpjs > bpjs && nonBpjs) {
      return `${nonBpjs}% Sumber Biaya Berasal dari Non-BPJS`;
    } else if (bpjs === nonBpjs && bpjs) {
      return `${bpjs}% Sumber Biaya Berasal dari BPJS dan Non-BPJS`;
    } else {
      return "Distribusi Sumber Biaya Tidak Diketahui";
    }
  };

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
                <div className="flex place-content-between px-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Jumlah Sakit Kesatuan Polisi</h1>
                  </div>
                </div>
                <div className="h-96 w-[26rem] mt-2">
                  <BarChart colors={colorsSektor} />
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="flex-col">
              <div className="pb-3">
                <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                  <div className="flex place-content-between px-5">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Kenaikan Jumlah Sakit Polisi</h1>
                    </div>
                  </div>
                  <div className="h-96 w-[26rem] mt-2">
                    <LineChart />
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart Total Pasien */}
            <div className="pb-7">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center h-[29rem] text-center">
                  <div>
                    <h1 className="text-4xl text-primary-950 font-semibold">
                      {totalJumlahSemua}
                    </h1>
                    <p className="text-secondary-400 font-semibold">Total</p>
                  </div>
                </div>
                <div className="flex place-content-between px-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Total Pasien Polisi</h1>
                  </div>
                </div>
                <div className="flex z-50">
                  <div className="h-96 w-72 mt-2">
                    <PieChartTotalPolisi colors={colorsSektor} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 place-content-center">
            {/* Pie Chart Polisi */}
            <div className="w-[26rem]">
              <div className="shadow-lg py-2 rounded-lg bg-white">
                <div className="flex pl-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Jenis Penyakit</h1>
                  </div>
                </div>
                <div className="h-96 mb-2">
                  <PieChartPolisi colors={colorsPenyakit} />
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                <div className="flex">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Satuan Kerja Tertinggi</h1>
                  </div>
                </div>
                <div className="h-96 w-[26rem] mt-2">
                  <BarChartSektor colors={colorsPenyakit} />
                </div>
              </div>
            </div>

            <div>
              {/* Pie Chart Total Rawat */}
              <div className="pb-3 w-96">
                <div className="shadow-lg py-2 px-5 rounded-lg bg-white relative">
                  <div className="absolute inset-0 flex items-center left-[5rem] h-[17.8rem] text-center">
                    <h1 className="text-xl text-primary-950 font-semibold">
                      {percentages.bpjs}%
                    </h1>
                  </div>
                  <div className="flex">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1 className="text-sm">Jumlah Jenis Perawatan</h1>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="h-40 w-64 mt-2">
                      <PieChartTotalRawat colors={colorsSektor} />
                    </div>
                    <div className="place-content-center text-base font-semibold">
                      <p>{renderTreatmentText()}</p>
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
                      <h1>Satuan Kerja Tertinggi</h1>
                    </div>
                  </div>
                  <div className="h-[9.5rem] w-80">
                    <BarChartRawat colors={colorsPenyakit} />
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
