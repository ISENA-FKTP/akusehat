import { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/statistik/sidebar";
import PieChartPolisi from "./diagram/PieChart/PieChartPolisi";
import PieChartApotik, {
  TotalObatYear,
} from "./diagram/PieChart/PieChartApotik";
import BarChart from "./diagram/BarChart/BarChart";
import LineChart from "./diagram/LineChart/LineChart";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { FaVirus } from "react-icons/fa6";
import SearchBar from "../../components/manage/searchBar";
import { useSearchParams } from "react-router-dom";
import { head_data_sakit_statistik } from "../manage/model/dataSakit";
import Tabel from "./components/tabel";
import useAxios from "../../useAxios";

const currentYear = new Date().getFullYear();

export default function Statistik() {
  const axiosInstance = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState(currentYear);

  const [datasakitpolisi, setDatasakitpolisi] = useState([]);
  const [dataObat, setDataObat] = useState([]);
  const [dataObatDelete, setDataObatDelete] = useState([]);

  const [jumlahDataSakit, setJumlahDataSakit] = useState(0);
  const [jumlahDataKlinik, setJumlahDataKlinik] = useState(0);
  const [jumlahDataObat, setJumlahDataObat] = useState(0);
  const [jumlahDataObatKeluar, setJumlahDataObatKeluar] = useState(0);
  const [jumlahDataDiagnosa, setJumlahDataDiagnosa] = useState(0);

  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  const { totalJumlahObat, totalObatKeluar } = TotalObatYear(
    dataObat,
    dataObatDelete
  );
  const total = totalJumlahObat + totalObatKeluar;
  let persen_obat_masuk = 0;
  let persen_obat_keluar = 0;

  if (total === 0) {
    persen_obat_masuk = 0;
    persen_obat_keluar = 0;
  } else {
    persen_obat_masuk = ((totalJumlahObat / total) * 100).toFixed(1);
    persen_obat_keluar = ((totalObatKeluar / total) * 100).toFixed(1);
  }

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

        const uniquePegawaiIds = response.data.reduce((acc, item) => {
          acc[item.pegawaiId] = true;
          return acc;
        }, {});

        const totalData = Object.keys(uniquePegawaiIds).length;

        setJumlahDataSakit(totalData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  // Data Pengajuan
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axiosInstance.get("/pengajuansStatistik", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const totalData = response.data.length;

        setJumlahDataKlinik(totalData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  // Data Obat
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axiosInstance.get("/dataobatStatistik", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const obatData = response.data;
        setDataObat(obatData);

        const totalJumlahObat = obatData.reduce((total, item) => {
          return total + (item.jumlahobat || 0);
        }, 0);

        setJumlahDataObat(totalJumlahObat);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  // Data Diagnosa
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axiosInstance.get("/diagnosaStatistik", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const diagnosaData = response.data;

        const uniquePenyakit = new Set();

        diagnosaData.forEach((item) => {
          [
            "jenispenyakit1",
            "jenispenyakit2",
            "jenispenyakit3",
            "jenispenyakit4",
            "jenispenyakit5",
          ].forEach((field) => {
            if (item[field]) {
              uniquePenyakit.add(item[field].toLowerCase());
            }
          });
        });

        setJumlahDataDiagnosa(uniquePenyakit.size);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  // Data Delete Obat
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axiosInstance.get("/deletedataobatStatistik", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const obatData = response.data;
        setDataObatDelete(obatData);

        const totalJumlahObat = obatData.reduce((total, item) => {
          return total + (item.jumlahobat || 0);
        }, 0);

        setJumlahDataObatKeluar(totalJumlahObat);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
  };

  const colorsPenyakit = [
    "#5726FF",
    "#FACC15",
    "#FCE073",
    "#DDD4FF",
    "#0099FF",
  ];
  const colorsSektor = ["#5726FF", "#FD9A28"];

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

  return (
    <>
      <div className="bg-[#E0F1EE] font-primary ">
        {/* Sidebar */}
        <div className="fixed z-50">
          <Sidebar
            userName="Rifki Rusdi Satma Putra"
            userStatus="Kepala Polisi"
            profilePicture="logo.png"
          />
        </div>
        <Header
          title="Statistik Data Laporan"
          userName="Rifki Rusdi Satma Putra"
          userStatus="Kepala Polisi"
          profilePicture="logo.png"
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
          <div className="lg:flex pt-7 gap-3 place-content-center flex-wrap pr-5 lg:pr-0">
            {/* Polisi Sakit */}
            <div className="flex bg-white px-5 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md">
                <BsPeopleFill size={75} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">{jumlahDataSakit}</h1>
                <h3 className="font-semibold text-lg">Polisi Sakit</h3>
              </div>
            </div>

            {/* Pengunjung Klinik */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md place-content-center">
                <FaPeopleGroup size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">{jumlahDataKlinik}</h1>
                <h3 className="font-semibold text-lg">Pengunjung Klinik</h3>
              </div>
            </div>

            {/* Obat Masuk */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md">
                <GiMedicines size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">{jumlahDataObat}</h1>
                <h3 className="font-semibold text-lg">Total Obat</h3>
              </div>
            </div>

            {/* Obat Keluar */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md">
                <GiMedicines size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">{jumlahDataObatKeluar}</h1>
                <h3 className="font-semibold text-lg">Obat Keluar</h3>
              </div>
            </div>

            {/* Jenis Penyakit */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md">
                <FaVirus size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">{jumlahDataDiagnosa}</h1>
                <h3 className="font-semibold text-lg">Jenis Penyakit</h3>
              </div>
            </div>
          </div>

          {/* Statistik */}
          <div className="lg:flex gap-3 place-content-center mr-5 lg:mr-0">
            {/* Pie Chart Polisi */}
            <div className="lg:py-7 py-3">
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
                <div className="h-96 w-96 mb-2 lg:px-0 px-2 ">
                  <PieChartPolisi data={filteredData} colors={colorsPenyakit} />
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="lg:py-7 py-3">
              <div className="shadow-lg py-2 lg:px-5 rounded-lg bg-white">
                <div className="flex place-content-between px-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Jumlah Sakit Kesatuan Polisi</h1>
                  </div>
                  <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                    {year}
                  </p>
                </div>
                <div className="h-96 w-96 mt-2 lg:px-0 px-2">
                  <BarChart data={filteredData} colors={colorsSektor} />
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="lg:flex-col">
              <div className="pt-7 pb-3">
                <div className="shadow-lg py-2 lg:px-5 rounded-lg bg-white">
                  <div className="flex place-content-between px-5">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Jumlah Sakit Kesatuan Polisi</h1>
                    </div>
                    <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                      {year}
                    </p>
                  </div>
                  <div className="lg:h-[149px] lg:px-0 px-2 h-60 w-96 mt-2 ">
                    <LineChart data={filteredData} />
                  </div>
                </div>
              </div>

              {/* Pie Chaart Apotik */}
              <div className="pb-7">
                <div className="shadow-lg py-2 lg:px-5 rounded-lg bg-white">
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
                      <PieChartApotik
                        dataMasuk={dataObat}
                        dataKeluar={dataObatDelete}
                        colors={colorsSektor}
                      />
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
                      <div className="flex gap-4 lg:px-0 px-2">
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
