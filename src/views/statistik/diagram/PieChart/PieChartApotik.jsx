import { ResponsivePie } from "@nivo/pie";
import { calculateTotals } from "../../model/dataObat";
import PropTypes from "prop-types";

const PieChart = ({ colors }) => {
  PieChart.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
  };
  const { totalJumlahObat, totalObatKeluar } = calculateTotals();
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
