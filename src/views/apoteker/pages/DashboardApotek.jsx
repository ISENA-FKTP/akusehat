import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaMinus } from "react-icons/fa";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import Swal from "sweetalert2";
import TambahKurang from "../components/TambahKurangObat";
import EditObat from "../components/EditObat";
import DeleteObat from "../components/DeleteObat";
import useAxios from "../../../useAxios";

const DashboardApotek = () => {
  const [medicines, setMedicines] = useState([]);
  const [sortBy, setSortBy] = useState("most");
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ type: null, medicine: null });
  const [token, setToken] = useState("");
  const axiosInstance = useAxios();

  const categories = [
    "Alkes Habis Pakai",
    "Obat Cair",
    "Obat Padat",
    "Obat Lainnya",
  ];
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

  const sortMedicines = (medicinesToSort) => {
    const sorted = [...medicinesToSort].sort((a, b) =>
      sortBy === "most"
        ? b.jumlahobat - a.jumlahobat
        : a.jumlahobat - b.jumlahobat
    );
    setMedicines(sorted);
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.namaobat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const getDataobats = async () => {
      try {
        const response = await axiosInstance.get("/dataobats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        sortMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    if (token) {
      getDataobats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosInstance, sortBy, token]);

  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const openModal = (type, medicine) => setModal({ type, medicine });
  const closeModal = () => setModal({ type: null, medicine: null });

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

  const handlejumlahobatChange = (jumlahobat, isAdd) => {
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
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: `Jumlah obat berhasil ${isAdd ? "ditambahkan" : "dikurangi"}.`,
    });
    closeModal();
  };

  return (
    <div className="flex">
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <div className="flex-1">
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
                      Rp{medicine.hargaobat}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {modal.type === "edit" && (
          <EditObat
            uuid={modal.medicine.uuid}
            medicine={modal.medicine}
            handleEditChange={handleEditChange}
            handleSaveChanges={handleSaveChanges}
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
              handlejumlahobatChange(jumlahobat, modal.type === "add")
            }
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardApotek;
