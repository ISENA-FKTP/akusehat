import { ResponsiveBar } from "@nivo/bar";
import { calculateSektorTotals } from "../../model/dataSektor";

const BarChart = () => {
  const totals = calculateSektorTotals();

  const data = Object.keys(totals).map((key) => ({
    sektor: key,
    total: totals[key],
  }));

  return (
    <ResponsiveBar
      data={data}
      keys={["total"]}
      indexBy="sektor"
      margin={{ top: 20, right: 10, bottom: 60, left: 100 }}
      padding={0.15}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "purple_orange" }}
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
