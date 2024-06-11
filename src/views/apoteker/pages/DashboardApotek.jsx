import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const DashboardApotek = () => {
  const [medicines, setMedicines] = useState([]);
  const [sortedMedicines, setSortedMedicines] = useState([]);
  const [sortBy, setSortBy] = useState("most");
  const [searchTerm, setSearchTerm] = useState("");
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
  const types = ["Tablet", "Syrup", "Krim"];

  useEffect(() => {
    fetch("/data/medicine.json")
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
        sortMedicines(data);
      })
      .catch((error) => console.error("Error fetching medicines:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
    sortMedicines(updatedMedicines);
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
    sortMedicines(updatedMedicines);
    closeEditModal();
    closeDeleteModal();

    Swal.fire({
      icon: "success",
      title: "Dihapus!",
      text: "Obat berhasil dihapus.",
    });
  };

  const sortMedicines = (medicinesToSort) => {
    const sorted =
      sortBy === "most"
        ? [...medicinesToSort].sort((a, b) => b.quantity - a.quantity)
        : [...medicinesToSort].sort((a, b) => a.quantity - b.quantity);

    setSortedMedicines(sorted);
  };

  const filteredMedicines = sortedMedicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    sortMedicines(updatedMedicines);
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
    sortMedicines(updatedMedicines);
    closeReduceModal();

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Jumlah obat berhasil dikurangi.",
    });
  };

  return (
    <div className="flex">
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <div className="flex-1">
        {" "}
        {/* margin-left disesuaikan dengan lebar sidebar */}
        <Header
          title="Dashboard Apotek"
          userName="Rifki Rusdi Satma Putra"
          userStatus="Apoteker"
          profilePicture="/logo.png"
        />
        <div className="container mx-auto pl-5">
          <h1 className="text-2xl font-bold mt-4 mb-2">
            Data Seluruh Obat Apotek
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-secondary-500">
            Seluruh data terkait obat di apotek
          </h2>
          <div className="flex justify-between mb-4">
            <div>
              <label htmlFor="sort">Urutkan berdasarkan:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
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
                value={searchTerm}
                onChange={handleSearch}
                className="ml-2 px-2 py-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
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
                {filteredMedicines.map((medicine, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-primary-50" : "bg-primary-100"
                    }
                  >
                    <td className="border px-4 py-2">
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
                ))}
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
  AddReduceModal.propTypes = {
    type: PropTypes.string.isRequired,
    medicineName: PropTypes.string.isRequired,
    handleQuantityChange: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };
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

const EditModal = ({
  medicine,
  handleEditChange,
  handleSaveChanges,
  closeEditModal,
  openDeleteModal,
  categories,
  types,
}) => {
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

const DeleteModal = ({ handleDelete, closeDeleteModal }) => {
  DeleteModal.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    closeDeleteModal: PropTypes.func.isRequired,
  };
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

export default DashboardApotek;
