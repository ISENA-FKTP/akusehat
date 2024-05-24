import { ResponsiveBar } from "@nivo/bar";
import { DataPolisi as data } from "../../model/dataPolisi";

const BarChart = () => {
  return (
    <ResponsiveBar
      data={data}
      keys={["polda", "polres"]}
      indexBy="bulan"
      margin={{ top: 20, right: 10, bottom: 100, left: 55 }}
      padding={0.15}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "purple_orange" }}
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
        legend: "Kesatuan Polisi",
        legendPosition: "middle",
        legendOffset: 36,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Total Polisi",
        legendPosition: "middle",
        legendOffset: -50,
        truncateTickAt: 0,
      }}
      enableLabel={true}
      enableTotals={false}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", "5"]],
      }}
      theme={{
        legends: {
          text: {
            textTransform: "capitalize",
            fontSize: "1rem",
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
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default BarChart;
