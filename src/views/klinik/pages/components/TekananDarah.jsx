import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxios from "../../../../useAxios";
import { useParams } from "react-router-dom";

const MySwal = withReactContent(Swal);

export default function TekananDarah() {
  const { id } = useParams();

  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    sistole: "",
    distole: "",
    respiratory: "",
    heartrate: "",
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
      const response = await axiosInstance.post("/tds", formData, {
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
    <div>
      <h1 className="w-[30rem] bg-primary-600 shadow-lg rounded-t-lg h-10 text-white font-primary-Poppins font-bold text-xl justify-center flex items-center">
        Tekanan Darah
      </h1>
      <div className="h-64 w-[30rem] border border-primary-600 shadow-lg rounded-b-lg">
        <form className="space-y-3 p-4 mx-6">
          <div className="flex items-center">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Sistole :
            </label>
            <input
              name="sistole"
              value={formData.sistol}
              onChange={handleChange}
              className="p-1 h-9 rounded-md text-left bg-white border border-black w-[235px]"
            />
          </div>
          <div className="flex items-center">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Distole :
            </label>
            <input
              name="distole"
              value={formData.distol}
              onChange={handleChange}
              className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
            />
          </div>
          <div className="flex items-center">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Respiratory :
            </label>
            <input
              name="respiratory"
              value={formData.respiratory}
              onChange={handleChange}
              className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
            />
          </div>
          <div className="flex items-center">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Heart Rate :
            </label>
            <input
              name="heartrate"
              value={formData.heartrate}
              onChange={handleChange}
              className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
            />
          </div>
          <div className="flex space-x-4 place-content-center mt-3">
            <button
              type="button"
              className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Simpan
            </button>
            <button
              type="button"
              className="bg-error-700 text-white px-4 py-1 rounded hover:bg-gray-600"
              onClick={handleCancel}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
