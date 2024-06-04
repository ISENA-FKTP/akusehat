import React from "react";
import { IoMdSearch } from "react-icons/io";


export default function SearchBar() {
  return (
    <div>
      <input
        type="search"
        placeholder="Cari Pegawai"
        className="w-full rounded-md border-0 px-4 py-3 placeholder-gray-300 shadow"
      />
    </div>
  );
}
