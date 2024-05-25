import { ResponsiveBar } from "@nivo/bar";
import { calculateRawatTotals } from "../../model/dataPegawaiRawat";

const BarChart = () => {
  const totals = calculateRawatTotals();

  const combinedData = {
    ...totals,
    id: "data",
  };

  const colors = {
    rawatJalan: "#2d004b",
    rawatInap: "#542788",
    lainnya: "#d8daeb",
  };

  return (
    <ResponsiveBar
      data={[combinedData]}
      keys={Object.keys(totals)}
      indexBy="id"
      margin={{ top: 10, right: 10, bottom: 70, left: 10 }}
      padding={0.15}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id }) => colors[id]}
      layout="horizontal"
      borderColor={{
        from: "color",
        modifiers: [["darker", "5"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableLabel={true}
      enableTotals={false}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", "5"]],
      }}
      legends={[
        {
          data: [
            {
              id: "rawatJalan",
              label: "Rawat Jalan",
              color: colors.rawatJalan,
            },
            { id: "rawatInap", label: "Inap", color: colors.rawatInap },
            { id: "lainnya", label: "Lainnya", color: colors.lainnya },
          ],
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 20,
          translateY: 35,
          itemsSpacing: 10,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "top-to-bottom",
          itemOpacity: 0.85,
          symbolSize: 20,
          symbolShape: "circle",
          itemTextColor: "#555",
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
