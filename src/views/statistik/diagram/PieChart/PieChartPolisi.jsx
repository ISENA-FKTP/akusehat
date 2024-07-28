import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";

const PieChartPolisi = ({ data, colors }) => {
  const processedData =
    data.length > 0
      ? data.reduce((acc, curr) => {
          const existingItem = acc.find(
            (item) => item.id.toLowerCase() === curr.jenispenyakit.toLowerCase()
          );
          if (existingItem) {
            existingItem.value++;
          } else {
            acc.push({
              id: curr.jenispenyakit,
              label: curr.jenispenyakit,
              value: 1,
            });
          }
          return acc;
        }, [])
      : [];

  const total = processedData.reduce((sum, item) => sum + item.value, 0);
  const topFiveData = processedData
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      value: ((item.value / total) * 100).toFixed(1),
    }));

  return (
    <ResponsivePie
      data={topFiveData}
      margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
      sortByValue={true}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ theme: "background" }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      colors={colors}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 5]],
      }}
      valueFormat={(value) => `${value}%`}
      theme={{
        labels: {
          text: {
            fontSize: 14,
            fontWeight: 600,
          },
        },
      }}
    />
  );
};

PieChartPolisi.propTypes = {
  data: PropTypes.array.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default PieChartPolisi;
