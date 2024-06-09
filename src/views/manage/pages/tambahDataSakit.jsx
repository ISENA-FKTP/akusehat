import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import SearchBar from "../../../components/manage/searchBar";
import TambahButton from "../../../components/manage/tambahButton";
import { DataRekamMedis, headData } from "../model/dataRekamMedis";
import TabelRekamMedis from "../../../components/manage/tabel-rekam-medis";
import { FormDataSakit } from "../../../components/manage/formDataSakit";

export default function TambahDataSakit() {
  const [data, setData] = useState([]);

  useEffect(() => {
    DataRekamMedis.getDataRekamMedis().then((data) => setData(data));
  }, []);

  return (
    <div className=" font-primary">
      {/* Sidebar */}
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <Header
        title="Tambah Data Sakit Polisi"
        userName="Rifki Rusdi Satma Putra"
        userStatus="Kepala Polisi"
        profilePicture="logo.png"
      />
      <main className="mt-12 ml-32 mr-12 space-y-4 pb-10 ">
        <FormDataSakit />
      </main>
    </div>
  );
}
