import { useEffect, useState } from "react";
import useAxios from "../../../useAxios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const MySwal = withReactContent(Swal);

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
  MySwal.fire("Tersimpan!", "Data Anda telah disimpan.", "success");
};

const cancelData = () => {
  MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
};

export default function KeadaanFisik() {
  const [data, setData] = useState({
    beratbadan: "",
    tinggibadan: "",
    lingkarperut: "",
    imtBBTB: "",
  });
  const axiosInstance = useAxios();
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/kfsDokter/${id}`)
      .then((response) => {
        const fetchedData = response.data;
        setData({
          beratbadan: fetchedData.beratbadan || "",
          tinggibadan: fetchedData.tinggibadan || "",
          lingkarperut: fetchedData.lingkarperut || "",
          imtBBTB: fetchedData.imtBBTB || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        MySwal.fire("Error", "Gagal mengambil data.", "error");
      });
  }, [axiosInstance, id]);

  return (
    <div className="">
      <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
        <h1 className="text-white font-primary-Poppins font-bold text-xl">
          Keadaan Fisik
        </h1>
      </div>
      <div className="border border-primary-600 shadow-lg rounded-b-lg">
        <form className="space-y-3 py-4 ml-10 pr-10">
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Berat badan :
            </label>
            <input
              type="text"
              name="Berat Badan"
              placeholder="mmhg"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              value={data.beratbadan}
              readOnly
            />
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Tinggi Badan :
            </label>
            <input
              type="text"
              name="Tinggi Badan"
              placeholder="mmhg"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              value={data.tinggibadan}
              readOnly
            />
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              Lingkar Perut
            </label>
            <input
              type="text"
              name="Lingkar Perut"
              placeholder="/Menit"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              value={data.lingkarperut}
              readOnly
            />
          </div>
          <div className="flex items-center space-x-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
              IMT (BB/BT) :
            </label>
            <input
              type="text"
              name="IMT (BB/BT)"
              placeholder="Bpm"
              className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              value={data.imtBBTB}
              readOnly
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
