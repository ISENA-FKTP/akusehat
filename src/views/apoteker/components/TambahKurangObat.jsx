import PropTypes from "prop-types";
import { useState } from "react";
import useAxios from "../../../useAxios";

export default function TambahObat({
  uuid,
  type,
  namaobat,
  handleQuantityChange,
  closeModal,
}) {
  const axiosInstance = useAxios();

  TambahObat.propTypes = {
    uuid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    namaobat: PropTypes.string.isRequired,
    handleQuantityChange: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  const [quantity, setQuantity] = useState(0);

  const handleChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const status = type === "Tambah" ? "Tambah" : "Kurangi";

    try {
      await axiosInstance.patch(
        `/dataobats/tambahkurangobats/${uuid}`,
        {
          jumlahobats: quantity,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleQuantityChange(quantity);
      closeModal();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3 max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4">{type} Obat</h2>
        <p>
          {type} jumlah obat untuk {namaobat}:
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
}
