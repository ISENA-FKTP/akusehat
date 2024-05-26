import { ResponsiveBar } from "@nivo/bar";
import {
  getTop10Penyakit,
  dataSakitKlinik,
  calculateTotals,
} from "../../model/dataSakitPoliGigi";
import PropTypes from "prop-types";

const BarChart = ({ colors }) => {
  BarChart.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
  };
  const totals = calculateTotals(dataSakitKlinik);

  const top10Penyakit = getTop10Penyakit(totals);

  const highestTotal = top10Penyakit[top10Penyakit.length - 1][1];

  const data = top10Penyakit.map(([jenisPenyakit, total]) => ({
    sektor: jenisPenyakit,
    total: total,
    color: total === highestTotal ? colors[0] : "#FEC27E",
  }));

  return (
    <ResponsiveBar
      data={data}
      keys={["total"]}
      indexBy="sektor"
      margin={{ top: 20, right: 10, bottom: 60, left: 120 }}
      padding={0.15}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ data }) => data.color}
      layout="horizontal"
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
        legend: "Jumlah Kasus Penyakit",
        legendPosition: "middle",
        legendOffset: 40,
        truncateTickAt: 0,
      }}
      theme={{
        axis: {
          legend: {
            text: {
              fontSize: "1rem",
              fontWeight: 600,
            },
          },
          ticks: {
            text: {
              fontSize: "12px",
              fontWeight: 300,
            },
          },
        },
      }}
      enableLabel={true}
      enableTotals={false}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", "5"]],
      }}
      role="application"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in sektor: " + e.indexValue
      }
    />
  );
};

export default BarChart;
