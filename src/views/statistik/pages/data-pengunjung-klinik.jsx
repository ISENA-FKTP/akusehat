import { useState } from "react";
import Sidebar from "../../../components/statistik/sidebar";
import Header from "../../../components/header";
import BarChartPoliUmum from "../diagram/BarChart/BarChartPoliUmum";
import BarChartPoliGigi from "../diagram/BarChart/BarChartPoliGigi";
import {
  DataKunjunganKlinik,
  calculateTotals,
} from "../model/dataKunjunganKlinik";
import PieChartTotalPengunjungKlinik from "../diagram/PieChart/PieChartTotalPengunjungKlinik";
import PieChatStatusPasien from "../diagram/PieChart/PieChartStatusPasienKlinik";
import BarChartRawat from "../diagram/BarChart/BarChartPengunjungPoli";

const currentYear = new Date().getFullYear();

export default function DataPengunjungKlinik() {
  const [year, setYear] = useState(currentYear);

  const filteredData = DataKunjunganKlinik.filter(
    (data) => new Date(data.tanggal).getFullYear() === parseInt(year)
  );

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const { totalHealthy, totalSick } = calculateTotals(filteredData);

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
          <Sidebar
            userName="Rifki Rusdi Satma Putra"
            userStatus="Kepala Polisi"
            profilePicture="/logo.png"
          />
        </div>

        <Header
          title="Statistik Data Kunjungan Klinik"
          userName="Rifki Rusdi Satma Putra"
          userStatus="Kepala Polisi"
          profilePicture="logo.png"
        />

        <div className="container mx-auto pl-5 pt-20 lg:pt-0">
          {/* Filter */}
          <div className="flex gap-3 place-content-end pt-7 pr-5">
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
          </div>

          {/* Statistik */}
          <div className="lg:flex gap-3 place-content-center pt-7 mr-5 lg:mr-0">
            {/* Bar Chart Penyakit Terbanyak*/}
            <div className="">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                <div className="flex">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>10 Penyakit Terbanyak Poli Umum</h1>
                  </div>
                </div>
                <div className="h-96 w-[20rem] mt-2">
                  <BarChartPoliUmum colors={colorsPenyakit} year={year} />
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="my-5 lg:my-0">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                <div className="flex">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>10 Penyakit Terbanyak Poli Gigi</h1>
                  </div>
                </div>
                <div className="h-96 w-[20rem] mt-2">
                  <BarChartPoliGigi colors={colorsPenyakit} year={year} />
                </div>
              </div>
            </div>

            <div>
              <div className="lg:flex gap-3">
                {/* Pie Chart Total Pasien */}
                <div className="lg:pb-3 pb-5">
                  <div className="shadow-lg py-2 px-5 rounded-lg bg-white relative">
                    <div className="absolute inset-0 flex items-center justify-center lg:h-[19rem] text-center">
                      <div>
                        <h1 className="lg:text-3xl text-5xl text-primary-950 font-semibold">
                          {totalVisits}
                        </h1>
                        <p className="text-secondary-400 font-semibold">
                          Total
                        </p>
                      </div>
                    </div>
                    <div className="flex place-content-between">
                      <div className="font-semibold">
                        <h1 className="text-secondary-400">Jenis Data</h1>
                        <h1>Total Pengunjung</h1>
                      </div>
                    </div>
                    <div className="flex z-50">
                      <div className="lg:h-56 h-96 lg:w-44 w-full px-8 lg:px-0 mt-2">
                        <PieChartTotalPengunjungKlinik
                          colors={colorsSektor}
                          year={year}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pie Chart Polisi */}
                <div className="lg:w-72">
                  <div className="shadow-lg py-2 rounded-lg bg-white">
                    <div className="flex pl-5">
                      <div className="font-semibold">
                        <h1 className="text-secondary-400">Jenis Data</h1>
                        <h1>Status Pasien Klinik</h1>
                      </div>
                    </div>
                    <div className="h-56 mb-2">
                      <PieChatStatusPasien
                        colors={colorsPenyakit}
                        year={year}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="lg:w-[32.2rem] py-5 lg:py-0 lg:pb-10">
                <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                  <div className="flex">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Satuan Kerja Tertinggi</h1>
                    </div>
                  </div>
                  <div className="h-[5.2rem]">
                    <BarChartRawat colors={colorsPenyakit} year={year} />
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
