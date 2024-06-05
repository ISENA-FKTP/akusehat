import React from "react";
import { IoIosAdd } from "react-icons/io";

export default function TambahButton() {
  return (
    <div>
      <button className="text-black bg-secondary-400 px-2 py-2 rounded-md hover:bg-secondary-500 inline-flex items-center">
        <IoIosAdd className="w-6 h-6 mr-2" />
        <span>Tambah Data</span>
      </button>
    </div>
  );
}
