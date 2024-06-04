import React, { useState } from 'react';
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../../../components/header';

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

export default function Dokter() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  return (
    <>
        <div className="fixed z-50">
          <Sidebar_Klinik/>
        </div>
        <div className="flex relative flex-1">
                <div className="w-screen h-28 bg-primary-600 mx-18 shadow-lg">
                  <Header
                    title="Pendaftaran Pelayanan Pasien"
                    userName="Muhamad Halimudin Nova"
                    userStatus="Dokter Poli Umum"
                    profilePicture="logo.png"
                  />
                </div>
              </div>
              <div
              className="h-28 bg-primary-600 mx-18 shadow-lg flex items-center rounded justify-center my-6 absolute left-24"
              style={{ width: "92%" }}
            >
              <h1 className="text-white font-secondary-Karla font-bold text-xl absolute left-6 py-24 pt-14">
                Selamat Pagi Petugas Administrasi
              </h1>
              <h1 className="text-white font-secondary-Karla font-medium absolute left-6 py-0 pt-8">
                Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
              </h1>
              </div>
              <div className="h-28 bg-primary-600 mx-60 shadow-lg flex items-center justify-center rounded my-48 left-24" style={{ width: '72%' }}>
                <h1 className="text-white my-44 font-primary-Poppins flex justify-center font-bold text-2xl ">
                  KUNJUNGAN
                </h1>
              </div>
              <div className="h-10 w-[470px] bg-primary-600 flex-auto mx-60 shadow-lg rounded-t-lg  left-24 -my-36">
                <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">Pengajuan</h1>
                <div className="h-[700px] w-[470px] border border-primary-600 mx-18 -my-8 shadow-lg rounded-b-lg">
                  <form className="-space-y-10 grid-cols-1 w-full mx-8 left-10 right-24 ">
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold py-14 w-40">
                        Perawatan
                      </label>
                      <select
                        name="Perawatan"
                        className="p-1 rounded-md w-60 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="rawat jalan">Rawat Jalan</option>
                        <option value="rawat inap">Rawat Inap</option>
                        <option value="Promotif Preventif">Promotif Preventif</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        Jenis Kunjungan
                      </label>
                      <select
                        name="Perawatan"
                        className="p-1 rounded-md w-60 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="Kunjungan Sakit">Kunjungan Sakit</option>
                        <option value="Kunjungan Sehat">Kunjungan Sehat</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-14 text-black font-secondary-Karla font-bold w-40">
                        Poli
                      </label>
                      <input
                        type="text"
                        name="poli"
                        className="p-1 h-9 w-[240px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=""
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-3 text-black font-secondary-Karla font-bold w-40">
                        Tanggal Kunjungan
                      </label>
                      <div className="flex items-center border border-gray-300 rounded w-[240px]">
                        <AiOutlineCalendar className="text-gray-500 m-2" />
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="p-2 w-full outline-none"
                          placeholderText="Pilih tanggal"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-16 text-black font-secondary-Karla font-bold w-40 -my[500px]">
                      </label>
                      <div className="flex items-center border border-gray-300 rounded w-[240px]">
                        <AiOutlineClockCircle className="text-gray-500 m-2" />
                        <DatePicker
                          selected={startTime}
                          onChange={(time) => setStartTime(time)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="p-2 w-full outline-none"
                          placeholderText="Pilih waktu"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-5">
                      <label className="py-2 my-16 text-black font-secondary-Karla font-bold w-40">
                        Keluhan
                      </label>
                      <textarea
                        name="keterangan"
                        className="p-1 h-36 rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder="Keterangan......"
                        style={{ width: '51%' }}
                      />
                    </div>

                    <div className="flex items-center space-x-5">
                      <label className="py-2 my-[90px] text-black font-secondary-Karla font-bold w-40">
                        Anamnesa
                      </label>
                      <textarea
                        name="keterangan"
                        className="p-1 h-36 rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder="Keterangan......"
                        style={{ width: '51%' }}
                      />
                    </div>

                    <div className="flex space-x-4">
                       <button 
                         type="button"
                         className="bg-blue-500 mb-36 bg-success-600 text-white px-4 py-1 my-[60px] rounded hover:bg-blue-600"
                         onClick={handleSave}
                       >
                         Simpan
                       </button>
                       <button 
                         type="button"
                         className="bg-gray-500 mb-36 bg-error-600 text-white px-4 py-1 my-[60px] rounded hover:bg-gray-600"
                         onClick={handleCancel}
                       >
                         Batal
                       </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="h-10 w-[470px] bg-primary-600 flex-auto shadow-lg rounded-t-lg mx-[740px] my-[104px]">
                <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">
                  Riwayat Alergi</h1>
                <div className="h-72 w-[470px] border border-primary-600 -my-8 shadow-lg rounded-b-lg">
                  <form className="-space-y-10 grid-cols-1 w-full left-10 right-24 mx-12">
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold py-14 w-40">
                        Makanan :
                      </label>
                      <select
                        name="Perawatan"
                        className="p-1 rounded-md w-52 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="rawat jalan">Tidak ada</option>
                        <option value="rawat inap">Seafood</option>
                        <option value="Promotif Preventif">Gandum</option>
                        <option value="rawat jalan">Susu Sapi</option>
                        <option value="rawat inap">Kacang-Kacangan</option>
                        <option value="Promotif Preventif">Makanan Lainnya</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        Udara :
                      </label>
                      <select
                        name="Perawatan"
                        className="p-1 rounded-md w-52 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="rawat jalan">Tidak ada</option>
                        <option value="rawat inap">Udara Panas</option>
                        <option value="Promotif Preventif">Udara Dingin</option>
                        <option value="Promotif Preventif">Udara Kotor</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-14 text-black font-secondary-Karla font-bold w-40">
                        Obat-Obatan :
                      </label>
                      <select
                        name="Perawatan"
                        className="p-1 rounded-md w-52 border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                      >
                        <option value=""></option>
                        <option value="rawat jalan">Antibiotik</option>
                        <option value="rawat inap">Antiinflasi</option>
                        <option value="Promotif Preventif">Non Steroid</option>
                        <option value="rawat jalan">Kortikosteroid</option>
                        <option value="rawat inap">Insulin</option>
                        <option value="Promotif Preventif">Obat-Obatan lainnya</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="py-2 text-black font-secondary-Karla font-bold w-40">
                        Prognosa
                      </label>
                      <input
                        type="text"
                        name="Prognosa"
                        className="p-1 h-9 w-[210px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=" "
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


              <div className="h-10 w-[470px] grid-cols-1 mx-[740px] my-[270px] bg-primary-600 shadow-lg rounded-t-lg">
                <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">
                  Obat</h1>
                <div className=" h-[360px] w-[470px] border border-primary-600 shadow-lg rounded-b-lg">
                  <form className="space-y-3 p-4 mx-6">
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        Jenis Obat</label>
                      <input 
                        type="text" 
                        name="Jenis Obat" 
                        placeholder=' Keterangan.....'
                        className="p-1 h-9 mx-32 rounded-md text-left bg-white border border-black w-[235px]"
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        Dosis</label>
                      <input 
                        type="text" 
                        name="Dosis" 
                        placeholder=' Keterangan.....'
                        className="p-1 h-24 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">
                        BMHP
                      </label>
                      <input 
                        type="text" 
                        name="BMHP" 
                        placeholder=' Keterangan.....'
                        className="p-1 h-24 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                      />
                    </div>
                    <div className="flex space-x-4">
                       <button 
                         type="button"
                         className="bg-blue-500 bg-success-600 text-white px-4 py-1 my-[30px] rounded hover:bg-blue-600"
                         onClick={handleSave}
                       >
                         Simpan
                       </button>
                       <button 
                         type="button"
                         className="bg-gray-500 bg-error-700 text-white px-4 py-1 my-[30px] rounded hover:bg-gray-600"
                         onClick={handleCancel}
                       >
                         Batal
                       </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="h-10 w-[470px] bg-primary-600 flex-auto shadow-lg rounded-t-lg mx-[740px] my-[380px]">
                <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">
                  Keadaan Fisik</h1>
                <div className="h-72 w-[470px] border border-primary-600 -my-8 shadow-lg rounded-b-lg">
                  <form className="-space-y-10 grid-cols-1 w-full mx-10 left-10 right-24">
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold py-14 w-40">
                        Berat Badan
                      </label>
                      <input
                        type="text"
                        name="berat_badan"
                        className="p-1 h-9 w-[210px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder="   Kg"
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
                        placeholder="   Cm"
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
                        placeholder="   Cm"
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
                        placeholder="   Kg/M2"
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


              <div className="h-10 w-[470px] grid-cols-1 mx-[740px] bg-primary-600 shadow-lg rounded-t-lg my[200px]">
                <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">
                  Tekanan Darah</h1>
                <div className="h-64 w-[470px] border border-primary-600 shadow-lg rounded-b-lg">
                  <form className="space-y-3 p-4 mx-6">
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">Sistole</label>
                      <input 
                        type="text" 
                        name="sistol"
                        placeholder='   mmhg' 
                        className="p-1 h-9 mx-32 rounded-md text-left bg-white border border-black w-[235px]"
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">Distole</label>
                      <input 
                        type="text" 
                        name="distol"
                        placeholder='   mmhg'
                        className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">Respiratory</label>
                      <input 
                        type="text" 
                        name="respiratory" 
                        placeholder='   /Menit'
                        className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                      />
                    </div>
                    <div className="flex items-center space-x-5">
                      <label className="text-black font-secondary-Karla font-bold w-40">Heart Rate</label>
                      <input 
                        type="text" 
                        name="heart_rate" 
                        placeholder='   Bpm'
                        className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-[235px]"
                      />
                    </div>
                    <div className="flex space-x-4">
                       <button 
                         type="button"
                         className="bg-blue-500 bg-success-600 text-white px-4 py-1 rounded hover:bg-blue-600"
                         onClick={handleSave}
                       >
                         Simpan
                       </button>
                       <button 
                         type="button"
                         className="bg-gray-500 bg-error-700 text-white px-4 py-1 rounded hover:bg-gray-600"
                         onClick={handleCancel}
                       >
                         Batal
                       </button>
                    </div>
                  </form>
                </div>
                </div>
    </>
  )
}
