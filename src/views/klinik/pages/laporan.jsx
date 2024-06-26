import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Header from "../../../components/header";
import { FaPrint } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { dataPasien } from "../../statistik/model/data/dataPasien";
import { dataDiagnosa } from "../../statistik/model/data/dataDiagnosa";
import { dataObatPasien } from "../../statistik/model/data/dataTerapi";
import { dataPemeriksaan } from "../../statistik/model/data/dataPemeriksaan";
import { DataKunjunganKlinik } from "../../statistik/model/dataKunjunganKlinik";
import { useNavigate } from 'react-router-dom';

export default function Laporan() {
  const [sortBy, setSortBy] = useState("most");
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();
  const [glitch, setGlitch] = useState(false);

  const handleClick = () => {
    setGlitch(true);
    setTimeout(() => {
      setGlitch(false);
      navigate('/KajianAwal');
    }, 1000); // Durasi glitch (ms)
  };

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
      <div className="fixed z-50">
        <Sidebar_Klinik />
      </div>
      <Header
        title="Pendaftaran Pelayanan Pasien"
        userName="Muhamad Halimudin Nova"
        userStatus="Dokter Poli Umum"
        profilePicture="logo.png"
      />
      <div className="py-5 bg-primary-600 shadow-lg flex-none text-start rounded-lg ml-28 mr-14 mt-5">
        <h1 className="ml-10 text-white font-secondary-Karla font-bold text-xl ">
          Selamat Pagi Petugas Administrasi
        </h1>
        <h1 className="ml-10 text-white font-secondary-Karla font-medium ">
          Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
        </h1>
      </div>

      <div className="bg-primary-600 mx-auto shadow-lg flex justify-center items-center text-center w-[80%] rounded ml-44 mt-5 py-10">
        <h1 className="flex w-auto text-white font-primary-Poppins font-bold text-2xl ">
          LAPORAN PENDAFTARAN PASIEN
        </h1>
      </div>

      <div className="border border-primary-600 mx-auto shadow-lg flex items-center text-center w-[80%] rounded ml-44 py-5">
        <form className="w-full mx-8 space-y-4">
        <div className="flex items-center">
      <button
        type="button"
        className="relative overflow-hidden group p-3 bg-success-600 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-success-700 flex items-center justify-center transition-transform duration-200 transform hover:rotate-10 hover:scale-90"
        onClick={handleClick}
      > Tambah Data
      </button>
    </div>
          <div className="flex justify-center">
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
                onChange={handleStatusChange} // Added onChange event handler
                className="p-1 w-32 rounded-md border border-black font-secondary-Karla font-medium text-black"
              >
                <option value="">Semua</option>
                <option value="Polisi">Polisi</option>
                <option value="PNS">PNS</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Mandiri">Mandiri</option>
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
                    placeholder="Cari pengunjung..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="lg:px-2 lg:w-auto w-40 py-1 pl-8 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-primary-600 placeholder:ml-5"
                    style={{ paddingLeft: "2rem" }}
                  />
                </div>
              </div>

              <button
                type="button"
                className="flex items-center px-4 p-1 border border-black text-black rounded-md hover:bg-blue-600 focus:outline-none"
              >
                <FaPrint className=" mr-3" />
                Cetak
              </button>
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
                <th className="px-4 py-2 bg-primary-600 text-white">Terapi</th>
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
    </>
  );
}
