import { ResponsivePie } from "@nivo/pie";
import { DataPolisi, calculateTotalsPasien } from "../../model/dataPolisi";
import PropTypes from "prop-types";

const PieChart = ({ colors, year }) => {
  PieChart.propTypes = {
    year: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const filteredData = DataPolisi.filter(
    (data) => new Date(data.tanggal).getFullYear() === parseInt(year)
  );

  const { totalJumlahPolda, totalObatPolres } =
    calculateTotalsPasien(filteredData);

  let totalPolicePercentage = 0;
  if (totalJumlahPolda === 0 || totalObatPolres === 0) {
    totalPolicePercentage = 0;
  } else {
    totalPolicePercentage = (
      (totalJumlahPolda / (totalJumlahPolda + totalObatPolres)) *
      100
    ).toFixed(2);
  }
  const totalObatPercentage = 100 - totalPolicePercentage;

  const data = [
    { id: `Polda (${totalJumlahPolda})`, value: totalPolicePercentage },
    { id: `Polres (${totalObatPolres})`, value: totalObatPercentage },
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
          itemWidth: 120,
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
