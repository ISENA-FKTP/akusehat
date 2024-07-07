import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxios from "../../../../useAxios";
import { useParams } from "react-router-dom";

const MySwal = withReactContent(Swal);

export default function Pengajuan() {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    politujuan: "",
    perawatan: "",
    jeniskunjungan: "",
    keluhan: "",
    pasienId: id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, simpan!",
      cancelButtonText: "Tidak, batalkan!",
    }).then((result) => {
      if (result.isConfirmed) {
        saveData();
      }
    });
  };

  const handleCancel = () => {
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan membatalkan perubahan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, batalkan!",
      cancelButtonText: "Tidak, kembali!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelData();
      }
    });
  };

  const saveData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axiosInstance.post("/pengajuans", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      MySwal.fire("Tersimpan!", response.data.msg, "success");
    } catch (error) {
      MySwal.fire(
        "Gagal!",
        error.response?.data?.msg || error.message,
        "error"
      );
    }
  };

  const cancelData = () => {
    MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
  };

  return (
    <div className="flex-[60%] mr-16">
      <h1 className="h-10 text-white shadow-lg rounded-t-lg bg-primary-600 font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">
        Pengajuan
      </h1>
      <div className="border border-primary-600 mx-18 -my-8 shadow-lg rounded-b-lg">
        <form className="-space-y-10 w-full mx-8 left-10 right-24">
          <div className="flex items-center">
            <label className="text-black font-secondary-Karla font-bold py-14 w-40">
              Poli Tujuan:
            </label>
            <select
              name="politujuan"
              value={formData.politujuan}
              onChange={handleChange}
              className="p-1 rounded-md w-full mr-16 ml-10 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
            >
              <option value=""></option>
              <option value="Poli Umum">Poli Umum</option>
              <option value="Poli Gigi">Poli Gigi</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Perawatan:
            </label>
            <select
              name="perawatan"
              value={formData.perawatan}
              onChange={handleChange}
              className="p-1 rounded-md w-full mr-16 ml-10 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
            >
              <option value=""></option>
              <option value="Rawat Jalan">Rawat Jalan</option>
              <option value="Rawat Inap">Rawat Inap</option>
              <option value="Promotif Praventif">Promotif Praventif</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="py-14 text-black font-secondary-Karla font-bold w-40">
              Jenis Kunjungan:
            </label>
            <select
              name="jeniskunjungan"
              value={formData.jeniskunjungan}
              onChange={handleChange}
              className="p-1 rounded-md w-full mr-16 ml-10 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
            >
              <option value=""></option>
              <option value="Kunjungan Sakit">Kunjungan Sakit</option>
              <option value="Kunjungan Sehat">Kunjungan Sehat</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="py-2 text-black font-secondary-Karla font-bold w-40">
              Keluhan:
            </label>
            <textarea
              name="keluhan"
              value={formData.keluhan}
              onChange={handleChange}
              className="p-1 h-48 rounded-md text-left bg-white border border-black focus:outline-none w-full mr-16 ml-10"
              placeholder="Keterangan......"
            />
          </div>
        </form>
        <div className="flex space-x-4 place-content-center my-5">
          <button
            type="button"
            className="bg-success-600 text-white px-4 py-1 rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Simpan
          </button>
          <button
            type="button"
            className="bg-error-600 text-white px-4 py-1 rounded hover:bg-gray-600"
            onClick={handleCancel}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
