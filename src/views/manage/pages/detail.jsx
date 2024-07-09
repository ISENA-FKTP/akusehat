import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../useAxios";
import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import CardDataSakit from "../../../components/manage/cardDataSakit";
import CardDataHomeVisit from "../../../components/manage/cardDataHomeVisit";
import CardDataRekamMedis from "../../../components/manage/cardDataRekamMedis";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10, padding: 10, borderBottom: "1px solid #eaeaea" },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
});

const PdfDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Identitas</Text>
        <Text style={styles.text}>NRP: {data.pegawai.nrp}</Text>
        <Text style={styles.text}>Nama: {data.pegawai.namapegawai}</Text>
        <Text style={styles.text}>Pangkat: {data.pegawai.pangkat}</Text>
        <Text style={styles.text}>
          Satuan kerja: {data.pegawai.satuankerja}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Data Sakit</Text>
        {data.data_sakit && data.data_sakit.length > 0 ? (
          data.data_sakit.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.detail}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No data available</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Data Home Visit</Text>
        {data.data_home_visit && data.data_home_visit.length > 0 ? (
          data.data_home_visit.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.detail}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No data available</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Data Rekam Medis</Text>
        {data.data_rekam_medis && data.data_rekam_medis.length > 0 ? (
          data.data_rekam_medis.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item.detail}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No data available</Text>
        )}
      </View>
    </Page>
  </Document>
);

export default function DetailPage() {
  PdfDocument.propTypes = {
    data: PropTypes.shape({
      pegawai: PropTypes.shape({
        nrp: PropTypes.number,
        namapegawai: PropTypes.string,
        pangkat: PropTypes.string,
        satuankerja: PropTypes.string,
      }).isRequired,
      data_sakit: PropTypes.arrayOf(
        PropTypes.shape({
          detail: PropTypes.string,
        })
      ),
      data_home_visit: PropTypes.array,
      data_rekam_medis: PropTypes.arrayOf(
        PropTypes.shape({
          detail: PropTypes.string,
        })
      ),
    }).isRequired,
  };

  const axiosInstance = useAxios();
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
      try {
        const dataSakitResponse = await axiosInstance.get(
          `/datasakits/pegawai/${pegawaiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const datasakits = dataSakitResponse.data;

        if (datasakits.length === 0) {
          throw new Error("No data found");
        }

        const dataUuid = datasakits[0].Pegawais.uuid;

        const dataHomeVisitResponse = await axiosInstance.get(
          `/homevisits/pegawai/${pegawaiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const datahomevisits = dataHomeVisitResponse.data;

        const employeeResponse = await axiosInstance.get(
          `/pegawais/${dataUuid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const employeeData = employeeResponse.data;

        setData({
          pegawai: employeeData,
          data_sakit: datasakits,
          data_home_visit: datahomevisits,
          data_rekam_medis: [],
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
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
        <PDFDownloadLink
          document={<PdfDocument data={data} />}
          fileName={`Detail_${data.pegawai.nrp}.pdf`}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {({ loading }) => (loading ? "Loading document..." : "Export to PDF")}
        </PDFDownloadLink>
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
