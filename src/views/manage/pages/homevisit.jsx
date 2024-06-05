import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import SearchBar from "../../../components/manage/searchBar";
import TambahButton from "../../../components/manage/tambahButton";
import { DataHomeVisit, headData } from "../model/dataHomeVisit";
import TabelHoemVisit from "../../../components/manage/tabel-home-visit";

export default function HomeVisit() {
  const [data, setData] = useState([]);

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
        <TambahButton />
        <TabelHoemVisit table_head={headData} table_row={data}/>
      </main>
    </div>
  );
}
