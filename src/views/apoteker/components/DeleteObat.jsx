import PropTypes from "prop-types";
import useAxios from "../../../useAxios";

export default function DeleteObat({ uuid, handleDelete, closeDeleteModal }) {
  const axiosInstance = useAxios();
  const token = localStorage.getItem("accessToken");

  DeleteObat.propTypes = {
    uuid: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    closeDeleteModal: PropTypes.func.isRequired,
  };

  const handlePatchRequest = async () => {
    try {
      const response = await axiosInstance.delete(`/dataobats/${uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating jumlahobats:", error);
    }
  };

  const handleDeleteWithPatch = () => {
    handlePatchRequest();
    handleDelete();
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
            onClick={handleDeleteWithPatch}
            className="px-4 py-2 bg-error-600 text-white rounded-md"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
