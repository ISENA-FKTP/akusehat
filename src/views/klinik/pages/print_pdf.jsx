import { useEffect, useState, useMemo, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../useAxios";
import { useReactToPrint } from "react-to-print";
import { IoPrintOutline } from "react-icons/io5";

export default function PrintPDF() {
  const axiosInstance = useAxios();
  const [sortBy] = useState("most");
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm] = useState("");
  const [selectedStatus] = useState("");
  const [dataPasien, setDataPasien] = useState([]);
  const [dataPengajuans, setPengajuans] = useState([]);
  const [dataDiagnosa, setDataDiagnosa] = useState([]);
  const [dataObat, setDataObat] = useState([]);
  const [dataPemeriksaan, setDataPemeriksaan] = useState([]);
  const componentRef = useRef();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlepdfClick = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          pasiensRes,
          pengajuansRes,
          diagnosaRes,
          obatRes,
          pemeriksaanRes,
        ] = await Promise.all([
          axiosInstance.get("/pasiens"),
          axiosInstance.get("/pelayanans"),
          axiosInstance.get("/diagnosas"),
          axiosInstance.get("/obats"),
          axiosInstance.get("/pemeriksaans"),
        ]);

        setDataPasien(pasiensRes.data);
        setPengajuans(pengajuansRes.data);
        setDataDiagnosa(diagnosaRes.data);
        setDataObat(obatRes.data);
        setDataPemeriksaan(pemeriksaanRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  const combinedData = useMemo(
    () =>
      dataPasien.map((pasien) => ({
        ...pasien,
        pengajuan: dataPengajuans.find(
          (pengajuan) => pengajuan.pasienId === pasien.id
        ),
        diagnosa: dataDiagnosa.find(
          (diagnosa) => diagnosa.pasienId === pasien.id
        ),
        obat: dataObat.find((obat) => obat.pasienId === pasien.id),
        pemeriksaan: dataPemeriksaan.find(
          (pemeriksaan) => pemeriksaan.pasienId === pasien.id
        ),
      })),
    [dataDiagnosa, dataObat, dataPasien, dataPemeriksaan, dataPengajuans]
  );

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
    const statusCount = countStatusOccurrences(combinedData);
    const sorted = [...combinedData].sort((a, b) =>
      sortStatusByFrequency(a, b, sortBy, statusCount)
    );
    setSortedData(sorted);
  }, [combinedData, sortBy]);

  const filteredKlinik = sortedData.filter(
    (entry) =>
      entry.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus ? entry.statuspeserta === selectedStatus : true)
  );

  const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const referenceDate = new Date("2024-07-08T00:00:00.000Z");
    let age = referenceDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = referenceDate.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && referenceDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <>
      <div className="flex justify-end mr-28 mt-6 mb-2">
        <button
          onClick={handlepdfClick}
          className="flex items-center bg-white border border-black text-black bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
        >
          <IoPrintOutline className="mr-2" />
          Cetak
        </button>
      </div>

      <div className="space-x-10 mb-10 flex justify-center">
        <div>
          <div className="w-auto h-auto bg-white shadow-xl items-center border border-black rounded-md">
            <div ref={componentRef}>
              <div className="flex items-center justify-center ml-8 mt-8">
                <img
                  src="/logo.png"
                  className="w-24 h-24 mr-32 mb-5"
                  alt="Logo"
                />
                <div className="mr-24 text-center">
                  <div className="mr-24">
                    <h1 className="text-xl font-bold font-primary-Poppins">
                      LAPORAN PENDAFTARAN PASIEN
                    </h1>
                  </div>
                  <div className=" mr-24">
                    <h1 className="text-3xl font-extrabold font-primary-Poppins">
                      ISENA FKTP
                    </h1>
                  </div>
                  <div className="mr-24">
                    <h1 className="text-lg font-medium font-primary-Poppins">
                      Klinik Bidokkes Polisi Daerah Nusa Tenggara Barat
                    </h1>
                  </div>
                  <div className="mr-24">
                    <h1 className="text-sm font-medium font-primary-Poppins">
                      Jl. Langko No. 77; Taman Sari, Ampenan, Kota Mataram, Nusa
                      Tenggara Barat, Indonesia
                    </h1>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-gray-800 mt-2  mx-20 flex justify-center" />

              <div className="ml-14 mr-10 pt-12 mb-7">
                <div className="overflow-x-auto pr-4 lg:pr-0">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-2 py-1 bg-white text-black border border-black rounded-md text-xs font-secondary-Karla font-bold">
                          No
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black rounded-md text-xs font-secondary-Karla font-bold">
                          Tanggal Masuk
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-bold font-secondary-Karla">
                          No. Rekam Medis
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-bold font-secondary-Karla">
                          Poli
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          Nama Lengkap
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          Usia
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          Jenis Kelamin
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          Status Pasien
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          Diagnosa
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          Terapi
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black rounded-tr-lg text-xs font-secondary-Karla">
                          Status Pulang
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredKlinik.map((entry, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-white" : "bg-white"}
                        >
                          <td className="border border-black px-4 py-2 text-center">
                            {index + 1}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {formatDate(entry.createdAt)}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {entry.norm}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {entry.pengajuan?.poli ||
                              "Data Belum Diisi Oleh Dokter"}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {entry.nama}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {`${formatDate(entry.tgllahir)} (${calculateAge(
                              entry.tgllahir
                            )} tahun)`}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {entry.gender}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {entry.statuspeserta}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {entry.diagnosa ? (
                              <>
                                <div>
                                  {entry.diagnosa.jenispenyakit1 ||
                                    "Data Belum Diisi Oleh Dokter"}
                                </div>
                                <div>{entry.diagnosa.jenispenyakit2}</div>
                                <div>{entry.diagnosa.jenispenyakit3}</div>
                                <div>{entry.diagnosa.jenispenyakit4}</div>
                                <div>{entry.diagnosa.jenispenyakit5}</div>
                              </>
                            ) : (
                              "Data Belum Diisi Oleh Dokter"
                            )}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {entry.obat ? (
                              <>
                                <div>
                                  {entry.obat.jenisobat1 ||
                                    "Data Belum Diisi Oleh Dokter"}
                                </div>
                                <div>{entry.obat.jenisobat2}</div>
                                <div>{entry.obat.jenisobat3}</div>
                                <div>{entry.obat.jenisobat4}</div>
                                <div>{entry.obat.jenisobat5}</div>
                              </>
                            ) : (
                              "Data Belum Diisi Oleh Dokter"
                            )}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {entry.pemeriksaan?.statuspulang ||
                              "Data Belum Diisi Oleh Dokter"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
