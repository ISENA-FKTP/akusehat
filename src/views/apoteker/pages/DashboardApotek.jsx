/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import Sidebar from "../../../components/apotik/sidebar";
import Header from "../../../components/header";
import Swal from "sweetalert2";
import TambahKurang from "../components/TambahKurangObat";
import EditObat from "../components/EditObat";
import DeleteObat from "../components/DeleteObat";
import useAxios from "../../../useAxios";

const DashboardApotek = () => {
  const [medicines, setMedicines] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sortBy, setSortBy] = useState("most");
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ type: null, medicine: null });
  const [token, setToken] = useState("");
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const openModal = (type, medicine) => setModal({ type, medicine });
  const closeModal = () => setModal({ type: null, medicine: null });
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

  const formatCurrency = (number) => {
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace('Rp', 'Rp ');
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

  const filteredMedicines = medicines
    .filter((medicine) =>
      medicine.namaobat.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((medicine) => medicine.jumlahobat > 0);

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

    const getRequests = async () => {
      const status = false;
      try {
        const response = await axiosInstance.get(`/obatsbyStatus/${status}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    if (token) {
      getDataobats();
      getRequests();
    }
  }, [axiosInstance, sortBy, token]);

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
      medicine.namaobat === modal.medicine.namaobat &&
      medicine.jenisobat === modal.medicine.jenisobat
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

  const handleRequestComplete = async (requestId) => {
    try {
      const response = await axiosInstance.patch(
        `/obats/${requestId}`,
        { status: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setRequests(requests.filter((request) => request.uuid !== requestId));
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Permintaan obat berhasil diselesaikan.",
        });
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui status permintaan obat.",
      });
    }
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
        <div className="container mx-auto pl-20">
          <h1 className="text-2xl font-bold mt-4 mb-2">
            Data Seluruh Obat Apotek
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-secondary-500">
            Seluruh data terkait obat di apotek
          </h2>
          <div className="mb-4 p-4 border rounded-md bg-gray-100">
            <h3 className="text-xl font-semibold mb-2">Permintaan Obat</h3>
            <ul>
              {requests.map((request) => (
                <li
                  key={request.uuid}
                  className="mb-2 flex justify-between items-center"
                >
                  <div>
                    <div>
                      <strong>Nama Pasien:</strong> {request.pasien.nama}
                      <br />
                      <strong>Tanggal Lahir Pasien:</strong>{" "}
                      {formatDate(request.pasien.tgllahir)}
                    </div>
                    {[
                      request.jenisobat1,
                      request.jenisobat2,
                      request.jenisobat3,
                      request.jenisobat4,
                      request.jenisobat5,
                    ].map(
                      (jenisobat, idx) =>
                        jenisobat && (
                          <div key={idx}>
                            <span>
                              Obat ke-{idx + 1}: {jenisobat} - {request.dosis}{" "}
                            </span>
                          </div>
                        )
                    )}
                    <span>BMHP: {request.BMHP}</span>
                    <div className="border-b border-primary-950 my-1"></div>
                  </div>
                  <button
                    onClick={() => handleRequestComplete(request.uuid)}
                    className="p-2 rounded-md bg-green-600 text-white"
                  >
                    <FaCheck className="text-success-600" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
                  <th className="px-4 py-2 bg-primary-600 text-white">No. Batch</th>
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
                    key={medicine.uuid}
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
                      {medicine.nobatch}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {formatDate(medicine.tglmasuk)}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {formatDate(medicine.tglkadaluarsa)}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {formatCurrency(medicine.hargaobat)}
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