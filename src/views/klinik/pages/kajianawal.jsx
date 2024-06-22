import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "../../../components/header";
import KeadaanFisik from "./components/KeadaanFisik";

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

export default function KajianAwal() {
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

      <div className="flex relative flex-1">
        <div className="absolute inset-0">
          <div className="flex flex-col place-content-center">
            <div className="py-5 bg-primary-600 shadow-lg flex-none text-start rounded-lg ml-28 mr-14 mt-5">
              <h1 className="ml-10 text-white font-secondary-Karla font-bold text-xl ">
                Selamat Pagi Petugas Administrasi
              </h1>
              <h1 className="ml-10 text-white font-secondary-Karla font-medium ">
                Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
              </h1>
            </div>

            <div className=" bg-primary-600 mx-auto shadow-lg flex-none items-center text-center w-[80%] rounded ml-44 mt-5 py-5">
              <h1 className="text-white font-primary-Poppins flex justify-center font-bold text-2xl ">
                PENGKAJIAN AWAL
              </h1>
              <h1 className="text-white font-primary-Poppins font-bold text-2xl">
                PASIEN RAWAT JALAN
              </h1>
              <h1 className="text-white font-primary-Poppins font-right italic">
                (Diisi pada Saat Pasien Pertama Kali Datang Ke Klinik)
              </h1>
            </div>

            <div className="flex mt-7 ml-44 mr-28 items-baseline">
              <div className=" flex-[60%] mr-16">
                <h1 className="h-10 text-white shadow-lg rounded-t-lg bg-primary-600  font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">
                  Pengajuan
                </h1>
                <div className="  border border-primary-600 mx-18 -my-8 shadow-lg rounded-b-lg ">
                  <form className="-space-y-10 w-full mx-8 left-10 right-24">
                    <div className="flex items-center">
                      <label className="text-black font-secondary-Karla font-bold py-14 w-40">
                        Poli Tujuan :
                      </label>
                      <select
                        name="Poli"
                        className="p-1 rounded-md w-full mr-16 ml-10 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Poli Umum">Poli Umum</option>
                        <option value="Poli Gigi">Poli Gigi</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        Perawatan :
                      </label>
                      <select
                        name="Perawatan"
                        className="p-1 rounded-md w-full mr-16 ml-10 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Rawat Jalan">Rawat Jalan</option>
                        <option value="Rawat Inap">Rawat Inap</option>
                        <option value="Promotif Praventif">
                          Promotif Praventif
                        </option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <label className="py-14 text-black font-secondary-Karla font-bold w-40">
                        Jenis Kunjungan :
                      </label>
                      <select
                        name="Jenis Kunjungan"
                        className="p-1 rounded-md w-full mr-16 ml-10 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Rawat Jalan">Kunjungan Sakit</option>
                        <option value="Rawat Inap">Kunjungan Sehat</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <label className="py-2 text-black font-secondary-Karla font-bold w-40">
                        Keluhan :
                      </label>
                      <textarea
                        name="keterangan"
                        className="p-1 h-48 rounded-md text-left bg-white border border-black focus:outline-none w-full mr-16 ml-10"
                        placeholder="Keterangan......"
                      />
                    </div>
                  </form>
                  <div className="flex space-x-4 place-content-center my-5">
                    <button
                      type="button"
                      className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-blue-600"
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

              <div className="grid grid-rows-2 gap-5 flex-[40%]">
                <KeadaanFisik />

                <div>
                  <h1 className=" w-[30rem] bg-primary-600 shadow-lg rounded-t-lg h-10 text-white font-primary-Poppins font-bold text-xl justify-center flex items-center">
                    Tekanan Darah
                  </h1>
                  <div className="h-64 w-[30rem] border border-primary-600 shadow-lg rounded-b-lg">
                    <form className="space-y-3 p-4 mx-6">
                      <div className="flex items-center">
                        <label className="text-black font-secondary-Karla font-bold w-40">
                          Sistole :
                        </label>
                        <input
                          type="text"
                          name="sistol"
                          className="p-1 h-9  rounded-md text-left bg-white border border-black w-[235px]"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="text-black font-secondary-Karla font-bold w-40">
                          Distole :
                        </label>
                        <input
                          type="text"
                          name="distol"
                          className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="text-black font-secondary-Karla font-bold w-40">
                          Respiratory
                        </label>
                        <input
                          type="text"
                          name="respiratory"
                          className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="text-black font-secondary-Karla font-bold w-40">
                          Heart Rate
                        </label>
                        <input
                          type="text"
                          name="heart_rate"
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
                          className=" bg-error-700 text-white px-4 py-1 rounded hover:bg-gray-600"
                          onClick={handleCancel}
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
