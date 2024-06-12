import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataSakit, showFormattedDate } from "../../views/manage/model/dataSakit";


export const FormDataRekamMedis = () => {
  const [data, setData] = useState([]);
  const [dataNrp, setNrp] = useState([]);

  const [formData, setFormData] = useState({
    nrp: "",
    nama: "",
    pangkat: "",
    satuan_kerja: "",
    Keterangan: "",
  });

  useEffect(() => {
    DataSakit.getDataSakit().then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    const filteredData = data.filter((data) => data.nrp === dataNrp);

    if (filteredData.length === 1) {
      setFormData({
        ...formData,
        nama: filteredData[0].nama,
        pangkat: filteredData[0].pangkat,
        satuan_kerja: filteredData[0].satuan_kerja,
      });
    } else {
      setFormData({
        ...formData,
        nama: "",
        pangkat: "",
        satuan_kerja: "",
      });
    }
  }, [dataNrp]);

  const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

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
    DataSakit.setDataRekamMedis(formData.nrp, date, formData.Keterangan, "http://example.com")
    navigate("/manage/data-rekam-medis");
  };

  return (
    <div className="w-full h-max rounded-md border-3  shadow overflow-auto">
      <div className=" pt-2 pl-4  w-full bg-secondary-300">
        <h3 className="text-xl mb-6">Data Pegawai Sakit</h3>
      </div>
      <form className="px-5 pb-5" onSubmit={handleSubmit}>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">nrp</label>
            <input
              type="text"
              name="nrp"
              value={formData.nrp}
              onChange={handleNrpChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan nrp"
            />
          </div>
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="nama pegawai"
              disabled
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">pangkat</label>
            <input
              type="text"
              name="pangkat"
              value={formData.pangkat}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="pangkat"
              disabled
            />
          </div>
          <div className="mb-4 w-1/3">
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
        <div className="w-full my-4 flex gap-7">
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">Keterangan</label>
            <textarea
              name="Keterangan"
              value={formData.Keterangan}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan keterangan"
            ></textarea>
          </div>
          <div className="mb-4 w-1/3">
                <label className="block text-gray-700" htmlFor="fileInput">Upload File:</label>
                <input type="file" id="fileInput" onChange={handleFileChange} />
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
