import { ResponsiveBar } from "@nivo/bar";
import PropTypes from "prop-types";
import { calculateByYearAndMonthForBar } from "../../model/dataObat";

const BarChart = ({
  colors,
  showNextSixMonths,
  startMonthIndex,
  endMonthIndex,
  dataInput,
  dataDelete,
}) => {
  const data2024 = calculateByYearAndMonthForBar(
    showNextSixMonths,
    dataInput,
    dataDelete
  );

  const data = data2024.slice(startMonthIndex, endMonthIndex);

  return (
    <ResponsiveBar
      data={data}
      keys={["Total Obat", "Obat Keluar"]}
      indexBy="bulan"
      margin={{ top: 20, right: 10, bottom: 100, left: 25 }}
      padding={0.55}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={colors}
      borderColor={{
        from: "color",
        modifiers: [["darker", "5"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      enableLabel={true}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", "5"]],
      }}
      theme={{
        legends: {
          text: {
            textTransform: "capitalize",
            fontSize: "12px",
            fontWeight: 600,
          },
        },
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 20,
          translateY: 75,
          itemsSpacing: 10,
          itemWidth: 113,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolShape: "circle",
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
      role="application"
      ariaLabel="Nivo bar chart demo"
    />
  );
};

BarChart.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  showNextSixMonths: PropTypes.bool.isRequired,
  startMonthIndex: PropTypes.number,
  endMonthIndex: PropTypes.number,
  dataInput: PropTypes.array.isRequired,
  dataDelete: PropTypes.array.isRequired,
};

export default BarChart;
