import { useEffect, useState } from "react";
import PieChartPolisi from "../diagram/PieChart/PieChartPolisi";
import PieChartTotalPolisi from "../diagram/PieChart/PieChartTotalPolisi";
import PieChartTotalRawat from "../diagram/PieChart/PieChartTotalRawat";
import Sidebar from "../../../components/statistik/sidebar";
import BarChart from "../diagram/BarChart/BarChart";
import BarChartSektor from "../diagram/BarChart/BarChartSektor";
import BarChartRawat from "../diagram/BarChart/BarChartRawat";
import LineChart from "../diagram/LineChart/LineChart";
import SearchBar from "../../../components/manage/searchBar";
import { calculateTotalJumlahSemuaPasien } from "../model/dataPolisi";
import Tabel from "../components/tabel";
import { calculateTotals as calculateBpjsTotals } from "../model/dataPegawaiRawat";
import Header from "../../../components/header";
import { head_data_sakit_statistik } from "../../manage/model/dataSakit";
import useAxios from "../../../useAxios";
import { useSearchParams } from "react-router-dom";

const currentYear = new Date().getFullYear();

export default function DataSakitPolisi() {
  const axiosInstance = useAxios();
  const [year, setYear] = useState(currentYear);
  const [datasakitpolisi, setDatasakitpolisi] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  // Data Sakit
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axiosInstance.get("/datasakitstatistik", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDatasakitpolisi(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredData = datasakitpolisi.filter((datasakitpolisi) => {
    if (year !== "All") {
      return (
        new Date(datasakitpolisi.awalsakit).getFullYear() === parseInt(year) &&
        datasakitpolisi.pegawai?.namapegawai
          ?.toLowerCase()
          .includes(keyword?.toLowerCase())
      );
    }
    return datasakitpolisi.pegawai?.namapegawai
      ?.toLowerCase()
      .includes(keyword?.toLowerCase());
  });

  const percentages = calculateBpjsTotals(filteredData);
  const totalJumlahSemuaPasien = calculateTotalJumlahSemuaPasien(filteredData);

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
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
          <Sidebar
            userName="Rifki Rusdi Satma Putra"
            userStatus="Kepala Polisi"
            profilePicture="/logo.png"
          />
        </div>

        <Header
          title="Statistik Data Sakit Polisi"
          userName="Rifki Rusdi Satma Putra"
          userStatus="Kepala Polisi"
          profilePicture="/logo.png"
        />

        <div className="container mx-auto pl-5 pt-20 lg:pt-0">
          {/* Filter */}
          <div className="flex pt-7 gap-3 place-content-end pr-5">
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
                <option value="All">All</option>
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
          <div className="lg:flex gap-3 place-content-center pt-7 mr-5 lg:mr-0 ">
            {/* Bar Chart */}
            <div className="">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                <div className="flex place-content-between px-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Jumlah Sakit Kesatuan Polisi</h1>
                  </div>
                </div>
                <div className="h-96 lg:w-[26rem] mt-2">
                  <BarChart colors={colorsSektor} data={filteredData} />
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="flex-col">
              <div className="lg:py-0 py-5 lg:pb-3">
                <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                  <div className="flex place-content-between px-5">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Kenaikan Jumlah Sakit Polisi</h1>
                    </div>
                  </div>
                  <div className="h-96 lg:w-[26rem] mt-2">
                    <LineChart data={filteredData} />
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart Total Pasien */}
            <div className="pb-5 lg:pb-7">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center h-[30rem] text-center">
                  <div>
                    <h1 className="text-4xl text-primary-950 font-semibold">
                      {totalJumlahSemuaPasien}
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
                  <div className="h-96 lg:w-72 w-full px-5 lg:px-0 mt-2">
                    <PieChartTotalPolisi
                      data={filteredData}
                      colors={colorsSektor}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:flex gap-3 place-content-center">
            {/* Pie Chart Polisi */}
            <div className="lg:w-[26rem] mr-5 lg:mr-0">
              <div className="shadow-lg py-2 rounded-lg bg-white">
                <div className="flex pl-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Jenis Penyakit</h1>
                  </div>
                </div>
                <div className="h-96 mb-2">
                  <PieChartPolisi data={filteredData} colors={colorsPenyakit} />
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="pt-5 lg:pt-0 pr-5 lg:pr-0">
              <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                <div className="flex">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Satuan Kerja Tertinggi</h1>
                  </div>
                </div>
                <div className="h-96 lg:w-[26rem] mt-2">
                  <BarChartSektor
                    dataInput={filteredData}
                    colors={colorsPenyakit}
                  />
                </div>
              </div>
            </div>

            <div>
              {/* Pie Chart Total Rawat */}
              <div className="lg:pb-3 pb-5 w-96 pt-5 lg:pt-0">
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
                    <div className="h-40 lg:w-64 mt-2">
                      <PieChartTotalRawat
                        dataInput={filteredData}
                        colors={colorsSektor}
                      />
                    </div>
                    <div className="place-content-center text-base font-semibold">
                      <p>{renderTreatmentText()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="lg:pr-0 pr-5 mb-10">
                <div className="shadow-lg py-2 px-5 rounded-lg bg-white">
                  <div className="flex">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Jenis Perawatan</h1>
                    </div>
                  </div>
                  <div className="h-[9.5rem] lg:w-80">
                    <BarChartRawat
                      dataInput={filteredData}
                      colors={colorsPenyakit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Pengunjung */}
        <main className="mt-12 lg:ml-32 ml-5 lg:mr-12 mr-5 space-y-4 mb-10">
          <div>
            <h1 className="text-2xl">Data Sakit Polisi</h1>
          </div>
          <div className="w-full my-4 flex gap-4">
            <SearchBar
              keyword={keyword}
              keywordChange={onKeywordChangeHandler}
            />
          </div>
          <Tabel
            table_head={head_data_sakit_statistik}
            table_row={filteredData}
          />
        </main>
      </div>
    </>
  );
}
