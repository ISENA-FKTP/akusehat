import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import useAxios from "../../../useAxios";
import { useState, useEffect } from "react";

export default function EditObat({
  uuid,
  medicine,
  handleEditChange,
  handleSaveChanges,
  closeEditModal,
  openDeleteModal,
  categories,
  types,
}) {
  const axiosInstance = useAxios();
  const [jenisObatLainnya, setJenisObatLainnya] = useState(medicine.jenisobat === "Jenis Lainnya" ? "" : "");
  const [selectedJenis, setSelectedJenis] = useState(medicine.jenisobat);

  useEffect(() => {
    if (selectedJenis !== "Jenis Lainnya") {
      setJenisObatLainnya("");
    }
  }, [selectedJenis]);

  const saveChanges = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    const dataToSubmit = {
      ...medicine,
      jenisobat: selectedJenis === "Jenis Lainnya" ? jenisObatLainnya : selectedJenis,
    };

    try {
      await axiosInstance.patch(`/dataobats/${uuid}`, dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleSaveChanges();
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  EditObat.propTypes = {
    medicine: PropTypes.shape({
      namaobat: PropTypes.string,
      jumlahobat: PropTypes.number,
      kategori: PropTypes.string,
      jenisobat: PropTypes.string,
      tglkadaluarsa: PropTypes.string,
      tglmasuk: PropTypes.string,
      hargaobat: PropTypes.number,
      nobatch: PropTypes.string,
    }).isRequired,
    uuid: PropTypes.string.isRequired,
    handleEditChange: PropTypes.func.isRequired,
    handleSaveChanges: PropTypes.func.isRequired,
    closeEditModal: PropTypes.func.isRequired,
    openDeleteModal: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired,
  };

  const handleJenisObatChange = (e) => {
    const { value } = e.target;
    setSelectedJenis(value);
    handleEditChange(e);
  };

  const handleJenisObatLainnyaChange = (e) => {
    const { value } = e.target;
    setJenisObatLainnya(value);
    handleEditChange({ target: { name: "jenisobat", value } });
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
            name="namaobat"
            value={medicine.namaobat}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Jumlah
          </label>
          <input
            disabled={true}
            type="number"
            name="jumlahobat"
            value={medicine.jumlahobat}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            name="kategori"
            value={medicine.kategori}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            {categories.map((kategori, index) => (
              <option key={index} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Jenis
          </label>
          <select
            name="jenisobat"
            value={selectedJenis}
            onChange={handleJenisObatChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            {types.map((jenisobat, index) => (
              <option key={index} value={jenisobat}>
                {jenisobat}
              </option>
            ))}
          </select>
          {selectedJenis === "Jenis Lainnya" && (
            <input
              type="text"
              name="jenisobatLainnya"
              value={jenisObatLainnya}
              onChange={handleJenisObatLainnyaChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Masukkan jenis obat lainnya"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            No. Batch
          </label>
          <input
            name="nobatch"
            value={medicine.nobatch}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Entry Date
          </label>
          <input
            type="date"
            name="tglmasuk"
            value={formatDate(medicine.tglmasuk)}
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
            name="tglkadaluarsa"
            value={formatDate(medicine.tglkadaluarsa)}
            onChange={handleEditChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Harga Obat
          </label>
          <input
            type="number"
            name="hargaobat"
            value={medicine.hargaobat}
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
              onClick={saveChanges}
              className="px-4 py-2 bg-success-600 text-white rounded-md"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
