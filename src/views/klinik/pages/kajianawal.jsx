import React from "react";
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Profil from "../../../components/klinik/Profile";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const handleSave = () => {
  MySwal.fire({
    title: 'Apakah Anda yakin?',
    text: "Anda tidak akan dapat mengembalikan ini!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, simpan!',
    cancelButtonText: 'Tidak, batalkan!'
  }).then((result) => {
    if (result.isConfirmed) {
      saveData();
    }
  });
};

const handleCancel = () => {
  MySwal.fire({
    title: 'Apakah Anda yakin?',
    text: "Anda akan membatalkan perubahan ini!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, batalkan!',
    cancelButtonText: 'Tidak, kembali!'
  }).then((result) => {
    if (result.isConfirmed) {
      cancelData();
    }
  });
};

const saveData = () => {
  MySwal.fire(
    'Tersimpan!',
    'Data Anda telah disimpan.',
    'success'
  );
};

const cancelData = () => {
  MySwal.fire(
    'Dibatalkan!',
    'Perubahan telah dibatalkan.',
    'error'
  );
};

export default function KajianAwal() {
  return (
    <>
      <div className="flex">
        <div className="fixed z-50">
          <Sidebar_Klinik/>
        </div>
        <div className="flex relative flex-1">
          <div className="absolute inset-0">
            <div className="container">
              <div className="flex-row">
                <div className="w-screen h-28 bg-primary-600 mx-18 shadow-lg">
                  <Profil
                    title="Pendaftaran Pelayanan Pasien"
                    userName="Muhamad Halimudin Nova"
                    userStatus="Dokter Poli Umum"
                    profilePicture="logo.png"
                  />
                </div>
              </div>
              <div className="h-28 bg-primary-600 mx-18 shadow-lg flex items-center rounded justify-center my-6 absolute left-24" style={{width:'92%'}}>
                <h1 className="text-white font-secondary-Karla font-bold text-xl absolute left-6 py-24 pt-14">
                  Selamat Pagi Petugas Administrasi
                </h1>
                <h1 className="text-white font-secondary-Karla font-medium absolute left-6 py-0 pt-8">
                  Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
                </h1>
              </div>
              <div className="h-28 bg-primary-600 mx-32 shadow-lg flex items-center justify-center rounded my-36 absolute left-24" style={{ width: '72%' }}>
                <h1 className="text-white font-primary-Poppins flex justify-center font-bold text-2xl absolute py-24 pt-14">
                  PENGKAJIAN AWAL
                </h1>
                <h1 className="text-white font-primary-Poppins font-bold text-2xl absolute pt-16 py-14">
                  PASIEN RAWAT JALAN
                </h1>
                <h1 className="text-white font-primary-Poppins font-right italic absolute pt-16 py-1">
                  (Diisi pada Saat Pasien Pertama Kali Datang Ke Klinik)
                </h1>
              </div>
              
              <div className="h-10 w-[470px] bg-primary-600 mx-32 shadow-lg rounded-t-lg absolute left-24 my-72">
                <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">Pengajuan</h1>
                <div className="h-[450px] w-[470px] border border-primary-600 mx-18 -my-8 shadow-lg rounded-b-lg absolute">
                  <form className="-space-y-10 grid-cols-1 w-full mx-auto absolute left-10 right-24">
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold py-14 w-40">
                        Poli Tujuan
                      </label>
                      <select
                        name="Poli"
                        className="p-1 rounded-md w-60 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Poli Umum">Poli Umum</option>
                        <option value="Poli Gigi">Poli Gigi</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        Perawatan
                      </label>
                      <select
                        name="Perawatan"
                        className="p-1 rounded-md w-60 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Rawat Jalan">Rawat Jalan</option>
                        <option value="Rawat Inap">Rawat Inap</option>
                        <option value="Promotif Praventif">Promotif Praventif</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-14 text-black font-secondary-Karla font-bold w-40">
                        Jenis Kunjungan
                      </label>
                      <select
                        name="Jenis Kunjungan"
                        className="p-1 rounded-md w-60 mx-5 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Rawat Jalan">Kunjungan Sakit</option>
                        <option value="Rawat Inap">Kunjungan Sehat</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-2 text-black font-secondary-Karla font-bold w-40">
                        Keluhan
                      </label>
                      <textarea
                        name="keterangan"
                        className="p-1 h-48 rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder="Keterangan......"
                        style={{ width: '51%' }}
                      />
                    </div>
                    <div className="flex space-x-4">
                       <button 
                         type="button"
                         className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[60px] rounded hover:bg-blue-600"
                         onClick={handleSave}
                       >
                         Simpan
                       </button>
                       <button 
                         type="button"
                         className="bg-gray-500 bg-error-600 text-white px-4 py-1 my-[60px] rounded hover:bg-gray-600"
                         onClick={handleCancel}
                       >
                         Batal
                       </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="h-10 w-[470px] bg-primary-600 shadow-lg rounded-t-lg absolute left-98 right-40 my-72">
                <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">Keadaan Fisik</h1>
                <div className="h-72 w-[470px] border border-primary-600 mx-18 -my-8 shadow-lg rounded-b-lg absolute">
                  <form className="-space-y-10 grid-cols-1 w-full mx-auto absolute left-10 right-24">
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold py-14 w-40">
                        Berat Badan
                      </label>
                      <input
                        type="text"
                        name="berat_badan"
                        className="p-1 h-9 w-[210px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=""
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        Tinggi Badan
                      </label>
                      <input
                        type="text"
                        name="tinggi_badan"
                        className="p-1 h-9 w-[210px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=""
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-14 text-black font-secondary-Karla font-bold w-40">
                        Lingkar Perut
                      </label>
                      <input
                        type="text"
                        name="lingkar_perut"
                        className="p-1 h-9 w-[210px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=""
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-2 text-black font-secondary-Karla font-bold w-40">
                        IMT (BB/TB)
                      </label>
                      <input
                        type="text"
                        name="imt"
                        className="p-1 h-9 w-[210px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=""
                      />
                    </div>
                    <div className="flex space-x-4">
                       <button 
                         type="button"
                         className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[60px] rounded hover:bg-blue-600"
                         onClick={handleSave}
                       >
                         Simpan
                       </button>
                       <button 
                         type="button"
                         className="bg-gray-500 bg-error-700 text-white px-4 py-1 my-[60px] rounded hover:bg-gray-600"
                         onClick={handleCancel}
                       >
                         Batal
                       </button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="h-10 w-[470px] grid-cols-1 mx-[335px] my-[600px] bg-primary-600 shadow-lg rounded-t-lg absolute left-96">
                <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">Tekanan Darah</h1>
                <div className="h-64 w-[470px] border border-primary-600 shadow-lg rounded-b-lg">
                  <form className="space-y-3 p-4 mx-6">
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">Sistole</label>
                      <input 
                        type="text" 
                        name="sistol" 
                        className="p-1 h-9 mx-32 rounded-md text-left bg-white border border-black w-[235px]"
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">Distole</label>
                      <input 
                        type="text" 
                        name="distol" 
                        className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">Respiratory</label>
                      <input 
                        type="text" 
                        name="respiratory" 
                        className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">Heart Rate</label>
                      <input 
                        type="text" 
                        name="heart_rate" 
                        className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                      />
                    </div>
                    <div className="flex space-x-4">
                       <button 
                         type="button"
                         className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[10px] rounded hover:bg-blue-600"
                         onClick={handleSave}
                       >
                         Simpan
                       </button>
                       <button 
                         type="button"
                         className="bg-gray-500 bg-error-700 text-white px-4 py-1 my-[10px] rounded hover:bg-gray-600"
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
    </>
  );
}
