import { useState, useEffect } from "react";
import Sidebar from "../../components/manage/sidebar";
import Header from "../../components/header";
import SearchBar from "../../components/manage/searchBar";
import TambahButton from "../../components/manage/tambahButton";
import { head_data_sakit } from "./model/dataSakit";
import Tabel from "../../components/manage/tabel";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxios from "../../useAxios";
import { IoPrintOutline } from "react-icons/io5";

export default function Manage() {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axiosInstance.get("/datasakits", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  const tambahDataHandler = () => {
    navigate("/manage/data-sakit/tambah-data");
  };

  const printDataHandler = () => {
    navigate("/manage/print");
  };

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredData =
    data?.filter((data) => {
      return data.pegawai?.namapegawai
        ?.toLowerCase()
        .includes(keyword?.toLowerCase());
    }) || [];

  return (
    <div className="font-primary">
      {/* Sidebar */}
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <Header
        title="Data Sakit Polisi"
        userName="Daden Kasandi"
        userStatus="Kepala Polisi"
        profilePicture="/logo.png"
      />
      <main className="mt-12 ml-32 mr-12 space-y-4">
        <div>
          <h1 className="text-2xl">Data Sakit Polisi</h1>
        </div>
        <div className="w-full my-4 flex gap-4">
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
          <TambahButton onClicked={tambahDataHandler} />
          <div className="w-1/2  ">
      <button
        className="text-white bg-primary-500 px-4 py-3 rounded-md hover:bg-primary-400 inline-flex items-center"
        onClick={printDataHandler }
      >
        <IoPrintOutline className="w-6 h-6 mr-2" />
        <span>Print Data</span>
      </button>
    </div>
        </div>
        <Tabel table_head={head_data_sakit} table_row={filteredData} />
      </main>
    </div>
  );
}
