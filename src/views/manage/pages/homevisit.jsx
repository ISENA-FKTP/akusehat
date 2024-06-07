import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import SearchBar from "../../../components/manage/searchBar";
import TambahButton from "../../../components/manage/tambahButton";
import { DataHomeVisit, headData } from "../model/dataHomeVisit";
import TabelHoemVisit from "../../../components/manage/tabel-home-visit";
import { useNavigate } from "react-router-dom";

export default function HomeVisit() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  
  const tambahDataHandler = () => {
    navigate("/manage/data-home-visit/tambah-data");
  };
    
  useEffect(() => {
    DataHomeVisit.getDataHomeVisit().then((data) => setData(data));
  }, []);

  return (
    <div className=" font-primary">
      {/* Sidebar */}
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <Header
        title="Data Home Visit Polisi"
        userName="Rifki Rusdi Satma Putra"
        userStatus="Kepala Polisi"
        profilePicture="logo.png"
      />
      <main className="mt-12 ml-32 mr-12 space-y-4  ">
        <div>
          <h1>Data Juni 2024</h1>
        </div>
        <SearchBar />
        <TambahButton onClicked={tambahDataHandler}/>
        <TabelHoemVisit table_head={headData} table_row={data}/>
      </main>
    </div>
  );
}
