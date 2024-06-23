import { useEffect, useState } from "react";
import PieChartPolisi from "../diagram/PieChart/PieChartPolisi";
import PieChartTotalPolisi from "../diagram/PieChart/PieChartTotalPolisi";
import PieChartTotalRawat from "../diagram/PieChart/PieChartTotalRawat";
import Sidebar from "../../../components/statistik/sidebar";
import BarChart from "../diagram/BarChart/BarChart";
import BarChartSektor from "../diagram/BarChart/BarChartSektor";
import BarChartRawat from "../diagram/BarChart/BarChartRawat";
import LineChart from "../diagram/LineChart/LineChart";
import { calculateTotals } from "../model/dataPolisi";
import {
  DataPegawaiRawat,
  calculateTotals as calculateBpjsTotals,
} from "../model/dataPegawaiRawat";
import Header from "../../../components/header";
import { DataSakit } from "../model/dataSakit";
import { IoSearch } from "react-icons/io5";
import { DataSektor } from "../model/dataSektor";

const currentYear = new Date().getFullYear();

export default function DataSakitPolisi() {
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState("most");
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { totalJumlahPolda, totalObatPolres } = calculateTotals();

  const totalJumlahSemua = totalJumlahPolda + totalObatPolres;

  const filteredDataPegawai = DataPegawaiRawat.filter(
    (data) => new Date(data.awalsakit).getFullYear() === parseInt(year)
  );

  const percentages = calculateBpjsTotals(filteredDataPegawai);

  useEffect(() => {
    setData(DataSakit);
    filterDataByYear(DataSakit, year);
  }, [year]);

  useEffect(() => {
    filterDataByYear(data, year);
  }, [year, data]);

  const filterDataByYear = (data, year) => {
    const filtered = data.filter(
      (item) => new Date(item.tanggal).getFullYear() === parseInt(year)
    );
    setFilteredData(filtered);
  };

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

  const combinedData = DataSektor.map((polisi) => ({
    ...polisi,
    rawat: DataPegawaiRawat.find((rawat) => rawat.uuid === polisi.uuid),
  }));

  useEffect(() => {
    const sorted =
      sortBy === "most"
        ? [...combinedData].sort((a, b) => b.rawat.lamacuti - a.rawat.lamacuti)
        : [...combinedData].sort((a, b) => a.rawat.lamacuti - b.rawat.lamacuti);
    setSortedData(sorted);
  }, [combinedData, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPolisi = sortedData.filter((entry) =>
    entry.namapegawai.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <BarChart colors={colorsSektor} year={year.toString()} />
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
                    <LineChart year={year.toString()} />
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart Total Pasien */}
            <div className="pb-5 lg:pb-7">
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
                  <div className="h-96 lg:w-72 w-full px-5 lg:px-0 mt-2">
                    <PieChartTotalPolisi
                      colors={colorsSektor}
                      year={year.toString()}
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
                    colors={colorsPenyakit}
                    year={year.toString()}
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
                        colors={colorsSektor}
                        year={year.toString()}
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
                      colors={colorsPenyakit}
                      year={year.toString()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Pengunjung */}
        <div className="container mx-auto pb-10 lg:pl-3 pl-5">
          <h1 className="text-2xl font-bold mt-4 mb-2 ">
            Data Seluruh Pengunjung Klinik
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-secondary-500">
            Seluruh data terkait pengunjung di klinik
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
                <option value="most">Cuti Terbanyak</option>
                <option value="least">Cuti Tersedikit</option>
              </select>
            </div>
            <div className="flex items-center mt-9 lg:mt-0">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <IoSearch className="text-xl text-gray-500" />
                </span>
                <input
                  type="text"
                  placeholder="Cari pengunjung..."
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
                  <th className="px-4 py-2 bg-primary-600 text-white">Nama</th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Pangkat/NRP
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Satuan Kerja
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Jenis Sakit
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Jenis Perawatan
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Sumber Biaya
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Awal Sakit
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Lama Cuti
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white ">WFH</th>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tr-lg">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPolisi.map((entry, index) => (
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
                      {entry.namapegawai}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.pangkat + "/" + entry.nrp}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.satuankerja}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.jenispenyakit}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.jenisperawatan}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.sumberbiaya}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.awalsakit}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.lamacuti}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.WFH}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.keterangan}
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
