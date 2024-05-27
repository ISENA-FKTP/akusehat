import { ResponsivePie } from "@nivo/pie";
import PropTypes from "prop-types";
import { calculateTotals } from "../../model/dataStatusPasienKlinik";

const PieChart = ({ colors }) => {
  PieChart.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const { totalPolisi, totalPNS, totalKeluarga, totalPesertaMandiri } =
    calculateTotals();

  const totalVisits =
    totalPolisi + totalPNS + totalKeluarga + totalPesertaMandiri;

  const totalPolisiPercentage = ((totalPolisi / totalVisits) * 100).toFixed(1);
  const totalPNSPercentage = ((totalPNS / totalVisits) * 100).toFixed(1);
  const totalKeluargaPercentage = ((totalKeluarga / totalVisits) * 100).toFixed(
    1
  );
  const totalPesertaMandiriPercentage = (
    (totalPesertaMandiri / totalVisits) *
    100
  ).toFixed(1);

  const data = [
    { id: `Polisi (${totalPolisi})`, value: parseFloat(totalPolisiPercentage) },
    { id: `PNS (${totalPNS})`, value: parseFloat(totalPNSPercentage) },
    {
      id: `Keluarga (${totalKeluarga})`,
      value: parseFloat(totalKeluargaPercentage),
    },
    {
      id: `Peserta Mandiri (${totalPesertaMandiri})`,
      value: parseFloat(totalPesertaMandiriPercentage),
    },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 100, bottom: 10, left: 10 }}
      sortByValue={true}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ theme: "background" }}
      enableArcLinkLabels={false}
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
          direction: "column",
          justify: false,
          translateX: 130,
          translateY: 0,
          itemsSpacing: 0,
          itemWidth: 0,
          itemHeight: 50,
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
