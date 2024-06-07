import React from "react";
import { IoIosAdd } from "react-icons/io";

export default function TambahButton({onClicked}) {
  const onClickedHandler = () => {
    onClicked();
  };
  return (
    <div>
      <button className="text-white bg-primary-500 px-2 py-2 rounded-md hover:bg-primary-400 inline-flex items-center" onClick={onClickedHandler}>
        <IoIosAdd className="w-6 h-6 mr-2" />
        <span>Tambah Data</span>
      </button>
    </div>
  );
}
