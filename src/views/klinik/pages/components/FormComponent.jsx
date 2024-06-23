import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useAxios from "../../../../useAxios";
import PropTypes from "prop-types";

const MySwal = withReactContent(Swal);

const FormComponent = ({ existingPatient }) => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    nobpjs: "",
    nama: "",
    statuspeserta: "",
    tgllahir: null,
    gender: "",
    ppkumum: "",
    nohp: "",
    norm: "",
    role: "pasien",
  });

  // useEffect(() => {
  //   if (existingPatient) {
  //     setFormData(existingPatient);
  //   } else {
  //     setFormData({
  //       nobpjs: "",
  //       nama: "",
  //       statuspeserta: "",
  //       tgllahir: null,
  //       gender: "",
  //       ppkumum: "",
  //       nohp: "",
  //       norm: "",
  //       role: "pasien",
  //     });
  //   }
  // }, [existingPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, tgllahir: date });
  };

  const handleSaveOrNext = () => {
    if (existingPatient) {
      navigate("/dokter");
    } else {
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
          postPasiens();
        }
      });
    }
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

  const postPasiens = async () => {
    try {
      const {
        nobpjs,
        nama,
        statuspeserta,
        tgllahir,
        gender,
        ppkumum,
        nohp,
        norm,
        role,
      } = formData;

      if (
        !nobpjs ||
        !nama ||
        !statuspeserta ||
        !tgllahir ||
        !gender ||
        !ppkumum ||
        !nohp ||
        !norm ||
        !role
      ) {
        throw new Error("Silakan lengkapi semua data pasien");
      }

      const token = localStorage.getItem("accessToken");
      const response = await axiosInstance.post(
        "/pasiens",
        {
          nobpjs,
          nama,
          statuspeserta,
          tgllahir,
          gender,
          ppkumum,
          nohp,
          norm,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      localStorage.setItem("pasienId", response.data.userId);

      MySwal.fire({
        title: "Sukses!",
        text: "Data pasien berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/kajianawal");
    } catch (error) {
      console.error(
        "Error adding pasien:",
        error.response ? error.response.data.message : error.message
      );

      MySwal.fire({
        title: "Gagal!",
        text: error.response ? error.response.data.message : error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const cancelData = () => {
    MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
  };

  return (
    <div className="bg-white shadow-xl flex flex-col place-content-center mx-80 p-6 mt-40 rounded-lg items-center">
      <h1 className="text-black font-primary-Poppins font-extrabold text-3xl mb-6 mx-72">
        BIODATA
      </h1>
      <div>
            <div className="flex items-center py-1">
                      <label className=" text-black font-secondary-Karla font-bold w-36">
                        NRP/No. BPJS :
                      </label>
                      <input
                        type="text"
                        name="Pelayanan Non Medis"
                        className="p-2  w-[500px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=" Keterangan....."
                      />
                    </div>

                    <div className="flex items-center py-1">
                      <label className=" text-black font-secondary-Karla font-bold w-36 ">
                        Nama :
                      </label>
                      <input
                        type="text"
                        name="Pelayanan Non Medis"
                        className="p-2 w-[500px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=" Keterangan....."
                      />
                    </div>

                    <div className="flex items-center  py-1">
                      <label className=" text-black font-secondary-Karla font-bold w-36 ">
                        Status Peserta :
                      </label>
                      <input
                        type="text"
                        name="Pelayanan Non Medis"
                        className="p-2 w-[500px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=" Keterangan....."
                      />
                    </div>

                    <div className="flex items-center py-1 w-full">
              <label className="text-black font-secondary-Karla font-bold w-36">
                Tanggal :
              </label>
              <input
                type="date"
                className="p-2  w-[500px] rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center py-1">
                      <label className=" text-black font-secondary-Karla font-bold w-36">
                        Jenis Kelamin :
                      </label>
                      <input
                        type="text"
                        name="Pelayanan Non Medis"
                        className="p-2 w-[500px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=" Keterangan....."
                      />
                    </div>

                    <div className="flex items-center  py-1">
                      <label className=" text-black font-secondary-Karla font-bold w-36 ">
                        PKK Umum :
                      </label>
                      <input
                        type="text"
                        name="Pelayanan Non Medis"
                        className="p-2  w-[500px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=" Keterangan....."
                      />
                    </div>

                    <div className="flex items-center  py-1">
                      <label className=" text-black font-secondary-Karla font-bold w-36 ">
                        No. Handphone :
                      </label>
                      <input
                        type="text"
                        name="Pelayanan Non Medis"
                        className="p-2  w-[500px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=" Keterangan....."
                      />
                    </div>

                    <div className="flex items-center  py-1">
                      <label className=" text-black font-secondary-Karla font-bold w-36 ">
                       No. Rekam Medis :
                      </label>
                      <input
                        type="text"
                        name="Pelayanan Non Medis"
                        className="p-2  w-[500px] rounded-md text-left bg-white border border-black focus:outline-none"
                        placeholder=" Keterangan....."
                      />
                    </div>
                    </div>
      {/* {[
        {
          label: "NRP/No.BPJS",
          name: "nobpjs",
          placeholder: "Masukkan NRP atau No. BPJS",
        },
        { label: "Nama", name: "nama", placeholder: "Masukkan nama" },
        {
          label: "Status Pasien",
          name: "statuspeserta",
          placeholder: "Masukkan status pasien",
        },
        {
          label: "Tanggal Lahir",
          name: "tgllahir",
          placeholder: "Pilih tanggal lahir",
        },
        {
          label: "Jenis Kelamin",
          name: "gender",
          placeholder: "Masukkan jenis kelamin",
        },
        {
          label: "PPK Umum",
          name: "ppkumum",
          placeholder: "Masukkan PPK umum",
        },
        {
          label: "No.Handphone",
          name: "nohp",
          placeholder: "Masukkan nomor handphone",
        },
        {
          label: "No.Rekam Medis",
          name: "norm",
          placeholder: "Masukkan nomor rekam medis",
        },
        { label: "Role", name: "role", value: "pasien" },
      ].map((field, index) => (
        <div className="flex items-center mb-1" key={index}>
          <label className="text-black font-secondary-Karla font-bold w-48 mx-1">
            {field.label}:
          </label>
          {field.name === "tgllahir" ? (
            <DatePicker
              selected={formData.tgllahir}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText={field.placeholder}
              className="px-10 py-1 rounded-md border-2 border-black border-opacity-70 w-[30rem]"
            />
          ) : (
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="px-10 py-1 rounded-md border-2 border-black border-opacity-70 w-[30rem]"
            />
          )}
        </div>
      ))} */}
      <div className="flex space-x-5 mt-6 mx-72">
        <button
          onClick={handleSaveOrNext}
          className="text-white px-3 py-1 rounded-md transition duration-300 bg-success-600"
        >
          {existingPatient ? "Selanjutnya" : "Simpan"}
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
  );
};

FormComponent.propTypes = {
  existingPatient: PropTypes.object,
};

export default FormComponent;
