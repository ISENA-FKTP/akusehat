import Sidebar_Klinik from "../../components/klinik/sidebar_klinik";
import Header from "../../components/header";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAxios from "../../useAxios";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  // const axiosInstance = useAxios();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const accessToken = localStorage.getItem("accessToken");
  //       if (!accessToken) {
  //         navigate("/");
  //         return;
  //       }
  //       if (accessToken) {
  //         const decoded = jwtDecode(accessToken);
  //         setEmail(decoded.email);
  //       } else {
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching token:", error);
  //       navigate("/");
  //     }
  //   };

  //   fetchData();
  // }, [axiosInstance, navigate]);

  return (
    <>
      <div className="fixed z-50">
        <Sidebar_Klinik />
      </div>
      <Header
        title="Pendaftaran Pelayanan Pasien"
        userName={email}
        userStatus="Dokter Poli Umum"
        profilePicture="logo.png"
      />
      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <img
            src="/backdash.png"
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-55"></div>
        <div className="absolute inset-0 bg-primary-950 bg-opacity-20"></div>
        <div className="relative z-10 flex items-center h-screen">
          <div className="mx-32">
            <h3 className="text-secondary-400 text-7xl font-primary-Poppins font-extrabold">
              Selamat Datang
            </h3>
            <div className="text-white text-6xl font-primary-Poppins font-extrabold mb-6">
              <h3>ISENA-FKTP</h3>
            </div>
            <div className="text-secondary-400 text-2xl font-primary-Poppins font-extrabold">
              <h3>
                <p>
                  Solusi Manajemen Data Apotik dan Kesehatan Polisi Polda NTB
                </p>
              </h3>
            </div>
            <div className="text-white text-1xl font-primary-Poppins mb-10">
              <p className="leading-relaxed">
                ISENA-FKTP adalah platform digital inovatif untuk pengelolaan
                data apotik dan riwayat kesehatan personel <br />
                kepolisian di Polda NTB. Kami menawarkan fitur lengkap untuk
                mengelola stok obat, resep, serta mencatat <br />
                dan memantau riwayat medis dengan mudah dan aman.
              </p>
            </div>
            <div>
              <div className="flex-row">
                <button
                  className="text-white bg-secondary-500 px-10 py-2 rounded-md hover:bg-secondary-600"
                  onClick={() => navigate("/administrasi")}
                >
                  Mulai
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
