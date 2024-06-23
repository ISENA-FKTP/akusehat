import { useState, useEffect } from "react";
import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import SearchBar from "../../../components/manage/searchBar";
import TambahButton from "../../../components/manage/tambahButton";
import { DataSakit, head_data_home_visit } from "../model/dataSakit";
import TabelHoemVisit from "../../../components/manage/tabel-home-visit";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function HomeVisit() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  useEffect(() => {
    DataSakit.getDataHomeVisit().then((data) => setData(data));
  }, []);

  const tambahDataHandler = () => {
    navigate("/manage/data-home-visit/tambah-data");
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
        title="Data Home Visit Polisi"
        userName="Daden Kasandi"
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
        <TabelHoemVisit
          table_head={head_data_home_visit}
          table_row={filteredData}
        />
      </main>
    </div>
  );
}
