import { useEffect, useState } from "react";
import useAxios from "../../../../useAxios";
import { useNavigate } from "react-router-dom";

const useLaporanData = () => {
  const axiosInstance = useAxios();
  const [sortBy, setSortBy] = useState("most");
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [, setCombinedData] = useState([]);
  const navigate = useNavigate();
  const [, setGlitch] = useState(false);

  const handleClick = () => {
    setGlitch(true);
    setTimeout(() => {
      setGlitch(false);
      navigate("/KajianAwal");
    }, 1000);
  };

  const countStatusOccurrences = (data) => {
    const statusCount = data.reduce((acc, item) => {
      acc[item.statuspeserta] = (acc[item.statuspeserta] || 0) + 1;
      return acc;
    }, {});
    return statusCount;
  };

  const sortStatusByFrequency = (a, b, order, statusCount) => {
    const countA = statusCount[a.statuspeserta] || 0;
    const countB = statusCount[b.statuspeserta] || 0;
    return order === "most" ? countB - countA : countA - countB;
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchData = async () => {
      try {
        const [pasiensResponse, kfsResponse, tdsResponse, pengajuansResponse] =
          await Promise.all([
            axiosInstance.get("/pasiens", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axiosInstance.get("/kfs", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axiosInstance.get("/tds", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axiosInstance.get("/pengajuans", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        const pasiens = pasiensResponse.data;
        const kfs = kfsResponse.data;
        const tds = tdsResponse.data;
        const pengajuans = pengajuansResponse.data;

        const combinedData = pasiens.map((pasien) => ({
          ...pasien,
          diagnosa: kfs.find((diagnosa) => diagnosa.uuid === pasien.uuid),
          kunjungan: tds.find((kunjungan) => kunjungan.uuid === pasien.uuid),
          obatpasien: pengajuans.find((obat) => obat.uuid === pasien.uuid),
          pemeriksaan: pengajuans.find(
            (pemeriksaan) => pemeriksaan.uuid === pasien.uuid
          ),
        }));

        setCombinedData(combinedData);

        console.log("Ini Gabuungan Semua Data: ", combinedData);

        const statusCount = countStatusOccurrences(combinedData);
        const sorted = [...combinedData].sort((a, b) =>
          sortStatusByFrequency(a, b, sortBy, statusCount)
        );
        setSortedData(sorted);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [axiosInstance, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredKlinik = sortedData.filter(
    (entry) =>
      entry.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus ? entry.statuspeserta === selectedStatus : true)
  );

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return {
    sortBy,
    sortedData,
    searchTerm,
    selectedStatus,
    handleClick,
    handleSortChange,
    handleSearch,
    handleStatusChange,
    filteredKlinik,
    calculateAge,
  };
};

export default useLaporanData;
