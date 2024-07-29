import { useEffect, useState, useMemo, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../useAxios";
import { useReactToPrint } from "react-to-print";
import { IoPrintOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

export default function PDFDatasakit() {
  const axiosInstance = useAxios();
  const [sortBy] = useState("most");
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm] = useState("");
  const [selectedStatus] = useState("");
  const [dataDatasakits, setDatasakits] = useState([]);
  const componentRef = useRef();
  const { pegawaiId } = useParams();

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
        const [datasakitsRes] = await Promise.all([
          axiosInstance.get(`/datasakits/pegawai/${pegawaiId}`),
        ]);

        setDatasakits(datasakitsRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [axiosInstance, pegawaiId]);

  console.log(dataDatasakits);

  const combinedData = useMemo(
    () =>
      dataDatasakits.map((datasakit) => ({
        ...datasakit,
      })),
    [dataDatasakits]
  );

  const countStatusOccurrences = (data) => {
    const statusCount = data.reduce((acc, item) => {
      acc[item.satuankerja] = (acc[item.satuankerja] || 0) + 1;
      return acc;
    }, {});
    return statusCount;
  };

  const sortStatusByFrequency = (a, b, order, statusCount) => {
    const countA = statusCount[a.satuankerja] || 0;
    const countB = statusCount[b.satuankerja] || 0;
    return order === "most" ? countB - countA : countA - countB;
  };

  useEffect(() => {
    const statusCount = countStatusOccurrences(combinedData);
    const sorted = [...combinedData].sort((a, b) =>
      sortStatusByFrequency(a, b, sortBy, statusCount)
    );
    setSortedData(sorted);
  }, [combinedData, sortBy]);

  const filteredPegawai = sortedData.filter(
    (datasakit) =>
      datasakit.Pegawais?.namapegawai
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (selectedStatus
        ? datasakit.Pegawais?.satuankerja === selectedStatus
        : true)
  );

  return (
    <>
      <div className="flex justify-end mr-28 mt-6 mb-2">
        <button
          onClick={handlepdfClick}
          className="flex items-center bg-white border border-black text-black px-3 py-2 rounded-md"
        >
          <IoPrintOutline className="mr-2 rounded" />
          Export to PDF
        </button>
      </div>

      <div className="space-x-10 mb-10 flex justify-center">
        <div>
          <div className="w-auto h-auto bg-white shadow-xl items-center border border-black rounded-md">
            <div ref={componentRef}>
              <div className="flex items-center justify-center ml-8 mt-8">
                <img
                  src="/logo.png"
                  className="w-24 h-24 mr-32 mb-5 ml-20"
                  alt="Logo"
                />
                <div className="mr-24 text-center">
                  <div className="mr-24">
                    <h1 className="text-xl font-bold font-primary-Poppins">
                      LAPORAN DATA SAKIT PEGAWAI
                    </h1>
                  </div>
                  <div className=" mr-24">
                    <h1 className="text-3xl font-extrabold font-primary-Poppins">
                      AKUSEHAT
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
              <div className="ml-20 mr-16 pt-12 mb-7">
                {filteredPegawai.map((pegawai, index) => (
                  <div key={index} className="mb-4">
                    <div className="bg-white rounded-lg  shadow-sm">
                      <p className="text-base text-gray-600">
                        <span className="font-medium text-gray-700">NRP:</span>{" "}
                        {pegawai.Pegawais?.nrp}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="overflow-x-auto pr-4 lg:pr-0">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-2 py-1 bg-white text-black border border-black rounded-md text-xs font-secondary-Karla font-bold">
                          No
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black rounded-md text-xs font-secondary-Karla font-bold">
                          Tanggal
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-bold font-secondary-Karla">
                          Jenis Sakit
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-bold font-secondary-Karla">
                          Jenis Perawatan
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          Sumber Biaya
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black rounded-md text-xs font-secondary-Karla font-bold">
                          Tanggal Awal Sakit
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          Lama Cuti
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          WFH
                        </th>
                        <th className="px-2 py-1 bg-white text-black border border-black text-xs font-secondary-Karla">
                          Keterangan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPegawai.map((datasakit, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-white" : "bg-white"}
                        >
                          <td className="border border-black px-4 py-2 text-center">
                            {index + 1}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {formatDate(datasakit.createdAt)}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {datasakit.jenispenyakit}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {datasakit.jenisperawatan}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {datasakit.sumberbiaya}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {datasakit.awalsakit}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {datasakit.lamacuti}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {datasakit.WFH}
                          </td>
                          <td className="border  border-black px-4 py-2 text-center">
                            {datasakit.keterangan}
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
