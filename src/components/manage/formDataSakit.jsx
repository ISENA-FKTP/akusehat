import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataSakit, showFormattedDate } from "../../views/manage/model/dataSakit";

export const FormDataSakit = () => {
  const [data, setData] = useState([]);
  const [dataNrp, setNrp] = useState([]);

  const [formData, setFormData] = useState({
    nrp: "",
    nama: "",
    pangkat: "",
    satuan_kerja: "",
    jenis_sakit: "",
    jenis_perawatan: "",
    sumber_biaya: "",
    awal_sakit: "",
    lama_cuti: "",
    WFH: "",
    Keterangan: "",
  });

  useEffect(() => {
    DataSakit.getDataSakit().then((data) => {
      setData(data);
    });
  }, []);


  useEffect(() =>{
    const filteredData = data.filter((data) =>data.nrp === dataNrp );

    if(filteredData.length === 1){
      setFormData({
        ...formData,
        nama: filteredData[0].nama,
        pangkat: filteredData[0].pangkat,
        satuan_kerja: filteredData[0].satuan_kerja,
      });
    }else{
      setFormData({
        ...formData,
        nama: "",
        pangkat: "",
        satuan_kerja: "",
      });
    }
  }, [dataNrp]);

  const navigate = useNavigate();

  const handleNrpChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setNrp(value);
  };

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
    const date = showFormattedDate(new Date().toISOString());
    DataSakit.setDataSakit(formData.nrp, date, formData.jenis_sakit, formData.jenis_perawatan, formData.sumber_biaya, formData.awal_sakit, formData.lama_cuti, formData.WFH, formData.Keterangan);
    navigate("/manage/");
  };

  return (
    <div className="w-full h-max rounded-md border-3  shadow overflow-auto">
      <div className=" pt-2 pl-4  w-full bg-secondary-300">
        <h3 className="text-xl mb-6">Data Pegawai Sakit</h3>
      </div>
      <form className="px-5 pb-5" onSubmit={handleSubmit}>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">NRP</label>
            <input
              type="text"
              name="nrp"
              value={formData.nrp}
              onChange={handleNrpChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan NRP"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Nama pegawai"
              disabled
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Pangkat</label>
            <input
              type="text"
              name="pangkat"
              value={formData.pangkat}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Pangkat"
              disabled
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Satuan Kerja</label>
            <input
              type="text"
              name="satuan_kerja"
              value={formData.satuan_kerja}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Satuan kerja"
              disabled
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Jenis Penyakit</label>
            <select
              name="jenis_sakit"
              value={formData.jenis_sakit}
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
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Jenis Perawatan</label>
            <select
              name="jenis_perawatan"
              value={formData.jenis_perawatan}
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
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Lama Cuti</label>
            <select
              name="lama_cuti"
              value={formData.lama_cuti}
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
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Awal Sakit</label>
            <input
              type="date"
              name="awal_sakit"
              value={formData.awal_sakit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan awal sakit"
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-7">
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Keterangan</label>
            <textarea
              name="Keterangan"
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
                    name="WFH"
                    value="Ya"
                    checked={formData.WFH === "Ya"}
                    onChange={handleChange}
                  />{" "}
                  Ya
                </label>
                <label>
                  <input
                    type="radio"
                    name="WFH"
                    value="Tidak"
                    checked={formData.WFH === "Tidak"}
                    onChange={handleChange}
                  />{" "}
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
                    name="sumber_biaya"
                    value="BPJS"
                    checked={formData.sumber_biaya === "BPJS"}
                    onChange={handleChange}
                  />{" "}
                  BPJS
                </label>
                <label>
                  <input
                    type="radio"
                    name="sumber_biaya"
                    value="Non-BPJS"
                    checked={formData.sumber_biaya === "Non-BPJS"}
                    onChange={handleChange}
                  />{" "}
                  Non-BPJS
                </label>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-1/2 bg-primary-500 text-white py-2 rounded-md"
        >
          Tambah Data
        </button>
      </form>
    </div>
  );
};
