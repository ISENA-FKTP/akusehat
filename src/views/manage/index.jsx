import { useState, useEffect } from "react";
import Sidebar from "../../components/manage/sidebar";
import Header from "../../components/header";
import SearchBar from "../../components/manage/searchBar";
import TambahButton from "../../components/manage/tambahButton";
import { DataSakit, head_data_sakit } from "./model/dataSakit";
import Tabel from "../../components/manage/tabel";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Manage() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    DataSakit.getDataSakit().then((data) => {
      setData(data);
    });
  }, []);

  const tambahDataHandler = () => {
    navigate("/manage/data-sakit/tambah-data");
  };

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredData = data.filter((data) => {
    return data.nama.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div className=" font-primary">
      {/* Sidebar */}
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <Header
        title="Data Sakit Polisi"
        userName="Rifki Rusdi Satma Putra"
        userStatus="Kepala Polisi"
        profilePicture="/logo.png"
      />
      <main className="mt-12 ml-32 mr-12 space-y-4  ">
        <div>
          <h1 className="text-2xl ">Data Sakit Polisi</h1>
        </div>
        <div className="w-full my-4 flex gap-4">
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
          <TambahButton onClicked={tambahDataHandler} />
        </div>
        <Tabel table_head={head_data_sakit} table_row={filteredData} />
      </main>
    </div>
  );
}
