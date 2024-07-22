import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../useAxios";
import { useParams } from "react-router-dom";

export default function Obat() {
  const { id } = useParams();
  const MySwal = withReactContent(Swal);
  const axiosInstance = useAxios();

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
    const data = {
      jenisobat: jenisObat,
      dosis: document.querySelector('textarea[name="Dosis"]').value,
      BMHP: document.querySelector('textarea[name="BMHP"]').value,
      pasienId: id,
    };
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.post("/obats", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        MySwal.fire("Tersimpan!", "Data Anda telah disimpan.", "success");
      } else {
        MySwal.fire("Gagal!", "Data gagal disimpan.", "error");
      }
    } catch (error) {
      MySwal.fire("Error!", "Terjadi kesalahan.", "error");
    }
  };

  const cancelData = () => {
    MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
  };

  const [jenisObat, setJenisObat] = useState([""]);

  const addJenisObat = () => {
    if (jenisObat.length < 5) {
      setJenisObat([...jenisObat, ""]);
    }
  };

  const removeJenisObat = (index) => {
    if (jenisObat.length > 1) {
      const newJenisObat = [...jenisObat];
      newJenisObat.splice(index, 1);
      setJenisObat(newJenisObat);
    }
  };

  return (
    <div className="border border-primary-600 shadow-lg rounded-lg">
      <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
        <h1 className="text-white font-primary-Poppins font-bold text-xl space-y-7">
          Obat
        </h1>
      </div>
      <form className="space-y-3 p-4 w-full">
        <div className="flex items-center space-x-4">
          <label className="text-black font-secondary-Karla font-bold w-[120px]">
            Jenis Obat
          </label>
          <div className="flex flex-col space-y-4">
            {jenisObat.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newJenisObat = [...jenisObat];
                    newJenisObat[index] = e.target.value;
                    setJenisObat(newJenisObat);
                  }}
                  className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                  placeholder="Keterangan....."
                />
                <button
                  type="button"
                  onClick={() => removeJenisObat(index)}
                  className={`bg-error-600 text-white px-3 py-1 rounded hover:bg-red-600 ${
                    jenisObat.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={jenisObat.length <= 1}
                >
                  -
                </button>
                {index === jenisObat.length - 1 && jenisObat.length < 5 && (
                  <button
                    type="button"
                    onClick={addJenisObat}
                    className="bg-success-600 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <label className="text-black font-secondary-Karla font-bold w-40">
            BMHP :
          </label>
          <textarea
            type="text"
            name="BMHP"
            placeholder="Keterangan....."
            className="p-2 h-24 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[30px] rounded hover:bg-emerald-950"
            onClick={handleSave}
          >
            Simpan
          </button>
          <button
            type="button"
            className="bg-error-700 text-white px-4 py-1 my-[30px] rounded hover:bg-gray-600"
            onClick={handleCancel}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
