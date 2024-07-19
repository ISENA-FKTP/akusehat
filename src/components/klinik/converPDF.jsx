import { FaPrint } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrintButton = () => {
  const [, setGlitch] = useState(false);
  const navigate = useNavigate();
  const handlepdfClick = () => {
    setGlitch(true);
    setTimeout(() => {
      setGlitch(false);
      navigate("/print_pdf");
    }, 1000);
  };

  return (
    <button
      type="button"
      className="flex items-center px-6 p-1 border border-black text-black rounded-md hover:bg-blue-600 focus:outline-none "
      onClick={handlepdfClick}
    >
      <FaPrint className="mr-3" />
      Cetak
    </button>
  );
};

export default PrintButton;
