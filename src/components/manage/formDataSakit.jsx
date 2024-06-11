import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormDataSakit = () => {
  const [formData, setFormData] = useState({
        No: 1,
        NRP: "",
        Nama: "",
        Pangkat: "",
        SatuanKerja: "",
        JenisSakit: "",
        JenisPerawatan: "",
        SumberBiaya: "",
        AwalSakit: "",
        LamaCuti: "",
        WFH: "",
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
    navigate("/manage/");
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
        <div className='w-full my-4 flex gap-4'>
        <div className="mb-4 w-1/3">
          <label className="block text-gray-700">Jenis Penyakit</label>
          <select
            name="jenisPenyakit"
            value={formData.JenisSakit}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Pilih penyakit</option>
            <option value="Stroke">Stroke</option>
            <option value="Kangker">Kangker</option>
            <option value="Jantung">Jantung</option>
            <option value="Ginjal">Ginjal</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        <div className="mb-4 w-1/3">
          <label className="block text-gray-700">Jenis Perawatan</label>
          <select
            name="jenisPerawatan"
            value={formData.JenisPerawatan}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Pilih perawatan</option>
            <option value="Rawat di RS">Rawat di RS</option>
            <option value="Rawat di Rumah">Rawat di Rumah</option>
            <option value="Rawat jalan">Rawat jalan</option>
          </select>
        </div>
        </div>
        <div className='w-full my-4 flex gap-4'>
        <div className="mb-4 w-1/3">
          <label className="block text-gray-700">Lama Cuti</label>
          <select
            name="lamaCuti"
            value={formData.LamaCuti}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Pilih Lama Cuti</option>
            <option value="Cuti ke-1">Cuti ke-1</option>
            <option value="Cuti ke-2">Cuti ke-2</option>
            <option value="Cuti ke-3">Cuti ke-3</option>
            <option value="Cuti ke-4">Cuti ke-4</option>
            <option value="Cuti ke-5">Cuti ke-5</option>
            <option value="Cuti ke-6">Cuti ke-6</option>
          </select>
        </div>
        <div className="mb-4 w-1/3">
          <label className="block text-gray-700">Awal Sakit</label>
          <input
            type="date"
            name="awalSakit"
            value={formData.AwalSakit}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Masukkan awal sakit"
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
        <div>

        <div className="mb-4">
          <label className="block text-gray-700">WFH</label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                name="wfh"
                value="Ya"
                checked={formData.wfh === 'Ya'}
                onChange={handleChange}
              />{' '}
              Ya
            </label>
            <label>
              <input
                type="radio"
                name="wfh"
                value="Tidak"
                checked={formData.wfh === 'Tidak'}
                onChange={handleChange}
                />{' '}
              Tidak
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sumber Biaya</label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                name="sumberBiaya"
                value="BPJS"
                checked={formData.sumberBiaya === 'BPJS'}
                onChange={handleChange}
                />{' '}
              BPJS
            </label>
            <label>
              <input
                type="radio"
                name="sumberBiaya"
                value="Non-BPJS"
                checked={formData.sumberBiaya === 'Non-BPJS'}
                onChange={handleChange}
                />{' '}
              Non-BPJS
            </label>
          </div>
        </div>
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

