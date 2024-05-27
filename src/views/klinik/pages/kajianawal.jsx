import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";

export default function KajianAwal() {
  return (
    <>
      {" "}
      <div className="flex">
        <div className="fixed z-50">
          <Sidebar_Klinik />
        </div>
        <div className="flex relative flex-1">
          <div className="absolute inset-0">
            <div className="container">
              <div className="flex-row">
                <div className=" w-screen h-28 bg-primary-600 mx-18 shadow-lg flex items-center justify-center">
                  <h1 className="text-white font-secondary-Karla font-bold text-2xl text-left absolute top-0 left-12 m-11">
                    Pendaftaran pelayanan Pasien
                  </h1>
                </div>
              </div>
              <div
                className=" h-28 bg-primary-600 mx-18 shadow-lg flex items-center rounded justify-center my-6 absolute left-24"
                style={{ width: "92%" }}
              >
                <h1 className="text-white font-secondary-Karla font-bold text-xl absolute left-6 py-24 pt-14">
                  Selamat Pagi Petugas Administrasi
                </h1>
                <h1 className=" text-white font-secondary-Karla font-medium absolute left-6 py-0 pt-8">
                  Selamat Bertugas, Silahkan menambahkan Pasien Di Bawah
                </h1>
              </div>
              <div
                className="h-28 bg-primary-600 mx-32 shadow-lg flex items-center justify-center rounded my-36 absolute left-24"
                style={{ width: "72%" }}
              >
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

              <div className="grid grid-cols-2">
                <div
                  className=" h-10 bg-primary-600 mx-32 shadow-lg rounded-t-lg absolute left-24 my-72"
                  style={{ width: "35%" }}
                >
                  <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">
                    Pengajuan
                  </h1>
                  <div
                    className=" h-96 border border-primary-600 mx-18 -my-8 shadow-lg rounded-b-lg absolute"
                    style={{ width: "100%" }}
                  >
                    <form className=" -space-y-10 w-full mx-auto absolute left-10 right-24">
                      <div className="flex items-center space-x-5">
                        <label className="text-black font-secondary-Karla font-bold py-14 w-40 ">
                          Poli Tujuan
                        </label>
                        <select
                          name="Poli"
                          className="p-1 rounded-md w-60 border border-black font-secondary-Karla 
                      font-medium text-black focus:outline-none focus:border-blue-500"
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
                          className="p-1 rounded-md w-60 border border-black 
                    font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                        >
                          <option value=""></option>
                          <option value="Rawat Jalan">Rawat Jalan</option>
                          <option value="Rawat Inap">Rawat Inap</option>
                          <option value="Promotif Praventif">
                            Promotif Praventif
                          </option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-5">
                        <label className=" py-14 text-black font-secondary-Karla font-bold w-40  ">
                          Jenis Kunjungan
                        </label>
                        <select
                          name="Jenis Kunjungan"
                          className="p-1 rounded-md w-60 mx-5 border border-black 
                    font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                        >
                          <option value=""></option>
                          <option value="Rawat Jalan">Kunjungan Sakit</option>
                          <option value="Rawat Inap">Kunjungan Sehat</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-5">
                        <label className=" py-2 text-black font-secondary-Karla font-bold w-40   ">
                          Keluhan
                        </label>
                        <textarea
                          type="Text"
                          name="keterangan"
                          className="p-1 h-48 rounded-md text-left text-wrap bg-white border border-black focus:outline-none"
                          placeholder="Keterangan......"
                          style={{ width: "51%" }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div>
                  <div
                    className=" h-10 bg-primary-600 shadow-lg rounded-t-lg absolute left-98 right-40 my-72"
                    style={{ width: "35%" }}
                  >
                    <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">
                      Keadaan Fisik
                    </h1>
                    <div
                      className="h-60 border border-primary-600 mx-18 -my-8 shadow-lg rounded-b-lg absolute"
                      style={{ width: "100%" }}
                    >
                      <form className=" -space-y-10 w-full mx-auto absolute left-10 right-24">
                        <div className="flex items-center space-x-5">
                          <label className="text-black font-secondary-Karla font-bold py-14 w-40 ">
                            Berat Badan
                          </label>
                          <input
                            type="Text"
                            name="berat_badan"
                            className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none"
                            placeholder=""
                            style={{ width: "51%" }}
                          />
                        </div>
                        <div className="flex items-center space-x-5">
                          <label className="text-black font-secondary-Karla font-bold w-40">
                            Tinggi Badan
                          </label>
                          <input
                            type="Text"
                            name="tinggi_badan"
                            className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none"
                            placeholder=""
                            style={{ width: "51%" }}
                          />
                        </div>

                        <div className="flex items-center space-x-5">
                          <label className=" py-14 text-black font-secondary-Karla font-bold w-40  ">
                            Lingkar Perut
                          </label>
                          <input
                            type="Text"
                            name="lingkar_perut"
                            className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none"
                            placeholder=""
                            style={{ width: "51%" }}
                          />
                        </div>

                        <div className="flex items-center space-x-5">
                          <label className=" py-2 text-black font-secondary-Karla font-bold w-40  ">
                            IMT (BB/TB)
                          </label>
                          <input
                            type="Text"
                            name="imt"
                            className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none"
                            placeholder=""
                            style={{ width: "51%" }}
                          />
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className=" mx-auto my-40">
                    <div
                      className=" ml-[24.5rem] h-10 mx-36 my-96 bg-primary-600 shadow-lg rounded-t-lg absolute left-96"
                      style={{ width: "35%" }}
                    >
                      <h1 className="text-white font-primary-Poppins font-bold text-xl justify-center flex items-center my-1">
                        Tekanan Darah
                      </h1>
                      <div className=" h-64 border border-primary-600 shadow-lg rounded-b-lg">
                        <form className="space-y-3 p-4">
                          <div className="flex items-center space-x-5">
                            <label className="text-black font-secondary-Karla font-bold w-40">
                              Sistole
                            </label>
                            <input
                              type="text"
                              name="sistol"
                              className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                            />
                          </div>
                          <div className="flex items-center space-x-5">
                            <label className="text-black font-secondary-Karla font-bold w-40">
                              Distole
                            </label>
                            <input
                              type="text"
                              name="distol"
                              className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                            />
                          </div>
                          <div className="flex items-center space-x-5">
                            <label className="text-black font-secondary-Karla font-bold w-40">
                              Respiratory
                            </label>
                            <input
                              type="text"
                              name="respiratory"
                              className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                            />
                          </div>
                          <div className="flex items-center space-x-5">
                            <label className="text-black font-secondary-Karla font-bold w-40">
                              Heart Rate
                            </label>
                            <input
                              type="text"
                              name="keterangan"
                              className="p-1 h-9 rounded-md text-left bg-white border border-black focus:outline-none w-full"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
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
