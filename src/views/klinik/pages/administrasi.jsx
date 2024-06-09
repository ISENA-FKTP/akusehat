import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Perbaikan impor jwtDecode
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Header from "../../../components/header";
import axios from "axios";

const MySwal = withReactContent(Swal);

const FormComponent = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`Updated ${name}: ${value}`);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, tgllahir: date });
    console.log(`Updated tgllahir: ${date}`);
  };

  const handleSave = () => {
    console.log("Handle save clicked");
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
  };

  const handleCancel = () => {
    console.log("Handle cancel clicked");
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

  const [expire, setExpire] = useState("");
  const [token, setToken] = useState("");
  const [, setLoading] = useState(true);

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        "https://backend-isenafktp.onrender.com/token"
      );
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExpire(decoded.exp);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing token:", error);
      setLoading(false);
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          "https://backend-isenafktp.onrender.com/token"
        );
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setExpire(decoded.exp);
        setLoading(false);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

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

      // Validasi apakah semua field telah diisi
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
        throw new Error("Silahkan lengkapi semua data pasien");
      }

      const response = await axiosJWT.post(
        "https://backend-isenafktp.onrender.com/pasiens",
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
      navigate("/administrasi");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error adding pasien:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const cancelData = () => {
    MySwal.fire("Dibatalkan!", "Perubahan telah dibatalkan.", "error");
  };

  return (
    <div
      className="bg-white shadow-xl flex flex-col place-content-center mx-80 p-6 mt-40 rounded-lg items-center"
      style={{ width: "auto", height: "auto" }}
    >
      <h1 className="text-black font-primary-Poppins font-extrabold text-3xl mb-6 mx-72">
        BIODATA
      </h1>
      <div>
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
          {
            label: "Role",
            name: "role",
            value: "pasien",
          },
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
      </div>

      <div className="flex space-x-5 mt-6 mx-72">
        <button
          onClick={handleSave}
          className="text-white px-3 py-1 rounded-md transition duration-300 bg-success-600"
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
    </div>
  );
};

export default function Administrasi() {
  const [, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [expire, setExpire] = useState("");
  const [, setToken] = useState("");
  const axiosJWT = axios.create();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("accessToken");
      if (!refreshToken) {
        console.log("Gagal Load Refresh Token");
        return;
      }
      console.log("Refreshing token");
      setToken(refreshToken);
      const decoded = jwtDecode(refreshToken);
      setUsername(decoded.username);
      setExpire(decoded.exp);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        try {
          console.log("Token expired, refreshing...");
          const refreshToken = localStorage.getItem("accessToken");
          if (!refreshToken) {
            return Promise.reject("Token refresh tidak tersedia");
          }

          config.headers.Authorization = `Bearer ${refreshToken}`;
          setToken(refreshToken);
          const decoded = jwtDecode(refreshToken);
          setUsername(decoded.username);
          setExpire(decoded.exp);
          setLoading(false);
        } catch (error) {
          console.error("Error refreshing token:", error);
          return Promise.reject(error);
        }
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  axiosJWT.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        try {
          console.log("Unauthorized, refreshing token...");
          await refreshToken();
          return axiosJWT.request(error.config);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          return Promise.reject(error);
        }
      }
      console.error("Response error:", error);
      return Promise.reject(error);
    }
  );

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
              <form className="h-12 rounded-md py-32 pt-10 absolute right-5">
                <div className="flex items-center space-x-5">
                  <select
                    name="bpjsType"
                    className="p-1 rounded-md mb-9 w-60 bg-primary-600 font-secondary-Karla font-medium text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">BPJS</option>
                    <option value="nik">NIK</option>
                    <option value="nrp">NRP</option>
                    <option value="nip">NIP</option>
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
          <FormComponent />
        </div>
      </div>
    </>
  );
}
