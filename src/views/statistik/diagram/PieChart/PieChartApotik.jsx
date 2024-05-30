import { ResponsivePie } from "@nivo/pie";
import { DataObat } from "../../model/dataObat";
import PropTypes from "prop-types";

const calculateTotals = (DataObat) => {
  let totalJumlahObat = 0;
  let totalObatKeluar = 0;

  DataObat.forEach((item) => {
    totalJumlahObat += item.jumlahobat;
    totalObatKeluar += item.totalobatkeluar;
  });

  return { totalJumlahObat, totalObatKeluar };
};

export const TotalObatYear = (year) => {
  const filteredData = DataObat.filter(
    (data) => new Date(data.tanggal).getFullYear() === parseInt(year)
  );

  const { totalJumlahObat, totalObatKeluar } = calculateTotals(filteredData);

  return {
    totalJumlahObat,
    totalObatKeluar,
  };
};

const PieChart = ({ colors, year }) => {
  PieChart.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.string,
  };

  const filteredData = DataObat.filter(
    (data) => new Date(data.tanggal).getFullYear() === parseInt(year)
  );

  const { totalJumlahObat, totalObatKeluar } = calculateTotals(filteredData);
  const totalObat = totalObatKeluar + totalJumlahObat;

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
