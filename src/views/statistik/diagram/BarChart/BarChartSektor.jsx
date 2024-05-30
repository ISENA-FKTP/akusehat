import { ResponsiveBar } from "@nivo/bar";
import { DataSektor, calculateSektorTotals } from "../../model/dataSektor";
import PropTypes from "prop-types";

const BarChart = ({ colors, year }) => {
  BarChart.propTypes = {
    year: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const filteredData = DataSektor.filter(
    (data) => new Date(data.tanggal).getFullYear() === parseInt(year)
  );

  const totals = calculateSektorTotals(filteredData);

  const data = Object.keys(totals).map((key) => ({
    sektor: key,
    total: totals[key],
  }));

  const sortedData = [...data].sort((b, a) => b.total - a.total);

  const top5Sectors = sortedData.slice(0, 5).map((item) => item.sektor);

  const colorBySector = {
    [top5Sectors[4]]: colors[0],
  };

  const getColor = (bar) => colorBySector[bar.indexValue] || "#FEC27E";

  return (
    <ResponsiveBar
      data={sortedData} // Menggunakan data yang telah diurutkan
      keys={["total"]}
      indexBy="sektor"
      margin={{ top: 20, right: 10, bottom: 60, left: 100 }}
      padding={0.15}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={getColor}
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
        legend: "Jumlah Anggota Sektor Polisi",
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
