import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import DatePicker from "react-datepicker";
import Header from "../../../components/header";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";

const MySwal = withReactContent(Swal);

const FormComponent = ({ token, existingPatient }) => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (existingPatient) {
      setFormData(existingPatient);
    } else {
      setFormData({
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
    }
  }, [existingPatient]);

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

      const response = await axios.post(
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

      MySwal.fire({
        title: "Sukses!",
        text: "Data pasien berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/administrasi");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error adding pasien:",
        error.response ? error.response.data : error.message
      );

      MySwal.fire({
        title: "Gagal!",
        text: error.response ? error.response.data : error.message,
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
      {[
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
      ))}
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
  token: PropTypes.string.isRequired,
  existingPatient: PropTypes.object,
};

export default function Administrasi() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [existingPatient, setExistingPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUsername(decodedToken.username);
        setToken(storedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("accessToken");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSearch = async (searchType, searchValue) => {
    let apiUrl = "";

    if (searchType === "bpjs") {
      apiUrl = `http://localhost:3000/api/peserta/bpjs/${searchValue}`;
    } else if (searchType === "nik") {
      apiUrl = `http://localhost:3000/api/peserta/nik/${searchValue}`;
    }

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.response) {
        const formattedPatient = {
          nobpjs: response.data.response.noKartu,
          nama: response.data.response.nama,
          statuspeserta: response.data.response.jnsPeserta.nama,
          tgllahir: new Date(
            response.data.response.tglLahir.split("-").reverse().join("-")
          ),
          gender: response.data.response.sex,
          ppkumum: response.data.response.kdProviderPst
            ? response.data.response.kdProviderPst.nmProvider
            : "",
          nohp: response.data.response.noHP,
          norm: "",
          role: "pasien",
        };
        setExistingPatient(formattedPatient);
      } else {
        setExistingPatient(null);
      }
    } catch (error) {
      console.error("Error searching patient:", error);
    }
  };

  return (
    <>
      <div className="fixed z-50">
        <Sidebar_Klinik />
      </div>
      <Header
        title="Pendaftaran Pelayanan Pasien"
        userName={username}
        userStatus="Dokter Poli Umum"
        profilePicture="logo.png"
      />

      <div className="flex relative flex-1">
        <div className="absolute inset-0">
          <div className="container">
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
              <form
                className="h-12 rounded-md py-32 pt-10 absolute right-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  const searchType = e.target.bpjsType.value;
                  const searchValue = e.target.search.value;
                  handleSearch(searchType, searchValue);
                }}
              >
                <div className="flex items-center space-x-5">
                  <select
                    name="bpjsType"
                    className="py-1 px-2 rounded-md border border-white mb-9 w-[15.8rem] bg-primary-600 font-secondary-Karla font-medium text-white focus:outline-none focus:border-indigo-50"
                  >
                    <option className="bg-primary-600 text-white" value="bpjs">
                      BPJS
                    </option>
                    <option className="bg-primary-600 text-white" value="nik">
                      NIK
                    </option>
                  </select>
                  <div className="relative w-full">
                    <input
                      type="search"
                      name="search"
                      className="p-1 rounded-md bg-white focus:outline-none mb-10 w-full"
                      placeholder="Cari.."
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute right-3 top-2.5 text-gray-500"
                    />
                  </div>
                </div>
              </form>

              <form className="h-12 rounded-md absolute right-5 -mb-14">
                <div className="flex items-center space-x-5">
                  <h1 className="text-white font-secondary-Karla font-medium mb-9 w-60">
                    No. Pendaftaran
                  </h1>
                  <input
                    type="search"
                    name="search"
                    className="p-1 rounded-md bg-white focus:outline-none mb-10"
                    placeholder=""
                    style={{ width: "100%" }}
                  />
                </div>
              </form>
            </div>
          </div>
          <FormComponent token={token} existingPatient={existingPatient} />
        </div>
      </div>
    </>
  );
}
