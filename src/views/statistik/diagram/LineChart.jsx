import { ResponsiveLine } from "@nivo/line";
import { DataPolisi } from "../model/dataPolisi";

const DataPeningkatanSakitPolisi = [
  {
    id: "Peningkatan Sakit Polisi",
    data: DataPolisi.map((item) => ({
      x: item.bulan,
      y: item.polda + item.polres,
    })),
  },
];

const LineChart = () => {
  return (
    <ResponsiveLine
      data={DataPeningkatanSakitPolisi}
      margin={{ top: 10, right: 5, bottom: 30, left: 30 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      enableGridX={false}
      colors={{ scheme: "purple_orange" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableArea={true}
      areaBaselineValue={60}
      enableTouchCrosshair={true}
      useMesh={true}
    />
  );
};

export default LineChart;
