import { ResponsivePie } from "@nivo/pie";
import { calculateTotalsPasien } from "../../model/dataPolisi";
import PropTypes from "prop-types";

const PieChart = ({ data, colors }) => {
  PieChart.propTypes = {
    data: PropTypes.array.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const totalsBySatuanKerja = calculateTotalsPasien(data);

  // Hitung total semua nilai dalam totalsBySatuanKerja
  const total = Object.values(totalsBySatuanKerja).reduce(
    (sum, value) => sum + value,
    0
  );

  // Ubah setiap nilai dalam chartData menjadi persentase dari total
  const chartData = Object.keys(totalsBySatuanKerja).map((key) => ({
    id: `${key} (${totalsBySatuanKerja[key]})`,
    value: ((totalsBySatuanKerja[key] / total) * 100).toFixed(1),
  }));

  return (
    <ResponsivePie
      data={chartData}
      margin={{ top: -20, right: 10, bottom: 10, left: 10 }}
      sortByValue={true}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ theme: "background" }}
      enableArcLinkLabels={false}
      innerRadius={0.7}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      colors={colors}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["brighter", 5]],
      }}
      valueFormat={(value) => `${value}%`}
    />
  );
};

export default PieChart;
