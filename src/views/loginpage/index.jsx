import { useState, useEffect } from "react";
import coverImage from "./cover.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [msg, setMsg] = useState("");
  const [navigateRoute, setNavigateRoute] = useState("");
  const navigate = useNavigate();

  const roles = ["Admin", "Apoteker", "Dokter", "Pegawai", "Kepala Bidang"];

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { username, password });

      console.log("Login response:", response.data);

      const { accessToken, refreshToken } = response.data;
      console.log("Access Token:", accessToken);

      const decoded = jwtDecode(accessToken);
      console.log("Decoded Token:", decoded);

      if (decoded.role.toLowerCase() === role.toLowerCase()) {
        // Only store tokens if the roles match
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        console.log("Axios Authorization:", axios.defaults.headers.common);

        switch (role.toLowerCase()) {
          case "admin":
            setNavigateRoute("/dashboard_klinik");
            break;
          case "apoteker":
            setNavigateRoute("/dashboard_apotek");
            break;
          case "dokter":
            setNavigateRoute("/dashboard_dokter");
            break;
          case "pegawai":
            setNavigateRoute("/manage");
            break;
          case "kepala bidang":
            setNavigateRoute("/statistik");
            break;
          default:
            setNavigateRoute("/");
            break;
        }
      } else {
        setMsg("Akses Ditolak, Silahkan Masukan Akun dengan Role yang benar.");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response:", error.response.data);
        setMsg(error.response.data.msg);
      } else {
        console.error("Error:", error.message);
        setMsg("Login gagal, silakan coba lagi.");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      const userRole = decoded.role.toLowerCase();

      switch (userRole) {
        case "admin":
          navigate("/dashboard_klinik");
          break;
        case "apoteker":
          navigate("/dashboard_apotek");
          break;
        case "dokter":
          navigate("/dashboard_dokter");
          break;
        case "pegawai":
          navigate("/manage");
          break;
        case "kepala bidang":
          navigate("/statistik");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (navigateRoute) {
      navigate(navigateRoute);
    }
  }, [navigateRoute, navigate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Bagian Kiri: Gambar Cover */}
      <div className="hidden md:flex items-center justify-center bg-warning-100">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bagian Kanan: Formulir Login */}
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-4/6 max-w-2xl p-10 bg-white shadow-2xl rounded-lg">
          <h1 className="text-2xl font-bold text-center text-primary-500">
            Masukan Akun Administrasi Anda!
          </h1>
          <p className="mb-2 text-center text-gray-600">
            Selamat Datang dan Selamat Mengelola Data Anda!
          </p>

          {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}

          <form onSubmit={Auth} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkbox: Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            {/* Tombol Login */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
