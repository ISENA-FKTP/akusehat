import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../useAxios";
import Swal from "sweetalert2";

export const FormDataRekamMedis = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    nrp: "",
    namapegawai: "",
    pangkat: "",
    satuankerja: "",
    keterangan: "",
    filerekammedis:
      "https://kki.go.id/uploads/media/1683690349_52608b7cd44a11a99d43.pdf",
  });

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

  const handleFileChange = () => {
    setSelectedFile(
      "https://statik.tempo.co/data/2019/01/29/id_815619/815619_720.jpg"
    );
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
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      await fetchData(formData.nrp);
      const pegawaiId = formData.pegawaiId;
      await addSickData(token, pegawaiId);
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
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (addEmployeeResponse.status === 201) {
                const response = await axiosInstance.get(
                  `/pegawais/nonrp/${formData.nrp}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                const pegawaiId = response.data[0].id;
                await addSickData(token, pegawaiId);
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

  const addSickData = async (token, pegawaiId) => {
    try {
      const addSakitResponse = await axiosInstance.post(
        "/datarekammedis",
        {
          pegawaiId: pegawaiId,
          filerekammedis: formData.filerekammedis,
          keterangan: formData.keterangan,
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
          text: "Data Hasil Kunjungan Pegawai Berhasil Dimasukkan!",
        });
        navigate("/manage/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menambahkan data hasil kunjungan pegawai.",
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

  return (
    <div className="w-full h-max rounded-md border-3  shadow overflow-auto">
      <div className=" pt-2 pl-4  w-full bg-secondary-300">
        <h3 className="text-xl mb-6">Data Rekam Medis</h3>
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
              onKeyDown={handleNrpKeyDown}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan nrp"
            />
          </div>
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">Nama</label>
            <input
              type="text"
              name="namapegawai"
              value={formData.namapegawai}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="nama pegawai"
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-4">
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">Pangkat</label>
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
              name="satuankerja"
              value={formData.satuankerja}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Satuan kerja"
            />
          </div>
        </div>
        <div className="w-full my-4 flex gap-7">
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700">Keterangan</label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan keterangan"
            ></textarea>
          </div>
          <div className="mb-4 w-1/3">
            <label className="block text-gray-700" htmlFor="fileInput">
              Upload File:
            </label>
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
