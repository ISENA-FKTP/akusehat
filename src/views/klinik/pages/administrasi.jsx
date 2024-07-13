import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Sidebar_Klinik from "../../../components/klinik/sidebar_klinik";
import Header from "../../../components/header";
import FormComponent from "./components/FormComponent";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import crypto from "crypto-js"; // Menambahkan library crypto-js
import { ppkData } from "../../../json/ppkData";

const Administrasi = () => {
  const [username, setUsername] = useState("");
  const [existingPatient, setExistingPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("accessToken");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const generateTimestamp = () => Math.floor(Date.now() / 1000);

  const generateSignature = (consid, timestamp, consumerSecret) => {
    const message = `${consid}&${timestamp}`;
    const hash = crypto.HmacSHA256(message, consumerSecret);
    return crypto.enc.Base64.stringify(hash);
  };

  const generateAuthorization = (username, password, kdAplikasi) => {
    const credentials = `${username}:${password}:${kdAplikasi}`;
    return btoa(credentials);
  };

  const handleSearch = async (searchType, searchValue) => {
    let baseUrl = "https://apijkn-dev.bpjs-kesehatan.go.id";
    let serviceName = "pcare-rest-dev";
    let apiUrl = `${baseUrl}/${serviceName}/peserta/${searchType}/${searchValue}`;

    const selectedPpk = ppkData[0];
    const {
      consid,
      consumerSecret,
      userKeyPcare,
      usernamePcare,
      passwordPcare,
      kdAplikasi,
    } = selectedPpk;

    const timestamp = generateTimestamp();
    const signature = generateSignature(consid, timestamp, consumerSecret);
    const authorization = generateAuthorization(
      usernamePcare,
      passwordPcare,
      kdAplikasi
    );

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-cons-id": consid,
          "X-timestamp": timestamp,
          "X-signature": signature,
          "X-authorization": authorization,
          user_key: userKeyPcare,
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
      console.log("Nothing searching patient in Server BPJS:");
      console.log("Try to catch in server klinik!");
      try {
        const response = await axios.get(`/pasiens/nobpjs/${searchValue}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response.data) {
          setExistingPatient(response.data);
        } else {
          setExistingPatient(null);
        }
      } catch (error) {
        console.error("Error searching patient:", error);
      }
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
          <FormComponent existingPatient={existingPatient} />
        </div>
      </div>
    </>
  );
};

export default Administrasi;
