import React, { useState } from 'react';
import coverImage from './cover.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-isenafktp.onrender.com/login', {
        username: username,
        password: password
      });

      const token = response.data.accessToken;
      const decoded = jwtDecode(token);

      if (decoded.role === 'dokter') {
        navigate('/kajiawal');
      } else {
        setMsg('Akses Ditolak, Silahkan Masukan Akun Dokter.');
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Bagian Kiri: Gambar Cover */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-500">
        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
      </div>

      {/* Bagian Kanan: Formulir Login */}
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-4/6 max-w-2xl p-10 bg-white shadow-2xl rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
            <Link to="/adminlog" className="flex-1">
              <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Admin
              </button>
            </Link>
            <Link to="/dokterlog" className="flex-1">
              <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Dokter
              </button>
            </Link>
            <Link to="/apotekerlog" className="flex-1">
              <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Apoteker
              </button>
            </Link>
            <Link to="/pawaslog" className="flex-1">
              <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Pegawai
              </button>
            </Link>
            <Link to="/statistiklog" className="flex-1">
              <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Manage
              </button>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-center text-blue-600">Masukan Akun Dokter Anda!</h1>
          <p className="mb-6 text-center text-gray-600">Selamat Datang dan Selamat Mengelola Data Anda!</p>

          {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}

          <form onSubmit={Auth} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='*******'
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Checkbox: Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            {/* Tombol Login */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
