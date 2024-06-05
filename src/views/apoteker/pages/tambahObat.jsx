import { Menu } from "@headlessui/react";
import "tailwindcss/tailwind.css";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import { useState } from "react";

const TambahObat = () => {
  const [formData, setFormData] = useState({
    medicineName: "",
    quantity: "",
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
    console.log(formData);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <Header
        title="Statistik Data Laporan"
        userName="Rifki Rusdi Satma Putra"
        userStatus="Kepala Polisi"
        profilePicture="/logo.png"
      />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Tambah Obat</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Nama Obat
            </label>
            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Jumlah Obat
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-black text-sm font-bold mb-2">
              Tanggal Kadaluarsa
            </label>
            <div className="flex items-center">
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              No Batch
            </label>
            <input
              type="text"
              name="batchNo"
              value={formData.batchNo}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Kategori
            </label>
            <Menu as="div" className="relative">
              <Menu.Button className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
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
            <label className="block text-black text-sm font-bold mb-2">
              Jenis
            </label>
            <Menu as="div" className="relative">
              <Menu.Button className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
                {formData.type || "Pilih Jenis"}
              </Menu.Button>
              <Menu.Items className="absolute mt-1 w-full bg-whites border border-gray-200 rounded-md shadow-lg z-10">
                {["Tablet", "Syrup", "Krim"].map((type) => (
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
            <label className="block text-black text-sm font-bold mb-2">
              Harga
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-secondary-500 hover:bg-secondary-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs"
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
