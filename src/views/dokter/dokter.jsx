import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/header";
import Sidebar_Dokter from "../../components/klinik/sidebar_dokter";
import { IoSearch } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../useAxios";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const calculateAge = (birthDateString) => {
  const birthDate = new Date(birthDateString);
  const referenceDate = new Date("2024-07-08T00:00:00.000Z");
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = referenceDate.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && referenceDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export default function Dokter() {
  const [dataPasien, setDataPasien] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState({});
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const pasiensResponse = await axiosInstance.get("/Pasiens", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const pengajuansResponse = await axiosInstance.get(
          "/pengajuansDokter",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const combinedData = pasiensResponse.data.flatMap((pasien) => {
          const pengajuans = pengajuansResponse.data.filter(
            (pengajuanDokter) => pengajuanDokter.pasien.id === pasien.id
          );
          return pengajuans.map((pengajuan) => ({ ...pasien, pengajuan }));
        });

        setDataPasien(combinedData);

        const initialApprovalStatus = combinedData.reduce((acc, entry) => {
          acc[entry.pengajuan.uuid] = entry.pengajuan.approved;
          return acc;
        }, {});
        setApprovalStatus(initialApprovalStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Gagal mengambil data pasien atau pengajuan", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchData();
  }, [axiosInstance]);

  const handleEditClick = (id, nama) => {
    toast.info(`Edit pasien ${nama}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate(`/kunjungan_dokter/${id}`);
  };

  const handleApproveClick = async (nama, id, uuid) => {
    try {
      const token = localStorage.getItem("accessToken");
      const pelayanansResponse = await axiosInstance.get(`/pelayanans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (pelayanansResponse.data.length !== 0) {
        await axiosInstance.patch(
          `/pengajuans/${uuid}`,
          { approved: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApprovalStatus((prevStatus) => ({
          ...prevStatus,
          [uuid]: true,
        }));
        toast.success(`Approve pasien ${nama}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setApprovalStatus((prevStatus) => ({
          ...prevStatus,
          [uuid]: false,
        }));
        toast.error(`Tidak ada data pelayanan untuk pasien ${nama}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setApprovalStatus((prevStatus) => ({
        ...prevStatus,
        [uuid]: false,
      }));
      console.error("Error fetching pelayanans data:", error);
      toast.error("Gagal mengambil data pelayanan", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="fixed z-50">
        <Sidebar_Dokter />
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
          PENDAFTARAN PASIEN
        </h1>
      </div>

      <div className="border border-primary-600 mx-auto shadow-lg flex items-center text-center w-[80%] rounded ml-44 py-5">
        <form className="w-full mx-8 space-y-4">
          <div className="flex justify-around">
            <div className="flex items-center space-x-3">
              <label className="text-black font-secondary-Karla font-bold">
                Poli
              </label>
              <select
                name="Poli"
                className="p-1 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              >
                <option value=""></option>
                <option value="Poli Umum">Poli Umum</option>
                <option value="Poli Gigi">Poli Gigi</option>
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
              <div className="relative mx-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <IoSearch className="text-xl text-gray-500" />
                </span>
                <input
                  type="text"
                  placeholder="Cari pengunjung..."
                  className="lg:px-2 lg:w-auto w-40 py-1 pl-8 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-primary-600 placeholder:ml-5"
                  style={{ paddingLeft: "2rem" }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="ml-28 mr-14 mt-10 mb-10">
        <div className="overflow-x-auto pr-5 lg:pr-0">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-primary-600 text-white rounded-tl-lg">
                  NO
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  NRP/No. BPJS
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  Tanggal Masuk
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  Nama Pasien
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  Status Peserta
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  Tanggal Lahir
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  Jenis Kelamin
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  PKK Umum
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  No.handphone
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  No.Rekam Medis
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">
                  Poli Tujuan
                </th>
                <th className="px-4 py-2 bg-primary-600 text-white">Aksi</th>
                <th className="px-4 py-2 bg-primary-600 text-white rounded-tr-lg">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPasien.map((entry, index) => (
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
                    {entry.nobpjs}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    {formatDate(entry.createdAt)}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    {entry.nama}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    {entry.statuspeserta}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    {`${formatDate(entry.tgllahir)} (${calculateAge(
                      entry.tgllahir
                    )} tahun)`}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    {entry.gender}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    {entry.ppkumum}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    {entry.nohp}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    {entry.norm}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    {entry.pengajuan.politujuan}
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px",
                          border: "none",
                          background: "none",
                        }}
                        onClick={() =>
                          handleEditClick(entry.pengajuan.pasien.id, entry.nama)
                        }
                      >
                        <FaEdit
                          className="text-primary-600"
                          style={{ fontSize: "24px" }}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="border border-primary-600 px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        handleApproveClick(
                          entry.nama,
                          entry.pengajuan.pasien.id,
                          entry.pengajuan.uuid
                        )
                      }
                    >
                      {approvalStatus[entry.pengajuan.uuid] ? (
                        <MdOutlineCheckBox className="text-primary-600 text-2xl" />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank className="text-primary-600 text-2xl" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
