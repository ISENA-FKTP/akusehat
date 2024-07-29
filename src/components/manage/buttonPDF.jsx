import PropTypes from "prop-types";
import { FaPrint } from "react-icons/fa";

export default function buttonPDF({ onClicked }) {
  buttonPDF.propTypes = {
    onClicked: PropTypes.func.isRequired,
  };
  const onClickedHandler = () => {
    onClicked();
  };
  return (
    <div>
      <button
        className="text-white bg-primary-500 px-4 py-3 rounded-md hover:bg-primary-400 inline-flex items-center"
        onClick={onClickedHandler}
      >
        <FaPrint className="mr-4 text-white rounded" />
        <span>Export To PDF</span>
      </button>
    </div>
  );
}
