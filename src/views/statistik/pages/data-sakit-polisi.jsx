import { useState } from "react";
import PieChartPolisi from "../diagram/PieChart/PieChartPolisi";
import PieChartTotalPolisi from "../diagram/PieChart/PieChartTotalPolisi";
import PieChartTotalRawat from "../diagram/PieChart/PieChartTotalRawat";
import Sidebar from "../../../components/statistik/sidebar";
import BarChart from "../diagram/BarChart/BarChart";
import BarChartSektor from "../diagram/BarChart/BarChartSektor";
import LineChart from "../diagram/LineChart";
import { calculateTotals } from "../model/dataPolisi";
import { calculateTotals as calculateRawatTotals } from "../model/dataPegawaiRawat";

const currentYear = new Date().getFullYear();

export default function DataSakitPolisi() {
  const percentages = calculateRawatTotals();

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
    const { rawatJalan, rawatInap, lainnya } = percentages;

    if (rawatJalan > rawatInap && rawatJalan > lainnya) {
      return `${rawatJalan}% Pasien Polisi Melakukan Rawat Jalan`;
    } else if (rawatInap > rawatJalan && rawatInap > lainnya) {
      return `${rawatInap}% Pasien Polisi Melakukan Rawat Inap`;
    } else if (lainnya > rawatJalan && lainnya > rawatInap) {
      return `${lainnya}% Pasien Polisi Melakukan Perawatan Lainnya`;
    } else if (rawatJalan === rawatInap && rawatJalan > lainnya) {
      return `${rawatJalan}% Pasien Polisi Melakukan Rawat Jalan dan Rawat Inap`;
    } else if (rawatJalan === lainnya && rawatJalan > rawatInap) {
      return `${rawatJalan}% Pasien Polisi Melakukan Rawat Jalan dan Perawatan Lainnya`;
    } else if (rawatInap === lainnya && rawatInap > rawatJalan) {
      return `${rawatInap}% Pasien Polisi Melakukan Rawat Inap dan Perawatan Lainnya`;
    } else {
      return "Distribusi Perawatan Pasien Polisi Tidak Diketahui";
    }
  };

  return (
    <>
      <div className="bg-[#E0F1EE] font-primary">
        {/* Sidebar */}
        <div className="fixed z-50">
          <Sidebar />
        </div>

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
                  <BarChart />
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
                      <h1>Jumlah Sakit Kesatuan Polisi</h1>
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
                    <PieChartTotalPolisi />
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
                  <PieChartPolisi />
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
                  <BarChartSektor />
                </div>
              </div>
            </div>

            {/* Pie Chart Apotik */}
            <div className="pb-7 w-96">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white relative">
                <div className="absolute inset-0 flex items-center left-[4.5rem] h-[18.5rem] text-center">
                  <h1 className="text-xl text-primary-950 font-semibold">
                    {percentages.rawatJalan}%
                  </h1>
                </div>
                <div className="flex">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1 className="text-sm">Jumlah Jenis Perawatan</h1>
                  </div>
                </div>
                <div className="flex">
                  <div className="h-44 w-64 mt-2">
                    <PieChartTotalRawat />
                  </div>
                  <div className="place-content-center text-base font-semibold">
                    <p>{renderTreatmentText()}</p>
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
