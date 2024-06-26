import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxios from "../../../../useAxios";

const MySwal = withReactContent(Swal);

export default function KeadaanFisik() {
  const axiosInstance = useAxios();
  const getPasienId = localStorage.getItem("pasienId");
  const [formData, setFormData] = useState({
    beratbadan: "",
    tinggibadan: "",
    lingkarperut: "",
    imtBBTB: "",
    pasienId: getPasienId,
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
      const response = await axiosInstance.post("/kfs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      MySwal.fire("Tersimpan!", response.data.msg, "success");
    } catch (error) {
      MySwal.fire("Gagal!", error.response.data.msg, "error");
    }
  };

  const cancelData = () => {
    MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
  };

  return (
    <div className="">
      <h1 className="w-[30rem] bg-primary-600 shadow-lg rounded-t-lg h-10 text-white font-primary-Poppins font-bold text-xl justify-center flex items-center">
        Keadaan Fisik
      </h1>
      <div className="h-72 w-[30rem] border border-primary-600 mx-18 -my-8 shadow-lg rounded-b-lg">
        <form className="-space-y-10 grid-cols-1 w-full mx-8 left-10 right-24">
          <div className="flex items-center">
            <label className="text-black font-secondary-Karla font-bold py-14 w-40">
              Berat Badan :
            </label>
            <input
              type="text"
              name="beratbadan"
              value={formData.beratbadan}
              onChange={handleChange}
              className="p-1 h-9 w-60 rounded-md text-left bg-white border border-black focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Tinggi Badan :
            </label>
            <input
              type="text"
              name="tinggibadan"
              value={formData.tinggibadan}
              onChange={handleChange}
              className="p-1 h-9 w-60 rounded-md text-left bg-white border border-black focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <label className="py-14 text-black font-secondary-Karla font-bold w-40">
              Lingkar Perut :
            </label>
            <input
              type="text"
              name="lingkarperut"
              value={formData.lingkarperut}
              onChange={handleChange}
              className="p-1 h-9 w-60 rounded-md text-left bg-white border border-black focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <label className="py-2 text-black font-secondary-Karla font-bold w-40">
              IMT (BB/TB) :
            </label>
            <input
              type="text"
              name="imtBBTB"
              value={formData.imtBBTB}
              onChange={handleChange}
              className="p-1 h-9 w-60 rounded-md text-left bg-white border border-black focus:outline-none"
            />
          </div>
        </form>
        <div className="flex space-x-4 mt-4 place-content-center">
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
      </div>
    </div>
  );
}
