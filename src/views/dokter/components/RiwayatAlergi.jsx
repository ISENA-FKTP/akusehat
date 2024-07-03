import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../useAxios";
import { useParams } from "react-router-dom";

export default function RiwayatAlergi() {
  const MySwal = withReactContent(Swal);
  const axiosInstance = useAxios();
  const { id } = useParams();

  const [makananLainnya, setMakananLainnya] = useState(false);
  const [obatLainnya, setObatLainnya] = useState(false);

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

  const saveData = () => {
    const formData = {
      makanan: document.querySelector('select[name="Makanan"]').value,
      udara: document.querySelector('select[name="Udara"]').value,
      obatan: document.querySelector('select[name="Obat"]').value,
      prognosa: document.querySelector('input[name="Prognosa"]').value,
      pasienId: id,
    };

    const token = localStorage.getItem("accessToken");
    axiosInstance
      .post("/ras", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        MySwal.fire("Tersimpan!", "Data Anda telah disimpan.", "success");
      })
      .catch(() => {
        MySwal.fire("Gagal!", "Data Anda tidak dapat disimpan.", "error");
      });
  };

  const cancelData = () => {
    MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
  };

  return (
    <div className="mt-5">
      <div className="border border-primary-600 shadow-lg rounded-lg">
        <div className="bg-primary-600 shadow-lg rounded-t-lg py-2 justify-center flex items-center">
          <h1 className="text-white font-primary-Poppins font-bold text-xl">
            Riwayat Alergi
          </h1>
        </div>
        <form className="space-y-3 py-10 ml-10 pr-10">
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Makanan:
            </label>
            <select
              name="Makanan"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              onChange={(e) =>
                setMakananLainnya(e.target.value === "Makanan Lainnya")
              }
            >
              <option value=""></option>
              <option value="Tidak ada">Tidak ada</option>
              <option value="Seafood">Seafood</option>
              <option value="Gandum">Gandum</option>
              <option value="Susu Sapi">Susu Sapi</option>
              <option value="Kacang-Kacangan">Kacang-Kacangan</option>
              <option value="Makanan Lainnya">Makanan Lainnya</option>
            </select>
          </div>
          {makananLainnya && (
            <div className="">
              <input
                type="text"
                name="KeteranganMakanan"
                className="p-2 rounded-md w-80 ml-32 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                placeholder="Keterangan...."
              />
            </div>
          )}

          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Udara:
            </label>
            <select
              name="Udara"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
            >
              <option value=""></option>
              <option value="Tidak ada">Tidak ada</option>
              <option value="Udara panas">Udara Panas</option>
              <option value="Udara Dingin">Udara Dingin</option>
              <option value="Udara Kotor">Udara Kotor</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Obat:
            </label>
            <select
              name="Obat"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              onChange={(e) =>
                setObatLainnya(e.target.value === "Obat-Obatan lainnya")
              }
            >
              <option value=""></option>
              <option value="Antibiotik">Antibiotik</option>
              <option value="Antiinflamasi">Antiinflamasi</option>
              <option value="Non Steroid">Non Steroid</option>
              <option value="Kortikosteroid">Kortikosteroid</option>
              <option value="Insulin">Insulin</option>
              <option value="Obat-Obatan lainnya">Obat-Obatan lainnya</option>
            </select>
          </div>
          {obatLainnya && (
            <div className="">
              <input
                type="text"
                name="KeteranganObat"
                className="p-2 rounded-md w-80 ml-32 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                placeholder="Keterangan...."
              />
            </div>
          )}

          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Prognosa:
            </label>
            <input
              type="text"
              name="Prognosa"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              placeholder=" "
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-emerald-950"
              onClick={handleSave}
            >
              Simpan
            </button>
            <button
              type="button"
              className=" bg-error-700 text-white px-4 py-1 rounded hover:bg-gray-600"
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
