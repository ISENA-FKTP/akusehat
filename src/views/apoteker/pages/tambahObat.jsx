import { Menu } from "@headlessui/react";
import "tailwindcss/tailwind.css";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import { useState } from "react";
import Swal from "sweetalert2";

const TambahObat = () => {
  const [formData, setFormData] = useState({
    medicineName: "",
    quantity: "",
    entryDate: "",
    expiryDate: "",
    batchNo: "",
    category: "",
    type: "",
    price: "",
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
    Swal.fire({
      title: "Simpan Data?",
      text: "Apakah Anda yakin ingin menyimpan data obat ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Simpan!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Data obat telah disimpan!", "", "success");
      }
    });
  };

  return (
    <div>
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
              name="medicineName"
              value={formData.medicineName}
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
              name="quantity"
              value={formData.quantity}
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
                name="entryDate"
                value={formData.entryDate}
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
                name="expiryDate"
                value={formData.expiryDate}
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
              name="batchNo"
              value={formData.batchNo}
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
                {formData.category || "Pilih Kategori"}
              </Menu.Button>
              <Menu.Items className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {[
                  "Alkes Habis Pakai",
                  "Obat Cair",
                  "Obat Padat",
                  "Obat Lainnya",
                ].map((category) => (
                  <Menu.Item key={category}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? "bg-secondary-400 text-white" : "text-black"
                        } px-4 py-2 cursor-pointer`}
                        onClick={() => setFormData({ ...formData, category })}
                      >
                        {category}
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
                {formData.type || "Pilih Jenis"}
              </Menu.Button>
              <Menu.Items className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {["Tablet", "Syrup", "Krim", "PCS"].map((type) => (
                  <Menu.Item key={type}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? "bg-secondary-400 text-white" : "text-black"
                        } px-4 py-2 cursor-pointer`}
                        onClick={() => setFormData({ ...formData, type })}
                      >
                        {type}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
          <div className="mb-4">
            <label className="block text-black text-base font-bold mb-2">
              Harga
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
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
