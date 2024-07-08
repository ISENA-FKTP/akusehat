import PropTypes from "prop-types";
import { IoIosAdd } from "react-icons/io";

export default function TambahButton({ onClicked }) {
  TambahButton.propTypes = {
    onClicked: PropTypes.func.isRequired,
  };
  const onClickedHandler = () => {
    onClicked();
  };
  return (
    <div className="w-1/2  ">
      <button
        className="text-white bg-primary-500 px-4 py-3 rounded-md hover:bg-primary-400 inline-flex items-center"
        onClick={onClickedHandler}
      >
        <IoIosAdd className="w-6 h-6 mr-2" />
        <span>Tambah Data</span>
      </button>
    </div>
  );
}
