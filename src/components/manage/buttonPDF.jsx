import PropTypes from "prop-types";
import { IoIosAdd } from "react-icons/io";

export default function buttonPDF({ onClicked }) {
    buttonPDF.propTypes = {
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
        <IoIosAdd className="px-4 py-2 bg-indigo-600 text-white rounded" />
        <span>Export To PDF</span>
      </button>
    </div>
  );
}
