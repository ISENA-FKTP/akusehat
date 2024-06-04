import React, { useState, useEffect } from "react";
import Sidebar from "../../components/manage/sidebar";
import Header from "../../components/header";
import SearchBar from "../../components/manage/searchBar";
import TambahButton from "../../components/manage/tambahButton";
import { DataSakit, kolom } from "./model/dataSakit";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Manage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    DataSakit.getDataSakit().then((data) => setData(data));
  }, []);

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
        <TambahButton />
        <div className="card">
          <DataTable value={data}>
            {kolom.map((col) => (
              <Column key={col.field} field={col.field} header={col.header} />
            ))}
          </DataTable>
        </div>
      </main>
    </div>
  );
}
