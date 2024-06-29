import "react-datepicker/dist/react-datepicker.css";
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Header from "../../../components/header";
import { FaPrint } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import useLaporanData from "./components/useLaporanData";

export default function Laporan() {
  const {
    sortBy,
    searchTerm,
    selectedStatus,
    handleClick,
    handleSortChange,
    handleSearch,
    handleStatusChange,
    filteredKlinik,
    calculateAge,
  } = useLaporanData();

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
        <h1 className="ml-10 text-white font-secondary-Karla font-bold text-xl">
          Selamat Pagi Petugas Administrasi
        </h1>
        <h1 className="ml-10 text-white font-secondary-Karla font-medium">
          Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
        </h1>
      </div>

      <div className="bg-primary-600 mx-auto shadow-lg flex justify-center items-center text-center w-[80%] rounded ml-44 mt-5 py-10">
        <h1 className="flex w-auto text-white font-primary-Poppins font-bold text-2xl">
          LAPORAN PENDAFTARAN PASIEN
        </h1>
      </div>

      <div className="border border-primary-600 mx-auto shadow-lg flex items-center text-center w-[80%] rounded ml-44 py-5">
        <form className="w-full mx-8 space-y-4">
          <div className="flex justify-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
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
                  className="lg:ml-2 mt-2 lg:mt-0 border border-primary-600 rounded-md shadow-sm"
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
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-5">
                <button
                  type="button"
                  className="flex items-center px-6 py-1 border border-black text-black rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  <FaPrint className="mr-3" />
                  Cetak
                </button>
              </div>
              <div className="flex items-center place-content-end mt-2">
                <button
                  type="button"
                  className="relative overflow-hidden group px-4 py-2 bg-success-600 text-white rounded-md font-medium text-sm"
                  onClick={handleClick}
                >
                  Tambah Data
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Data Pengunjung */}
      <div className="ml-28 mr-14 mt-5">
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
                    {entry.pengajuansResponse.politujuan}
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
                    {entry.pengajuansResponse.keluhan}
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
