import { useEffect, useState } from "react";
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
import { IoSearch } from "react-icons/io5";
import { dataPasien } from "../model/data/dataPasien";
import { dataDiagnosa } from "../model/data/dataDiagnosa";
import { dataObatPasien } from "../model/data/dataTerapi";
import { dataPemeriksaan } from "../model/data/dataPemeriksaan";

const currentYear = new Date().getFullYear();

export default function DataPengunjungKlinik() {
  const [year, setYear] = useState(currentYear);
  const [sortBy, setSortBy] = useState("most");
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const combinedData = dataPasien.map((pasien) => ({
    ...pasien,
    diagnosa: dataDiagnosa.find((diagnosa) => diagnosa.uuid === pasien.uuid),
    kunjungan: DataKunjunganKlinik.find(
      (kunjungan) => kunjungan.uuid === pasien.uuid
    ),
    obatpasien: dataObatPasien.find((obat) => obat.uuid === pasien.uuid),
    pemeriksaan: dataPemeriksaan.find(
      (pemeriksaan) => pemeriksaan.uuid === pasien.uuid
    ),
  }));

  useEffect(() => {
    const sorted =
      sortBy === "most"
        ? [...combinedData].sort((a, b) => b.quantity - a.quantity)
        : [...combinedData].sort((a, b) => a.quantity - b.quantity);
    setSortedData(sorted);
  }, [combinedData, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredKlinik = sortedData.filter((entry) =>
    entry.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

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
                value={year.toString()}
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
                  <BarChartPoliUmum
                    colors={colorsPenyakit}
                    year={year.toString()}
                  />
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
                  <BarChartPoliGigi
                    colors={colorsPenyakit}
                    year={year.toString()}
                  />
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
                          year={year.toString()}
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
                        year={year.toString()}
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
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    No. Rekam Medis
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">Poli</th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Nama Lengkap
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">Usia</th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Jenis Kelamin
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Status Pasien
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Diagnosa
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Terapi
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tr-lg">
                    Rujuk (Ya/Tidak)
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredKlinik.map((entry, index) => (
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
                      {entry.norm}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.kunjungan.politujuan}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.nama}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {calculateAge(entry.tgllahir)} tahun
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.gender}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.statuspeserta}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.diagnosa.jenispenyakit}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.obatpasien && (
                        <>
                          <div>{entry.obatpasien.jenisobat1}</div>
                          <div>{entry.obatpasien.jenisobat2}</div>
                          <div>{entry.obatpasien.jenisobat3}</div>
                          <div>{entry.obatpasien.jenisobat4}</div>
                          <div>{entry.obatpasien.jenisobat5}</div>
                        </>
                      )}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.pemeriksaan.statuspulang}
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
