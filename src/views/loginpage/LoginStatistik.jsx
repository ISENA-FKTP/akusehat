import React from 'react'
import coverImage from './cover.png'; 

const LoginStatistik = () => {
    return (
        <div className="grid grid-cols-2 h-screen">
          {/* Bagian Kiri: Gambar Cover */}
          <div className="flex items-center justify-center bg-yellow-100">
            <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
          </div>
    
          {/* Bagian Kanan: Formulir Login */}
          <div className="flex items-center justify-center">
          <div className="w-5/6 max-w-lg p-10 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center" style={{ color: '#5726FF' }}>Masukan Akun Manage Anda!</h1>
            <p className="mb-4 text-center">Selamat Datang dan Selamat Mengelola Data Anda!</p>
    
    
              <form className="space-y-6">
                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
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
                <div >
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
}

export default LoginStatistik
