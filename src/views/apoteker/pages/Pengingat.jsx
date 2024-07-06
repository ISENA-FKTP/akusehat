/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaMinus } from "react-icons/fa";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import TambahKurang from "../components/TambahKurangObat";
import DeleteObat from "../components/DeleteObat";
import EditObat from "../components/EditObat";
import Swal from "sweetalert2";
import useAxios from "../../../useAxios";

const Pengingat = () => {
  const [medicines, setMedicines] = useState([]);
  const [expiringMedicines, setExpiringMedicines] = useState([]);
  const [lowStockMedicines, setLowStockMedicines] = useState([]);
  const [expiringSortBy, setExpiringSortBy] = useState("most");
  const [lowStockSortBy, setLowStockSortBy] = useState("most");
  const [expiringSearchTerm, setExpiringSearchTerm] = useState("");
  const [lowStockSearchTerm, setLowStockSearchTerm] = useState("");
  const [modal, setModal] = useState({ type: null, medicine: null });
  const closeModal = () => setModal({ type: null, medicine: null });
  const openModal = (type, medicine) => setModal({ type, medicine });
  const [token, setToken] = useState("");
  const axiosInstance = useAxios();

  const categories = [
    "Alkes Habis Pakai",
    "Obat Cair",
    "Obat Padat",
    "Obat Lainnya",
  ];

  const handleSortChange = (e, setSortBy) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e, setSearchTerm) => {
    setSearchTerm(e.target.value);
  };
  const types = ["Tablet", "Syrup", "Krim"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    const getDataobats = async () => {
      try {
        const response = await axiosInstance.get("/dataobats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setMedicines(data);
        filterMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    if (token) {
      getDataobats();
    }
  }, [token]);

  useEffect(() => {
    filterMedicines(medicines);
  }, [expiringSortBy, lowStockSortBy, medicines]);

  const filterMedicines = (medicinesToFilter) => {
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    const expiring = medicinesToFilter.filter((medicine) => {
      const tglkadaluarsa = new Date(medicine.tglkadaluarsa);
      return tglkadaluarsa <= sixMonthsLater;
    });

    const lowStock = medicinesToFilter.filter(
      (medicine) => medicine.jumlahobat < 100
    );

    setExpiringMedicines(expiring);
    setLowStockMedicines(lowStock);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setModal((prevState) => ({
      ...prevState,
      medicine: { ...prevState.medicine, [name]: value },
    }));
  };

  const handleSaveChanges = () => {
    const updatedMedicines = medicines.map((medicine) =>
      medicine.uuid === modal.medicine.uuid ? modal.medicine : medicine
    );
    setMedicines(updatedMedicines);
    filterMedicines(updatedMedicines);
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Perubahan berhasil disimpan.",
    });
    closeModal();
  };

  const handleDelete = () => {
    const updatedMedicines = medicines.filter(
      (medicine) => medicine.uuid !== modal.medicine.uuid
    );
    setMedicines(updatedMedicines);
    Swal.fire({
      icon: "success",
      title: "Dihapus!",
      text: "Obat berhasil dihapus.",
    });
    closeModal();
  };

  const handleQuantityChange = (jumlahobat, isAdd) => {
    const updatedMedicines = medicines.map((medicine) =>
      medicine.namaobat === modal.medicine.namaobat
        ? {
            ...medicine,
            jumlahobat: isAdd
              ? medicine.jumlahobat + jumlahobat
              : Math.max(medicine.jumlahobat - jumlahobat, 0),
          }
        : medicine
    );
    setMedicines(updatedMedicines);
    filterMedicines(updatedMedicines);
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: `Jumlah obat berhasil ${isAdd ? "ditambahkan" : "dikurangi"}.`,
    });
    closeModal();
  };

  const filteredMedicines = (medicines, searchTerm) =>
    medicines.filter((medicine) =>
      medicine.namaobat.toLowerCase().includes(searchTerm.toLowerCase())
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
                onChange={(e) => handleSortChange(e, setExpiringSortBy)}
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
                onChange={(e) => handleSearch(e, setExpiringSearchTerm)}
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
                {filteredMedicines(expiringMedicines, expiringSearchTerm)
                  .length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      Tidak ada data obat yang sesuai
                    </td>
                  </tr>
                ) : (
                  filteredMedicines(expiringMedicines, expiringSearchTerm).map(
                    (medicine, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-primary-50" : "bg-primary-100"
                        }
                      >
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.namaobat}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.jumlahobat}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.kategori}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.jenisobat}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {formatDate(medicine.tglmasuk)}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {formatDate(medicine.tglkadaluarsa)}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.hargaobat}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center flex items-center justify-center space-x-2">
                          <button
                            onClick={() => openModal("add", medicine)}
                            className="p-2 rounded-md bg-primary-600 text-white"
                          >
                            <FaPlus />
                          </button>
                          <button
                            onClick={() => openModal("reduce", medicine)}
                            className="p-2 rounded-md bg-primary-600 text-white"
                          >
                            <FaMinus />
                          </button>
                          <button
                            onClick={() => openModal("edit", medicine)}
                            className="p-2 rounded-md bg-primary-600 text-white"
                          >
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <label htmlFor="low-stock-sort">Urutkan berdasarkan:</label>
              <select
                id="low-stock-sort"
                value={lowStockSortBy}
                onChange={(e) => handleSortChange(e, setLowStockSortBy)}
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
                onChange={(e) => handleSearch(e, setLowStockSearchTerm)}
                className="ml-2 px-2 py-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold">Obat yang Stoknya Sedikit</h2>
          <h3 className="text-xl font-semibold mb-3 text-secondary-500">
            Seluruh data terkait obat di Apotik memiliki jumlah obat kurang dari
            100
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
                {filteredMedicines(lowStockMedicines, lowStockSearchTerm)
                  .length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      Tidak ada data obat yang sesuai
                    </td>
                  </tr>
                ) : (
                  filteredMedicines(lowStockMedicines, lowStockSearchTerm).map(
                    (medicine, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-primary-50" : "bg-primary-100"
                        }
                      >
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.namaobat}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.jumlahobat}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.kategori}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.jenisobat}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {formatDate(medicine.tglmasuk)}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {formatDate(medicine.tglkadaluarsa)}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center">
                          {medicine.hargaobat}
                        </td>
                        <td className="border border-primary-600 px-4 py-2 text-center flex items-center justify-center space-x-2">
                          <button
                            onClick={() => openModal("add", medicine)}
                            className="p-2 rounded-md bg-primary-600 text-white"
                          >
                            <FaPlus />
                          </button>
                          <button
                            onClick={() => openModal("reduce", medicine)}
                            className="p-2 rounded-md bg-primary-600 text-white"
                          >
                            <FaMinus />
                          </button>
                          <button
                            onClick={() => openModal("edit", medicine)}
                            className="p-2 rounded-md bg-primary-600 text-white"
                          >
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modal.type === "edit" && (
        <EditObat
          uuid={modal.medicine.uuid}
          medicine={modal.medicine}
          closeModal={closeModal}
          handleSaveChanges={handleSaveChanges}
          handleEditChange={handleEditChange}
          closeEditModal={closeModal}
          openDeleteModal={() => openModal("delete", modal.medicine)}
          categories={categories}
          types={types}
        />
      )}
      {modal.type === "delete" && (
        <DeleteObat
          uuid={modal.medicine.uuid}
          handleDelete={handleDelete}
          closeDeleteModal={closeModal}
        />
      )}
      {(modal.type === "add" || modal.type === "reduce") && (
        <TambahKurang
          uuid={modal.medicine.uuid}
          type={modal.type === "add" ? "Tambah" : "Kurangi"}
          namaobat={modal.medicine.namaobat}
          handleQuantityChange={(jumlahobat) =>
            handleQuantityChange(jumlahobat, modal.type === "add")
          }
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Pengingat;
