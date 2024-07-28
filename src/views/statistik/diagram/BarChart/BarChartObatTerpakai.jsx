import { ResponsiveBar } from "@nivo/bar";
import { calculateObatTerpakai } from "../../model/dataObat";
import PropTypes from "prop-types";

const BarChart = ({ dataInput, colors }) => {
  BarChart.propTypes = {
    dataInput: PropTypes.array.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const setiapObatKeluar = calculateObatTerpakai(dataInput);

  setiapObatKeluar.sort((a, b) => a.jumlahobat - b.jumlahobat);

  const highestTotal =
    setiapObatKeluar.length > 0
      ? setiapObatKeluar[setiapObatKeluar.length - 1].jumlahobat
      : 0;

  const data = setiapObatKeluar.map((obat) => ({
    sektor: obat.namaobat,
    total: obat.jumlahobat,
    color: obat.jumlahobat === highestTotal ? colors[0] : "#FEC27E",
  }));

  const dataWithZeroTotal = data.filter((obat) => obat.total === 0);

  if (dataWithZeroTotal.length > 0) {
    console.log("Ada data dengan total 0:", dataWithZeroTotal);
  }

  return (
    <ResponsiveBar
      data={data}
      keys={["total"]}
      indexBy="sektor"
      margin={{ top: 20, right: 10, bottom: 50, left: 80 }}
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
        legend: "Jumlah Obat Keluar",
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
