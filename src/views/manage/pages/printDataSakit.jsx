import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { IoPrintOutline } from "react-icons/io5";
import useAxios from "../../../useAxios";
import Tabel from "../../../components/manage/tabel";
import { head_data_sakit } from "../model/dataSakit";

export default function PrintDataSakit(){
    const componentRef = useRef();
    const axiosInstance = useAxios();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("accessToken");
            try{
                const response = await axiosInstance.get("/datasakits", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [axiosInstance]);

    const handlepdfClick = useReactToPrint({
        content: () => componentRef.current,
      });
    

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
            <div className="">
              <div className="w-[297mm] h-[210mm] bg-white shadow-xl items-center border border-black rounded-md">
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
                          LAPORAN DATA SAKIT POLISI
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
    
                  <div className="ml-14 mr-10 pt-12">
                    <div className="overflow-x-auto pr-4 lg:pr-0">
                        <Tabel table_head={head_data_sakit} table_row={data} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}