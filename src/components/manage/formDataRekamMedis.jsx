import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormDataRekamMedis = () => {
  const [formData, setFormData] = useState({
        No: 1,
        NRP: "",
        Nama: "",
        Pangkat: "",
        SatuanKerja: "",
        Keterangan: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
    navigate("/manage/d/manage/data-rekam-medis");
  };

  return (
    <div className="w-full h-max rounded-md border-3  shadow overflow-auto">
      <div className=' pt-2 pl-4  w-full bg-secondary-300'>
        <h3 className="text-xl mb-6">Data Pegawai Sakit</h3>
      </div>
      <form className="px-5 pb-5" onSubmit={handleSubmit}>
        <div className='w-full my-4 flex gap-4'>
            <div className="mb-4 w-1/3">
                <label className="block text-gray-700">NRP</label>
                <input
                    type="text"
                    name="nrp"
                    value={formData.NRP}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Masukkan NRP"
                    />
            </div>
            <div className="mb-4 w-1/3">
            <label className="block text-gray-700">Nama</label>
            <input
                type="text"
                name="nama"
                value={formData.Nama}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Nama pegawai"
                />
            </div>
        </div>
        <div className='w-full my-4 flex gap-4'>
            <div className="mb-4 w-1/3">
                <label className="block text-gray-700">Pangkat</label>
                <input
                    type="text"
                    name="pangkat"
                    value={formData.Pangkat}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Pangkat"
                />
            </div>
            <div className="mb-4 w-1/3">
                <label className="block text-gray-700">Satuan Kerja</label>
                <input
                    type="text"
                    name="satuanKerja"
                    value={formData.SatuanKerja}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Satuan kerja"
                />
            </div>
        </div>
        <div className='w-full my-4 flex gap-7'>
        <div className="mb-4 w-1/3">
          <label className="block text-gray-700">Keterangan</label>
          <textarea
            name="keterangan"
            value={formData.Keterangan}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Masukkan keterangan"
          ></textarea>
        </div>
        </div>
        <button
          type="submit"
          className="w-1/3 bg-primary-500 text-white py-2 rounded-md"
        >
          Tambah Data
        </button>
      </form>
    </div>
  );
};

