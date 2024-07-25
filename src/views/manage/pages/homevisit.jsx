import { useState, useEffect } from "react";
import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import SearchBar from "../../../components/manage/searchBar";
import TambahButton from "../../../components/manage/tambahButton";
import { head_data_home_visit } from "../model/dataSakit";
import TabelHomeVisit from "../../../components/manage/tabel-home-visit";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxios from "../../../useAxios";

export default function HomeVisit() {
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
        const response = await axiosInstance.get("/homevisits", {
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
    navigate("/manage/data-home-visit/tambah-data");
  };

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }
  const filteredData =
    data.filter((data) => {
      return data.pegawai?.namapegawai
        ?.toLowerCase()
        .includes(keyword?.toLowerCase());
    }) || [];

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
        profilePicture="/logo.png"
      />
      <main className="mt-12 ml-32 mr-12 space-y-4  ">
        <div>
          <h1 className="text-2xl ">Data Home Visit</h1>
        </div>
        <div className="w-full my-4 flex gap-4">
          <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
          <TambahButton onClicked={tambahDataHandler} />
        </div>
        <TabelHomeVisit
          table_head={head_data_home_visit}
          table_row={filteredData}
        />
      </main>
    </div>
  );
}
