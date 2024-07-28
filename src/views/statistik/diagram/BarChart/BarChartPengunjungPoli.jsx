import { ResponsiveBar } from "@nivo/bar";
import { calculateTotalsPoli } from "../../model/dataKunjunganKlinik";
import PropTypes from "prop-types";

const BarChart = ({ dataInput, colors }) => {
  BarChart.propTypes = {
    dataInput: PropTypes.array.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const totals = calculateTotalsPoli(dataInput);

  const updatedTotals = {
    ...totals,
  };

  const totalValue = Object.values(updatedTotals).reduce(
    (sum, value) => sum + value,
    0
  );

  const percentageLabels = Object.keys(updatedTotals).reduce((acc, key) => {
    acc[key] = ((updatedTotals[key] / totalValue) * 100).toFixed(1) + "%";
    return acc;
  }, {});

  return (
    <ResponsiveBar
      data={[updatedTotals]}
      keys={Object.keys(updatedTotals)}
      indexBy="id"
      margin={{ top: 10, right: 10, bottom: 40, left: 10 }}
      padding={0.15}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id }) => colors[Object.keys(updatedTotals).indexOf(id)]}
      layout="horizontal"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableLabel={true}
      enableGridY={false}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", 5]],
      }}
      legends={[
        {
          dataFrom: "keys",
          data: [
            {
              id: "poliUmumCount",
              label: `Poli Umum [${percentageLabels.poliUmumCount}]`,
              color: colors[0],
            },
            {
              id: "poliGigiCount",
              label: `Poli Gigi [${percentageLabels.poliGigiCount}]`,
              color: colors[1],
            },
          ],
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 30,
          itemsSpacing: 0,
          itemWidth: 150,
          itemHeight: 20,
          symbolShape: "circle",
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default BarChart;
