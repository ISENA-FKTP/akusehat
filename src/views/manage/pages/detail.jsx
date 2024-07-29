import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../../useAxios";
import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import CardDataSakit from "../../../components/manage/cardDataSakit";
import CardDataHomeVisit from "../../../components/manage/cardDataHomeVisit";
import CardDataRekamMedis from "../../../components/manage/cardDataRekamMedis";
// import { Button } from "@headlessui/react";
import ButtonPDF from "../../../components/manage/buttonPDF";

export default function DetailPage() {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { pegawaiId } = useParams();
  const [data, setData] = useState({
    pegawai: {},
    data_sakit: [],
    data_home_visit: [],
    data_rekam_medis: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      let uuid = "";

      const fetchDataSakit = async () => {
        try {
          const response = await axiosInstance.get(
            `/datasakits/pegawai/${pegawaiId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const datasakits = response.data;
          uuid = datasakits.length > 0 ? datasakits[0].Pegawais.uuid : "";
          setData((prevData) => ({
            ...prevData,
            data_sakit: datasakits,
          }));
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setData((prevData) => ({
              ...prevData,
              data_sakit: [],
            }));
          } else {
            setError(error);
          }
        }
      };

      const fetchDataHomeVisit = async () => {
        try {
          const response = await axiosInstance.get(
            `/homevisits/pegawai/${pegawaiId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const datahomevisits = response.data;
          if (datahomevisits.length > 0 && !uuid) {
            uuid = datahomevisits[0].Pegawais.uuid;
          }
          setData((prevData) => ({
            ...prevData,
            data_home_visit: datahomevisits,
          }));
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setData((prevData) => ({
              ...prevData,
              data_home_visit: [],
            }));
          } else {
            setError(error);
          }
        }
      };

      const fetchDataRekamMedis = async () => {
        try {
          const response = await axiosInstance.get(
            `/datarekammedis/pegawai/${pegawaiId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const datarekammedis = response.data;
          if (datarekammedis.length > 0 && !uuid) {
            uuid = datarekammedis[0].Pegawais.uuid;
          }
          setData((prevData) => ({
            ...prevData,
            data_rekam_medis: datarekammedis,
          }));
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setData((prevData) => ({
              ...prevData,
              data_rekam_medis: [],
            }));
          } else {
            setError(error);
          }
        }
      };

      const fetchEmployeeData = async () => {
        if (uuid) {
          try {
            const response = await axiosInstance.get(`/pegawais/${uuid}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const employeeData = response.data;
            setData((prevData) => ({
              ...prevData,
              pegawai: employeeData,
            }));
          } catch (error) {
            if (error.response && error.response.status === 404) {
              setData((prevData) => ({
                ...prevData,
                pegawai: {},
              }));
            } else {
              setError(error);
            }
          }
        } else {
          setData((prevData) => ({
            ...prevData,
            pegawai: {},
          }));
        }
      };

      await fetchDataSakit();
      await fetchDataHomeVisit();
      await fetchDataRekamMedis();
      await fetchEmployeeData();
      setLoading(false);
    };

    fetchData();
  }, [axiosInstance, token, pegawaiId]);

  const classes = "px-2 py-1";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const printHandler = () => {
    navigate(`/manage/printDatasakit/${pegawaiId}`);
  };

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
        <ButtonPDF
         onClicked={printHandler}
         />
        <div>
          <div className="w-full py-8 px-8 border-2 border-gray rounded-md bg-white space-y-4">
            <div className="w-full py-2 px-2 rounded-md bg-primary-200">
              <h3 className="text-xl font-medium">Identitas</h3>
            </div>
            <div className="space-y-2 py-2 px-2">
              <table>
                <tbody>
                  <tr>
                    <td className={classes}>NRP</td>
                    <td className={classes}> : </td>
                    <td className={classes}> {data.pegawai.nrp}</td>
                  </tr>
                  <tr>
                    <td className={classes}>Nama</td>
                    <td className={classes}> : </td>
                    <td className={classes}>{data.pegawai.namapegawai}</td>
                  </tr>
                  <tr>
                    <td className={classes}>Pangkat</td>
                    <td className={classes}> : </td>
                    <td className={classes}>{data.pegawai.pangkat}</td>
                  </tr>
                  <tr>
                    <td className={classes}>Satuan kerja</td>
                    <td className={classes}> : </td>
                    <td className={classes}>{data.pegawai.satuankerja}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full py-8 px-8 border-2 border-gray rounded-md bg-white space-y-4">
            <div className="w-full mt-2 py-2 px-2 rounded-md bg-primary-200">
              <h3 className="text-xl font-medium">Data Sakit</h3>
            </div>
            {Array.isArray(data.data_sakit) && data.data_sakit.length > 0 ? (
              data.data_sakit.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 py-2 px-2 rounded-md bg-gray-100"
                >
                  <CardDataSakit {...item} />
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
          <div className="w-full py-8 px-8 border-2 border-gray rounded-md bg-white space-y-4">
            <div className="w-full mt-2 py-2 px-2 rounded-md bg-primary-200">
              <h3 className="text-xl font-medium">Data Home Visit</h3>
            </div>
            {Array.isArray(data.data_home_visit) &&
            data.data_home_visit.length > 0 ? (
              data.data_home_visit.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 py-2 px-2 rounded-md bg-gray-100"
                >
                  <CardDataHomeVisit {...item} />
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
          <div className="w-full py-8 px-8 border-2 border-gray rounded-md bg-white space-y-4">
            <div className="w-full mt-2 py-2 px-2 rounded-md bg-primary-200">
              <h3 className="text-xl font-medium">Data Rekam Medis</h3>
            </div>
            {Array.isArray(data.data_rekam_medis) &&
            data.data_rekam_medis.length > 0 ? (
              data.data_rekam_medis.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 py-2 px-2 rounded-md bg-gray-100"
                >
                  <CardDataRekamMedis {...item} />
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
