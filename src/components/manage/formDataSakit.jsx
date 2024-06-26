import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../useAxios";

const FormDataSakit = () => {
  const [formData, setFormData] = useState({
    nrp: "",
    namapegawai: "",
    pangkat: "",
    satuankerja: "",
    jenis_sakit: "",
    jenis_perawatan: "",
    sumber_biaya: "",
    awal_sakit: "",
    lama_cuti: "",
    WFH: "",
    Keterangan: "",
    pegawaiId: "",
  });

  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleNrpChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNrpKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await fetchData(formData.nrp);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchData = async (nrp) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axiosInstance.get(`/pegawais/nonrp/${nrp}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const foundData = response.data[0];

      if (foundData) {
        setFormData({
          ...formData,
          namapegawai: foundData.namapegawai,
          pangkat: foundData.pangkat,
          satuankerja: foundData.satuankerja,
          pegawaiId: foundData.id,
        });
        Swal.fire({
          icon: "success",
          title: "Data ditemukan",
          text: "Data pegawai ditemukan.",
        });
      } else {
        setFormData({
          ...formData,
          namapegawai: "",
          pangkat: "",
          satuankerja: "",
        });
        throw new Error("Data pegawai tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat memproses permintaan.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      await fetchData(formData.nrp);
      await addSickData(token);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Data tidak ditemukan",
          text: "Data pegawai tidak ditemukan. Apakah ingin menambahkan pegawai baru?",
          showCancelButton: true,
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const addEmployeeResponse = await axiosInstance.post(
                "/pegawais",
                {
                  nrp: formData.nrp,
                  namapegawai: formData.namapegawai,
                  pangkat: formData.pangkat,
                  satuankerja: formData.satuankerja,
                  pegawaiId: formData.id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (addEmployeeResponse.status === 201) {
                await addSickData(token);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Gagal",
                  text: "Gagal menambahkan data pegawai baru.",
                });
              }
            } catch (postError) {
              console.error("Error adding employee:", postError);
              Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Terjadi kesalahan saat menambahkan pegawai.",
              });
            }
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat memproses permintaan.",
        });
      }
    }
  };

  const addSickData = async (token) => {
    try {
      const addSakitResponse = await axiosInstance.post(
        "/datasakits",
        {
          jenispenyakit: formData.jenis_sakit,
          jenisperawatan: formData.jenis_perawatan,
          lamacuti: formData.lama_cuti,
          awalsakit: formData.awal_sakit,
          keterangan: formData.Keterangan,
          WFH: formData.WFH,
          sumberbiaya: formData.sumber_biaya,
          pegawaiId: formData.pegawaiId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (addSakitResponse.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data Sakit Pegawai Berhasil Dimasukkan!",
        });
        navigate("/manage/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menambahkan data sakit pegawai.",
        });
      }
    } catch (error) {
      console.error("There was an error!", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat memproses permintaan.",
      });
    }
  };

  console.log(formData);
  return (
    <div className="w-full h-max rounded-md border-3 shadow overflow-auto">
      <div className="pt-2 pl-4 w-full bg-secondary-300">
        <h3 className="text-xl mb-6">Data Pegawai Sakit</h3>
      </div>
      <form className="px-5 pb-5" onSubmit={handleSubmit}>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">NRP</label>
            <input
              type="number"
              name="nrp"
              value={formData.nrp}
              onChange={handleNrpChange}
              onKeyDown={handleNrpKeyDown}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan NRP"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Nama pegawai</label>
            <input
              name="namapegawai"
              value={formData.namapegawai}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Nama pegawai"
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Pangkat</label>
            <input
              name="pangkat"
              value={formData.pangkat}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Pangkat"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-gray-700">Satuan Kerja</label>
            <input
              name="satuankerja"
              value={formData.satuankerja}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Satuan kerja"
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
              <option value="Kanker">Kanker</option>
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

export default FormDataSakit;
