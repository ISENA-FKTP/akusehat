import React from "react";
import { IoMdSearch } from "react-icons/io";


export default function SearchBar({keyword, keywordChange}) {
  return (
    <div className="w-2/3">
      <input
        className="w-full rounded-md border-1 px-4 py-3 placeholder-gray-300 shadow"
        type="search"
        placeholder="Cari berdasarkan nama..."
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}
