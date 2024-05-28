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
      id: "Sisa Obat",
      value: ((totalJumlahObat / totalObat) * 100).toFixed(1),
    },
    {
      id: "Obat Keluar",
      value: ((totalObatKeluar / totalObat) * 100).toFixed(1),
    },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={{ top: -50, right: 10, bottom: 10, left: 10 }}
      sortByValue={true}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ theme: "background" }}
      enableArcLinkLabels={false}
      innerRadius={0.7}
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
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 10,
          translateY: -45,
          itemsSpacing: 0,
          itemWidth: 80,
          itemHeight: 0,
          itemTextColor: "#999",
          itemDirection: "top-to-bottom",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
