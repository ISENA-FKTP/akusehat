import { ResponsivePie } from "@nivo/pie";
import {
  DataKunjunganKlinik,
  calculateTotals,
} from "../../model/dataKunjunganKlinik";
import PropTypes from "prop-types";

const PieChart = ({ colors, year }) => {
  PieChart.propTypes = {
    year: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const filteredData = DataKunjunganKlinik.filter(
    (data) => new Date(data.tanggal).getFullYear() === parseInt(year)
  );

  const { totalHealthy, totalSick } = calculateTotals(filteredData);

  const totalVisits = totalHealthy + totalSick;

  let totalHealthyPercentage = 0;
  let totalSickPercentage = 0;

  if (totalVisits !== 0) {
    totalHealthyPercentage = ((totalHealthy / totalVisits) * 100).toFixed(1);
    totalSickPercentage = ((totalSick / totalVisits) * 100).toFixed(1);
  } else {
    console.error("Tidak ada data kunjungan untuk tahun yang dipilih.");
  }

  const data = [
    {
      id: `Sehat (${totalHealthy})`,
      value: parseFloat(totalHealthyPercentage),
    },
    { id: `Sakit (${totalSick})`, value: parseFloat(totalSickPercentage) },
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
