import React, { useState, useEffect } from "react";
import Sidebar from "../../components/manage/sidebar";
import Header from "../../components/header";
import SearchBar from "../../components/manage/searchBar";
import TambahButton from "../../components/manage/tambahButton";
import { DataSakit, headData } from "./model/dataSakit";
import Tabel from "../../components/manage/tabel";
import { useNavigate } from "react-router-dom";

export default function Manage() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    DataSakit.getDataSakit().then((data) => setData(data));
  }, []);

  const tambahDataHandler = () => {
    navigate("/manage/data-sakit/tambah-data");
  };

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
        profilePicture="logo.png"
      />
      <main className="mt-12 ml-32 mr-12 space-y-4  ">
        <div>
          <h1>Data Juni 2024</h1>
        </div>
        <SearchBar />
        <TambahButton onClicked={tambahDataHandler} />
        <Tabel table_head={headData} table_row={data}/>
      </main>
    </div>
  );
}
