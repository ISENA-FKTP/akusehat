import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../useAxios";
import { useParams } from "react-router-dom";

export default function Diagnosa() {
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
      jenispenyakit: diagnosa.map((item) => (item.trim() === "" ? null : item)),
      kesadaran: document.querySelector('select[name="Kesadaran"]').value,
      suhu: document.querySelector('input[name="Suhu"]').value,
      pasienId: id,
    };
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.post("/diagnosas", data, {
        headers: { Authorization: `Bearer ${token}` },
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

  const [diagnosa, setDiagnosa] = useState([""]);

  const addDiagnosa = () => {
    if (diagnosa.length < 5) {
      setDiagnosa([...diagnosa, ""]);
    }
  };

  const removeDiagnosa = (index) => {
    if (diagnosa.length > 1) {
      const newDiagnosa = [...diagnosa];
      newDiagnosa.splice(index, 1);
      setDiagnosa(newDiagnosa);
    }
  };

  return (
    <div className="py-1">
      <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
        <h1 className="text-white font-primary-Poppins font-bold text-xl">
          Diagnosa
        </h1>
      </div>
      <div className="border border-primary-600 shadow-lg rounded-b-lg">
        <form className="space-y-3 p-4 mx-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <label className="text-black font-secondary-Karla font-bold w-40">
                Diagnosa :
              </label>
              <div className="flex flex-col space-y-4 w-full">
                {diagnosa.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 w-full"
                  >
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newDiagnosa = [...diagnosa];
                        newDiagnosa[index] = e.target.value;
                        setDiagnosa(newDiagnosa);
                      }}
                      className="p-2 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500 w-full"
                      placeholder="Keterangan....."
                    />
                    <button
                      type="button"
                      onClick={() => removeDiagnosa(index)}
                      className={`bg-error-600 text-white px-3 py-1 rounded hover:bg-red-600 ${
                        diagnosa.length <= 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={diagnosa.length <= 1}
                    >
                      -
                    </button>
                    {index === diagnosa.length - 1 && diagnosa.length < 5 && (
                      <button
                        type="button"
                        onClick={addDiagnosa}
                        className="bg-success-600 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Kesadaran :
            </label>
            <select
              name="Kesadaran"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
            >
              <option value=""></option>
              <option value="Compos Mentis">Compos Mentis</option>
              <option value="Somnolence">Somnolence</option>
              <option value="Sopor">Sopor</option>
              <option value="Coma">Coma</option>
            </select>
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Suhu :
            </label>
            <input
              type="text"
              name="Suhu"
              placeholder="C'"
              className="p-2 h-10 rounded-md text-left bg-white border border-black focus:outline-none w-full"
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
    </div>
  );
}
