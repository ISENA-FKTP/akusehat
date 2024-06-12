import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataSakit } from "../model/dataSakit";
import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import CardDataSakit from "../../../components/manage/cardDataSakit";
import CardDataHomeVisit from "../../../components/manage/cardDataHomeVisit";
import CardDataRekamMedis from "../../../components/manage/cardDataRekamMedis";
export default function DetailPage() {
  const { nrp } = useParams();
  const [data, setData] = useState([]);
  const [dataSakit, setDataSakit] = useState({data_sakit: []} );

  useEffect(() => {
    if (data.data_sakit) {
        setDataSakit(data.data_sakit);
      }
  }, [data]);

  useEffect(() => {
    DataSakit.getData(nrp).then((data) => setData(data));
  }, [nrp]);

  const classes = "px-2 py-1";

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
        {/* <div>
          <h1 className="text-2xl ">Detail</h1>
        </div> */}
        <div className="w-full py-8 px-8 border-2 border-gray rounded-md bg-white space-y-4 ">
          <div className="w-full py-2 px-2 rounded-md bg-primary-200">
            <h3 className="text-xl font-medium">Identitas</h3>
          </div>
          <div className="space-y-2 py-2 px-2">
            <table>
              <tr>
                <td className={classes}>NRP</td>
                <td className={classes}> : </td>
                <td className={classes}> {data.nrp}</td>
              </tr>
              <tr>
                <td className={classes}>Nama</td>
                <td className={classes}> : </td>
                <td className={classes}>{data.nama}</td>
              </tr>
              <tr>
                <td className={classes}>Pangkat</td>
                <td className={classes}> : </td>
                <td className={classes}>{data.pangkat}</td>
              </tr>
              <tr>
                <td className={classes}>Satuan kerja</td>
                <td className={classes}> : </td>
                <td className={classes}>{data.satuan_kerja}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="w-full py-8 px-8 border-2 border-gray rounded-md bg-white space-y-4 ">
          <div className="w-full mt-2 py-2 px-2 rounded-md bg-primary-200">
            <h3 className="text-xl font-medium">Data Sakit</h3>
          </div>
          {Array.isArray(dataSakit) && dataSakit.length > 0 ? (
            dataSakit.map((item, index) => (
              <div key={index} className="space-y-2 py-2 px-2 rounded-md bg-gray-100">
                <CardDataSakit {...item} />
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="w-full py-8 px-8 border-2 border-gray rounded-md bg-white space-y-4 ">
          <div className="w-full mt-2 py-2 px-2 rounded-md bg-primary-200">
            <h3 className="text-xl font-medium">Data Home Visit</h3>
          </div>
          {Array.isArray(data.data_home_visit) && data.data_home_visit.length > 0 ? (
            data.data_home_visit.map((item, index) => (
              <div key={index} className="space-y-2 py-2 px-2 rounded-md bg-gray-100">
                <CardDataHomeVisit {...item} />
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="w-full py-8 px-8 border-2 border-gray rounded-md bg-white space-y-4 ">
          <div className="w-full mt-2 py-2 px-2 rounded-md bg-primary-200">
            <h3 className="text-xl font-medium">Data Rekam Medis</h3>
          </div>
          {Array.isArray(data.data_rekam_medis) && data.data_rekam_medis.length > 0 ? (
            data.data_rekam_medis.map((item, index) => (
              <div key={index} className="space-y-2 py-2 px-2 rounded-md bg-gray-100">
                <CardDataRekamMedis {...item} />
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </main>
    </div>
  );
}
