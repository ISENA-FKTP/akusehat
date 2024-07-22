import { ResponsiveLine } from "@nivo/line";
import PropTypes from "prop-types";

const LineChart = ({ data }) => {
  LineChart.propTypes = {
    data: PropTypes.array.isRequired,
    year: PropTypes.string,
  };


  const groupedData = {};
  data.forEach((item) => {
    const month = new Date(item.awalsakit).toLocaleString("default", {
      month: "short",
    });
    const satuankerja = item.pegawai.satuankerja;

    if (!groupedData[satuankerja]) {
      groupedData[satuankerja] = {};
    }
    if (!groupedData[satuankerja][month]) {
      groupedData[satuankerja][month] = 0;
    }
    groupedData[satuankerja][month] += 1;
  });

  const DataPeningkatanSakitPolisi = Object.keys(groupedData).map(
    (satuankerja) => ({
      id: satuankerja,
      data: Object.keys(groupedData[satuankerja]).map((month) => ({
        x: month,
        y: groupedData[satuankerja][month],
      })),
    })
  );

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
