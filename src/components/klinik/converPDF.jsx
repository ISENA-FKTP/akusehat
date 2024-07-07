import { FaPrint } from "react-icons/fa";

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      className="flex items-center px-6 p-1 border border-black text-black rounded-md hover:bg-blue-600 focus:outline-none "
      onClick={handlePrint}
    >
      <FaPrint className="mr-3" />
      Cetak
    </button>
  );
};

export default PrintButton;
