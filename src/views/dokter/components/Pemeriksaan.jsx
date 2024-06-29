import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "react-datepicker/dist/react-datepicker.css";

export default function Pemeriksaan() {
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

  return (
    <div>
      <div className="">
        <div className="h-10 bg-primary-600 shadow-lg rounded-t-lg py-4 justify-center flex items-center">
          <h1 className="text-white font-primary-Poppins font-bold text-xl   ">
            Pemeriksaan
          </h1>
        </div>
        <div className=" border border-primary-600 shadow-lg rounded-b-lg">
          <form className="-space-y-12 w-full ml-9 left-10 right-24 pr-20 ">
            <div className="flex items-center space-x-6 pb-14 pt-3">
              <label className="text-black font-secondary-Karla font-bold w-40">
                Kasus KLL
              </label>
              <input
                type="checkbox"
                name="Kasus KLL"
                className="p-3 left-24 rounded-sm bg-white border border-black focus:outline-none "
                placeholder="   "
              />
              <span className=" text-black font-bold font-secondary">
                Kecelakaan Lalu Lintas
              </span>
            </div>

            <div className="flex items-center space-x-5">
              <label className="text-black font-secondary-Karla font-bold w-44 ">
                Nama Dokter :
              </label>
              <select
                name="Nama Dokter"
                className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              >
                <option value=""></option>
                <option value="Dr. Ira Atmi Indiyanti">
                  Dr. Ira Atmi Indiyanti
                </option>
                <option value="Dr. Lita Yuliati">Dr. Lita Yuliati</option>
                <option value="Drg. Liem Frisca Anatasia">
                  Drg. Liem Frisca Anatasia
                </option>
              </select>
            </div>
            <div className="flex items-center space-x-5">
              <label className="py-14 text-black font-secondary-Karla font-bold w-44 ">
                Pelayanan Non Medis :
              </label>
              <input
                type="text"
                name="Pelayanan Non Medis"
                className="p-2 w-full rounded-md text-left bg-white border border-black focus:outline-none"
                placeholder=" Keterangan....."
              />
            </div>
            <div className="flex items-center space-x-5">
              <label className=" text-black font-secondary-Karla font-bold w-44">
                Status Pulang :
              </label>
              <select
                name="Status Pulang"
                className="p-2 rounded-md w-full border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              >
                <option value=""></option>
                <option value="Meninggal">Meninggal</option>
                <option value="Berobat Jalan">Berobat jalan</option>
                <option value="Rujukan">Rujukan</option>
              </select>
            </div>
            <div className="flex space-x-4 pt-20 pb-5">
              <button
                type="button"
                className="bg-blue-500 bg-success-600 text-white px-4 py-1  rounded hover:bg-emerald-950"
                onClick={handleSave}
              >
                Simpan
              </button>
              <button
                type="button"
                className=" bg-error-700 text-white px-4 py-1  rounded hover:bg-gray-600"
                onClick={handleCancel}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
