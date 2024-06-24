import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DataSakit,
  showFormattedDate,
} from "../../views/manage/model/dataSakit";

export const FormDataHomeVisit = () => {
  const [data, setData] = useState([]);
  const [dataNrp, setNrp] = useState([]);

  const [formData, setFormData] = useState({
    nrp: "",
    nama: "",
    pangkat: "",
    satuan_kerja: "",
    keluhan: "",
    pemeriksaan_fisik: "",
    diagnosa: "",
    terapi: "",
    saran_medis: "",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const { nrp, keluhan, pemeriksaan_fisik, diagnosa, terapi, saran_medis } =
      formData;
    const date = showFormattedDate(new Date().toISOString());
    DataSakit.setDataHomeVisit(
      nrp,
      date,
      keluhan,
      pemeriksaan_fisik,
      diagnosa,
      terapi,
      saran_medis
    );
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
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">keluhan</label>
            <textarea
              name="keluhan"
              value={formData.keluhan}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan keluhan"
            />
          </div>
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">Pemeriksaan Fisik</label>
            <textarea
              name="pemeriksaan_fisik"
              value={formData.pemeriksaan_fisik}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan hasil pemeriksaan"
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">diagnosa</label>
            <textarea
              name="diagnosa"
              value={formData.diagnosa}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan hasil diagnosa"
            />
          </div>
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">terapi</label>
            <textarea
              name="terapi"
              value={formData.terapi}
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
              name="saran_medis"
              value={formData.saran_medis}
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
