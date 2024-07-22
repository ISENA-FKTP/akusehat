import { ResponsivePie } from "@nivo/pie";
import PropTypes from "prop-types";

// Menghitung total jumlah obat dan obat keluar
const calculateTotals = (dataMasuk, dataKeluar) => {
  let totalJumlahObat = 0;
  let totalObatKeluar = 0;

  dataMasuk.forEach((item) => {
    totalJumlahObat += item.jumlahobat;
  });

  dataKeluar.forEach((item) => {
    totalObatKeluar += item.jumlahobat;
  });

  return { totalJumlahObat, totalObatKeluar };
};

// Menghitung total obat untuk tahun tertentu
export const TotalObatYear = (dataMasuk, dataKeluar) => {
  const { totalJumlahObat, totalObatKeluar } = calculateTotals(
    dataMasuk,
    dataKeluar
  );

  return {
    totalJumlahObat,
    totalObatKeluar,
  };
};

// Komponen PieChart
const PieChart = ({ colors, dataMasuk, dataKeluar }) => {
  // Definisi tipe properti komponen
  PieChart.propTypes = {
    dataMasuk: PropTypes.array.isRequired,
    dataKeluar: PropTypes.array.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.string,
  };

  // Menghitung total jumlah obat dan obat keluar
  const { totalJumlahObat, totalObatKeluar } = calculateTotals(
    dataMasuk,
    dataKeluar
  );
  const totalObat = totalJumlahObat + totalObatKeluar;

  // Data untuk PieChart
  const data = [
    {
      id: "Total Jumlah Obat",
      value: ((totalJumlahObat / totalObat) * 100).toFixed(1),
    },
    {
      id: "Total Obat Keluar",
      value: ((totalObatKeluar / totalObat) * 100).toFixed(1),
    },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      sortByValue={true}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ theme: "background" }}
      enableArcLinkLabels={false}
      innerRadius={0.5}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      colors={colors}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["brighter", 5]],
      }}
      valueFormat={(value) => `${value}%`}
      theme={{
        labels: {
          text: {
            fontSize: 10,
            fontWeight: 600,
          },
        },
      }}
    />
  );
};

export default PieChart;
