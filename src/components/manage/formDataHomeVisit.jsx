import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormDataHomeVisit = () => {
  const [formData, setFormData] = useState({
    No: 1,
    NRP: "",
    Nama: "",
    Pangkat: "",
    SatuanKerja: "",
    Keluhan: "",
    PemeriksaanFisik: "",
    Diagnosa: "",
    Terapi: "",
    SaranMedis: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
    navigate("/manage/data-home-visit");
  };

  return (
    <div className="w-full h-max rounded-md border-3  shadow overflow-auto">
      <div className=" pt-2 pl-4  w-full bg-secondary-300">
        <h3 className="text-xl mb-6">Data Pegawai Sakit</h3>
      </div>
      <form className="px-5 pb-5" onSubmit={handleSubmit}>
        <div className="w-full my-4 flex gap-4">
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
        <div className="w-full my-4 flex gap-4">
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
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">Keluhan</label>
            <textarea
              name="keluhan"
              value={formData.Keluhan}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan keluhan"
            />
          </div>
          <div className="mb-4 w-1/3">
          <label className="block text-gray-700">Pemeriksaan Fisik</label>
            <textarea
              name="pemeriksaanFisik"
              value={formData.PemeriksaanFisik}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan hasil pemeriksaan"
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/3">
          <label className="block text-gray-700">Diagnosa</label>
            <textarea
              name="diagnosa"
              value={formData.Diagnosa}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan hasil diagnosa"
            />
          </div>
          <div className="mb-4 w-1/3">
          <label className="block text-gray-700">Terapi</label>
            <textarea
              name="terapi"
              value={formData.Terapi}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan terapi yang diberikan"
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-7">
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">Saran Medis</label>
            <textarea
              name="saranMedis"
              value={formData.SaranMedis}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan saran medis yang diberikan"
            />
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
