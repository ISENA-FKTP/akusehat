import { Menu } from "@headlessui/react";
import "tailwindcss/tailwind.css";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../useAxios";

const TambahObat = () => {
  const axiosInstance = useAxios();
  const token = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    namaobat: "",
    jumlahobat: "",
    tglmasuk: "",
    tglkadaluarsa: "",
    nobatch: "",
    kategori: "",
    jenisobat: "",
    hargaobat: "",
    jenisobatLainnya: "", // untuk menyimpan jenis obat lainnya
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Menggunakan nilai dari jenisobatLainnya jika jenisobat adalah "Jenis Lainnya"
    const dataToSubmit = {
      ...formData,
<<<<<<< HEAD
      jenisobat: formData.jenisobat === "Jenis Lainnya" ? formData.jenisobatLainnya : formData.jenisobat,
=======
      jenisobat:
        formData.jenisobat === "Jenis Lainnya"
          ? formData.jenisobatLainnya
          : formData.jenisobat,
>>>>>>> e4373c028260050104f5f047260dcd9062f50250
    };

    Swal.fire({
      title: "Simpan Data?",
      text: "Apakah Anda yakin ingin menyimpan data obat ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Simpan!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
<<<<<<< HEAD
          const response = await axiosInstance.post("/dataobats", dataToSubmit, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
=======
          const response = await axiosInstance.post(
            "/dataobats",
            dataToSubmit,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
>>>>>>> e4373c028260050104f5f047260dcd9062f50250

          if (response.status === 201) {
            Swal.fire("Data obat telah disimpan!", "", "success");
          } else {
            Swal.fire("Unexpected response status!", "", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error",
            "Terjadi kesalahan saat mengirim permintaan",
            error
          );
        }
      }
    });
  };

  return (
    <div className="">
      {/* Sidebar */}
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <Header
        title="Tambah Obat Baru"
        userName="Rifki Rusdi Satma Putra"
        userStatus="Apoteker"
        profilePicture="/logo.png"
      />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Masukkan Data Obat</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-base font-bold mb-2">
              Nama Obat
            </label>
            <input
              type="text"
              name="namaobat"
              value={formData.namaobat}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-base font-bold mb-2">
              Jumlah Obat
            </label>
            <input
              type="number"
              name="jumlahobat"
              value={formData.jumlahobat}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-black text-base font-bold mb-2">
              Tanggal Masuk Obat
            </label>
            <div className="flex items-center">
              <input
                type="date"
                name="tglmasuk"
                value={formData.tglmasuk}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-black text-base font-bold mb-2">
              Tanggal Kadaluarsa
            </label>
            <div className="flex items-center">
              <input
                type="date"
                name="tglkadaluarsa"
                value={formData.tglkadaluarsa}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-black text-base font-bold mb-2">
              No Batch
            </label>
            <input
              type="text"
              name="nobatch"
              value={formData.nobatch}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-base font-bold mb-2">
              Kategori
            </label>
            <Menu as="div" className="relative">
              <Menu.Button className="shadow appearance-none border rounded w-full py-2 px-4 text-left text-black leading-tight focus:outline-none focus:shadow-outline">
                {formData.kategori || "Pilih Kategori"}
              </Menu.Button>
              <Menu.Items className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {[
                  "Alkes Habis Pakai",
                  "Obat Cair",
                  "Obat Padat",
                  "Obat Lainnya",
                ].map((kategori) => (
                  <Menu.Item key={kategori}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? "bg-secondary-400 text-white" : "text-black"
                        } px-4 py-2 cursor-pointer`}
                        onClick={() => setFormData({ ...formData, kategori })}
                      >
                        {kategori}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
          <div className="mb-4">
            <label className="block text-black text-base font-bold mb-2">
              Jenis
            </label>
            <Menu as="div" className="relative">
              <Menu.Button className="shadow appearance-none border rounded w-full py-2 px-4 text-left text-black leading-tight focus:outline-none focus:shadow-outline">
                {formData.jenisobat || "Pilih Jenis"}
              </Menu.Button>
              <Menu.Items className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
<<<<<<< HEAD
                {["Tablet", "Syrup", "Krim", "Jenis Lainnya"].map((jenisobat) => (
                  <Menu.Item key={jenisobat}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? "bg-secondary-400 text-white" : "text-black"
                        } px-4 py-2 cursor-pointer`}
                        onClick={() =>
                          setFormData({ ...formData, jenisobat })
                        }
                      >
                        {jenisobat}
                      </div>
                    )}
                  </Menu.Item>
                ))}
=======
                {["Tablet", "Syrup", "Krim", "Jenis Lainnya"].map(
                  (jenisobat) => (
                    <Menu.Item key={jenisobat}>
                      {({ active }) => (
                        <div
                          className={`${
                            active
                              ? "bg-secondary-400 text-white"
                              : "text-black"
                          } px-4 py-2 cursor-pointer`}
                          onClick={() =>
                            setFormData({ ...formData, jenisobat })
                          }
                        >
                          {jenisobat}
                        </div>
                      )}
                    </Menu.Item>
                  )
                )}
>>>>>>> e4373c028260050104f5f047260dcd9062f50250
              </Menu.Items>
            </Menu>
            {formData.jenisobat === "Jenis Lainnya" && (
              <input
                type="text"
                name="jenisobatLainnya"
                value={formData.jenisobatLainnya}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline mt-2"
                placeholder="Masukkan jenis obat lainnya"
                required
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black text-base font-bold mb-2">
              Harga Obat
            </label>
            <input
              type="number"
              name="hargaobat"
              value={formData.hargaobat}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-success-500 hover:bg-success-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahObat;
