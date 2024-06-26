/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const Pengingat = () => {
  const [medicines, setMedicines] = useState([]);
  const [expiringMedicines, setExpiringMedicines] = useState([]);
  const [lowStockMedicines, setLowStockMedicines] = useState([]);
  const [expiringSortBy, setExpiringSortBy] = useState("most");
  const [lowStockSortBy, setLowStockSortBy] = useState("most");
  const [expiringSearchTerm, setExpiringSearchTerm] = useState("");
  const [lowStockSearchTerm, setLowStockSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReduceModalOpen, setIsReduceModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);

  const categories = [
    "Alkes Habis Pakai",
    "Obat Cair",
    "Obat Padat",
    "Obat Lainnya",
  ];
  const types = ["Tablet", "Syrup", "Krim", "PCS"];

  useEffect(() => {
    fetch("/data/medicine.json")
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
        filterMedicines(data);
      })
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  useEffect(() => {
    filterMedicines(medicines);
  }, [expiringSortBy, lowStockSortBy, medicines]);

  const filterMedicines = (medicinesToFilter) => {
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    const expiring = medicinesToFilter.filter((medicine) => {
      const expiryDate = new Date(medicine.expiryDate);
      return expiryDate <= sixMonthsLater;
    });

    const lowStock = medicinesToFilter.filter(
      (medicine) => medicine.quantity < 100
    );

    setExpiringMedicines(sortMedicines(expiring, expiringSortBy));
    setLowStockMedicines(sortMedicines(lowStock, lowStockSortBy));
  };

  const handleExpiringSortChange = (e) => {
    setExpiringSortBy(e.target.value);
  };

  const handleLowStockSortChange = (e) => {
    setLowStockSortBy(e.target.value);
  };

  const handleExpiringSearch = (e) => {
    setExpiringSearchTerm(e.target.value);
  };

  const handleLowStockSearch = (e) => {
    setLowStockSearchTerm(e.target.value);
  };

  const openEditModal = (medicine) => {
    setCurrentMedicine({ ...medicine });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentMedicine(null);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openReduceModal = () => {
    setIsReduceModalOpen(true);
  };

  const closeReduceModal = () => {
    setIsReduceModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentMedicine((prevMedicine) => ({
      ...prevMedicine,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const updatedMedicines = medicines.map((medicine) =>
      medicine.uuid === currentMedicine.uuid ? currentMedicine : medicine
    );
    setMedicines(updatedMedicines);
    filterMedicines(updatedMedicines);
    closeEditModal();

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Perubahan berhasil disimpan.",
    });
  };

  const handleDelete = () => {
    const updatedMedicines = medicines.filter(
      (medicine) => medicine.uuid !== currentMedicine.uuid
    );
    setMedicines(updatedMedicines);
    filterMedicines(updatedMedicines);
    closeEditModal();
    closeDeleteModal();

    Swal.fire({
      icon: "success",
      title: "Dihapus!",
      text: "Obat berhasil dihapus.",
    });
  };

  const sortMedicines = (medicinesToSort, sortBy) => {
    return sortBy === "most"
      ? [...medicinesToSort].sort((a, b) => b.quantity - a.quantity)
      : [...medicinesToSort].sort((a, b) => a.quantity - b.quantity);
  };

  const handleIncreaseQuantity = (medicineName) => {
    setCurrentMedicine(
      medicines.find((medicine) => medicine.medicineName === medicineName)
    );
    openAddModal();
  };

  const handleDecreaseQuantity = (medicineName) => {
    setCurrentMedicine(
      medicines.find((medicine) => medicine.medicineName === medicineName)
    );
    openReduceModal();
  };

  const handleAddQuantity = (quantityToAdd) => {
    const updatedMedicines = medicines.map((medicine) =>
      medicine.medicineName === currentMedicine.medicineName
        ? { ...medicine, quantity: medicine.quantity + quantityToAdd }
        : medicine
    );
    setMedicines(updatedMedicines);
    filterMedicines(updatedMedicines);
    closeAddModal();

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Jumlah obat berhasil ditambahkan.",
    });
  };

  const handleReduceQuantity = (quantityToReduce) => {
    const updatedMedicines = medicines.map((medicine) =>
      medicine.medicineName === currentMedicine.medicineName
        ? {
            ...medicine,
            quantity: Math.max(medicine.quantity - quantityToReduce, 0),
          }
        : medicine
    );
    setMedicines(updatedMedicines);
    filterMedicines(updatedMedicines);
    closeReduceModal();

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Jumlah obat berhasil dikurangi.",
    });
  };

  const filteredExpiringMedicines = expiringMedicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(expiringSearchTerm.toLowerCase())
  );

  const filteredLowStockMedicines = lowStockMedicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(lowStockSearchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header
          title="Pengingat Obat"
          userName="Rifki Rusdi Satma Putra"
          userStatus="Apoteker"
          profilePicture="/logo.png"
        />
        <div className="container mx-auto pl-5">
          <div className="flex justify-between mb-4 mt-5">
            <div>
              <label htmlFor="expiring-sort">Urutkan berdasarkan:</label>
              <select
                id="expiring-sort"
                value={expiringSortBy}
                onChange={handleExpiringSortChange}
                className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="most">Paling Banyak</option>
                <option value="least">Paling Sedikit</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Cari obat..."
                value={expiringSearchTerm}
                onChange={handleExpiringSearch}
                className="ml-2 px-2 py-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold">
            Obat yang Kadaluarsa dalam 6 Bulan
          </h2>
          <h3 className="text-xl font-semibold mb-3 text-secondary-500">
            Seluruh data terkait obat di Apotik memiliki kadaluarsa kurang dari
            6 bulan
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tl-lg">
                    Nama Obat
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Jumlah
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Kategori
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">Jenis</th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Entry Date
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Expiry Date
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">Harga</th>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tr-lg">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredExpiringMedicines.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      Tidak ada data obat yang sesuai
                    </td>
                  </tr>
                ) : (
                  filteredExpiringMedicines.map((medicine, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-primary-50" : "bg-primary-100"
                      }
                    >
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.medicineName}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center ">
                        {medicine.quantity}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.category}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.type}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.entryDate}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.expiryDate}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        Rp{medicine.price}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center flex items-center justify-center space-x-2">
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(medicine.medicineName)
                          }
                          className="p-2 rounded-md bg-primary-600 text-white"
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(medicine.medicineName)
                          }
                          className="p-2 rounded-md bg-primary-600 text-white"
                        >
                          <FaMinus />
                        </button>
                        <button
                          onClick={() => openEditModal(medicine)}
                          className="p-2 rounded-md bg-primary-600 text-white"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mb-4 mt-5">
            <div>
              <label htmlFor="sort">Urutkan berdasarkan:</label>
              <select
                id="sort"
                value={lowStockSortBy}
                onChange={handleLowStockSortChange}
                className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="most">Paling Banyak</option>
                <option value="least">Paling Sedikit</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Cari obat..."
                value={lowStockSearchTerm}
                onChange={handleLowStockSearch}
                className="ml-2 px-2 py-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold">
            Obat dengan Stok Kurang dari 100
          </h2>
          <h3 className="text-xl font-semibold mb-3 text-secondary-500">
            Seluruh data terkait stok obat di Apotik kurang dari 100
          </h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tl-lg">
                    Nama Obat
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Jumlah
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Kategori
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">Jenis</th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Entry Date
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Expiry Date
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">Harga</th>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tr-lg">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLowStockMedicines.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      Tidak ada data obat yang sesuai
                    </td>
                  </tr>
                ) : (
                  filteredLowStockMedicines.map((medicine, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-primary-50" : "bg-primary-100"
                      }
                    >
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.medicineName}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.quantity}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.category}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.type}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.entryDate}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        {medicine.expiryDate}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center">
                        Rp{medicine.price}
                      </td>
                      <td className="border border-primary-600 px-4 py-2 text-center flex items-center justify-center space-x-2">
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(medicine.medicineName)
                          }
                          className="p-2 rounded-md bg-primary-600 text-white"
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(medicine.medicineName)
                          }
                          className="p-2 rounded-md bg-primary-600 text-white"
                        >
                          <FaMinus />
                        </button>
                        <button
                          onClick={() => openEditModal(medicine)}
                          className="p-2 rounded-md bg-primary-600 text-white"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isEditModalOpen && (
          <EditModal
            medicine={currentMedicine}
            handleEditChange={handleEditChange}
            handleSaveChanges={handleSaveChanges}
            closeEditModal={closeEditModal}
            openDeleteModal={openDeleteModal}
            categories={categories}
            types={types}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            handleDelete={handleDelete}
            closeDeleteModal={closeDeleteModal}
          />
        )}
        {isAddModalOpen && (
          <AddReduceModal
            type="Tambah"
            medicineName={currentMedicine.medicineName}
            handleQuantityChange={handleAddQuantity}
            closeModal={closeAddModal}
          />
        )}
               {isReduceModalOpen && (
          <AddReduceModal
            type="Kurangi"
            medicineName={currentMedicine.medicineName}
            handleQuantityChange={handleReduceQuantity}
            closeModal={closeReduceModal}
          />
        )}
      </div>
    </div>
  );
};

const AddReduceModal = ({
  type,
  medicineName,
  handleQuantityChange,
  closeModal,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleSubmit = () => {
    handleQuantityChange(quantity);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3 max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4">{type} Obat</h2>
        <p>
          {type} jumlah obat untuk {medicineName}:
        </p>
        <input
          type="number"
          value={quantity}
          onChange={handleChange}
          className="mt-2 mb-4 w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-primary-200 text-black rounded-md mr-2"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-success-600 text-white rounded-md"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

AddReduceModal.propTypes = {
  type: PropTypes.string.isRequired,
  medicineName: PropTypes.string.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const EditModal = ({
  medicine,
  handleEditChange,
  handleSaveChanges,
  closeEditModal,
  openDeleteModal,
  categories,
  types,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/2 max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4">Edit Obat</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nama Obat
          </label>
          <input
            type="text"
            name="medicineName"
            value={medicine.medicineName}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Jumlah
          </label>
          <input
            type="number"
            name="quantity"
            value={medicine.quantity}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            name="category"
            value={medicine.category}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Jenis
          </label>
          <select
            name="type"
            value={medicine.type}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Entry Date
          </label>
          <input
            type="date"
            name="entryDate"
            value={medicine.entryDate}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            value={medicine.expiryDate}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Harga
          </label>
          <input
            type="number"
            name="price"
            value={medicine.price}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={openDeleteModal}
            className="px-4 py-2 bg-error-600 text-white rounded-md flex items-center"
          >
            <FaTrash className="mr-2" /> Hapus
          </button>
          <div className="flex justify-end">
            <button
              onClick={closeEditModal}
              className="px-4 py-2 bg-primary-200 text-black rounded-md mr-2"
            >
              Batal
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 bg-success-600 text-white rounded-md"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  medicine: PropTypes.shape({
    medicineName: PropTypes.string,
    quantity: PropTypes.number,
    category: PropTypes.string,
    type: PropTypes.string,
    expiryDate: PropTypes.string,
    entryDate: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  handleEditChange: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  closeEditModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
};

const DeleteModal = ({ handleDelete, closeDeleteModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3 max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4">Konfirmasi Hapus</h2>
        <p>Apakah Anda yakin ingin menghapus obat ini?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 bg-primary-200 text-black rounded-md mr-2"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-error-600 text-white rounded-md"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
};

export default Pengingat;

