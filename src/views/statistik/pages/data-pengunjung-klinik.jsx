import { useEffect, useState, useMemo } from "react";
import Sidebar from "../../../components/statistik/sidebar";
import Header from "../../../components/header";
import BarChartPoliUmum from "../diagram/BarChart/BarChartPoliUmum";
import BarChartPoliGigi from "../diagram/BarChart/BarChartPoliGigi";
import { calculateTotals } from "../model/dataKunjunganKlinik";
import PieChartTotalPengunjungKlinik from "../diagram/PieChart/PieChartTotalPengunjungKlinik";
import PieChatStatusPasien from "../diagram/PieChart/PieChartStatusPasienKlinik";
import BarChartRawat from "../diagram/BarChart/BarChartPengunjungPoli";
import useAxios from "../../../useAxios";
import { IoSearch } from "react-icons/io5";

const currentYear = new Date().getFullYear();

export default function DataPengunjungKlinik() {
  const axiosInstance = useAxios();
  const [year, setYear] = useState(currentYear);
  const [sortBy, setSortBy] = useState("most");
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");
  const [dataPasien, setDataPasien] = useState([]);
  const [dataPengajuans, setPengajuans] = useState([]);
  const [dataDiagnosa, setDataDiagnosa] = useState([]);
  const [dataObat, setDataObat] = useState([]);
  const [dataPemeriksaan, setDataPemeriksaan] = useState([]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const colorsPenyakit = [
    "#5726FF",
    "#FACC15",
    "#FCE073",
    "#DDD4FF",
    "#0099FF",
  ];

  const colorsSektor = ["#5726FF", "#FD9A28"];

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          pasiensRes,
          pengajuansRes,
          diagnosaRes,
          obatRes,
          pemeriksaanRes,
        ] = await Promise.all([
          axiosInstance.get("/pasiens"),
          axiosInstance.get("/pelayanans"),
          axiosInstance.get("/diagnosas"),
          axiosInstance.get("/obats"),
          axiosInstance.get("/pemeriksaans"),
        ]);

        setDataPasien(pasiensRes.data);
        setPengajuans(pengajuansRes.data);
        setDataDiagnosa(diagnosaRes.data);
        setDataObat(obatRes.data);
        setDataPemeriksaan(pemeriksaanRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  const combinedData = useMemo(
    () =>
      dataPasien.map((pasien) => ({
        ...pasien,
        pengajuan: dataPengajuans.find(
          (pengajuan) => pengajuan.pasienId === pasien.id
        ),
        diagnosa: dataDiagnosa.find(
          (diagnosa) => diagnosa.pasienId === pasien.id
        ),
        obat: dataObat.find((obat) => obat.pasienId === pasien.id),
        pemeriksaan: dataPemeriksaan.find(
          (pemeriksaan) => pemeriksaan.pasienId === pasien.id
        ),
      })),
    [dataDiagnosa, dataObat, dataPasien, dataPemeriksaan, dataPengajuans]
  );

  const countStatusOccurrences = (data) => {
    const statusCount = data.reduce((acc, item) => {
      acc[item.statuspeserta] = (acc[item.statuspeserta] || 0) + 1;
      return acc;
    }, {});
    return statusCount;
  };

  const sortStatusByFrequency = (a, b, order, statusCount) => {
    const countA = statusCount[a.statuspeserta] || 0;
    const countB = statusCount[b.statuspeserta] || 0;
    return order === "most" ? countB - countA : countA - countB;
  };

  useEffect(() => {
    const statusCount = countStatusOccurrences(combinedData);
    const sorted = [...combinedData].sort((a, b) =>
      sortStatusByFrequency(a, b, sortBy, statusCount)
    );
    setSortedData(sorted);
  }, [combinedData, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredKlinik = sortedData.filter(
    (entry) =>
      entry.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus ? entry.statuspeserta === selectedStatus : true)
  );

  const filteredData = filteredKlinik.filter((dataKlinik) => {
    if (year !== "All") {
      return new Date(dataKlinik.createdAt).getFullYear() === parseInt(year);
    }
    return dataKlinik.createdAt;
  });

  const { totalHealthy, totalSick } = calculateTotals(filteredData);

  const totalVisits = totalHealthy + totalSick;

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
                    dataInput={filteredData}
                    colors={colorsPenyakit}
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
                    dataInput={filteredData}
                    colors={colorsPenyakit}
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
                          dataInput={filteredData}
                          colors={colorsSektor}
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
                        dataInput={filteredData}
                        colors={colorsPenyakit}
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
                      dataInput={filteredData}
                      colors={colorsPenyakit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-primary-600 mx-auto shadow-lg flex items-center text-center w-[80%] rounded ml-44 py-5">
          <form className="w-full mx-8 space-y-4">
            <div className="flex  justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 ">
                  <label
                    htmlFor="sort"
                    className="text-black font-secondary-Karla font-bold"
                  >
                    Penyakit:
                  </label>
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
              </div>

              <div className="flex items-center space-x-3">
                <label className="text-black font-secondary-Karla font-bold">
                  Status Pasien
                </label>
                <select
                  name="Status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="p-1 w-32 rounded-md border border-black font-secondary-Karla font-medium text-black"
                >
                  <option value="">Semua</option>
                  <option value="Polisi">Polisi</option>
                  <option value="PNS">PNS</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <label className="text-black font-secondary-Karla font-bold">
                  Tanggal
                </label>
                <input
                  type="date"
                  className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-5">
                <div className="flex items-center mt-9 lg:mt-0">
                  <div className="relative mx-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <IoSearch className="text-xl text-gray-500" />
                    </span>
                    <input
                      type="text"
                      placeholder="Nama Pasien..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="lg:px-2 lg:w-auto w-40 py-1 pl-8 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-primary-600 placeholder:ml-5"
                      style={{ paddingLeft: "2rem" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Data Pengunjung */}
        <div className="ml-28 mr-14 mt-10">
          <div className="overflow-x-auto pr-5 lg:pr-0">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tl-lg">
                    No
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Tanggal Masuk
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
                    Status Pulang
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
                      {formatDate(entry.createdAt) ||
                        "Data Belum Diisi Oleh Admin"}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.norm || "Data Belum Diisi Oleh Admin"}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.pengajuan?.poli || "Data Belum Diisi Oleh Admin"}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.nama || "Data Belum Diisi Oleh Admin"}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {`${formatDate(entry.tgllahir)} (${calculateAge(
                        entry.tgllahir
                      )} tahun)` || "Data Belum Diisi Oleh Admin"}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.gender || "Data Belum Diisi Oleh Admin"}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.statuspeserta || "Data Belum Diisi Oleh Admin"}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.diagnosa ? (
                        <>
                          <div>
                            {entry.diagnosa.jenispenyakit1 ||
                              "Data Belum Diisi Oleh Dokter"}
                          </div>
                          <div>{entry.diagnosa.jenispenyakit2}</div>
                          <div>{entry.diagnosa.jenispenyakit3}</div>
                          <div>{entry.diagnosa.jenispenyakit4}</div>
                          <div>{entry.diagnosa.jenispenyakit5}</div>
                        </>
                      ) : (
                        "Data Belum Diisi Oleh Dokter"
                      )}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.obat ? (
                        <>
                          <div>
                            {entry.obat.jenisobat1 ||
                              "Data Belum Diisi Oleh Dokter"}
                          </div>
                          <div>{entry.obat.jenisobat2}</div>
                          <div>{entry.obat.jenisobat3}</div>
                          <div>{entry.obat.jenisobat4}</div>
                          <div>{entry.obat.jenisobat5}</div>
                        </>
                      ) : (
                        "Data Belum Diisi Oleh Dokter"
                      )}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.pemeriksaan?.statuspulang ||
                        "Data Belum Diisi Oleh Dokter"}
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
