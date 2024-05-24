import { ResponsivePie } from "@nivo/pie";
import { calculateTotals } from "../../model/dataPegawaiRawat";

const PieChart = () => {
  const percentages = calculateTotals();

  const data = [
    { id: "Rawat Jalan", value: percentages.rawatJalan },
    { id: "Rawat Inap", value: percentages.rawatInap },
    { id: "Lainnya", value: percentages.lainnya },
  ];

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      sortByValue={true}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ theme: "background" }}
      enableArcLinkLabels={false}
      innerRadius={0.5}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      colors={{ scheme: "purple_orange" }}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["brighter", 5]],
      }}
    />
  );
};

export default PieChart;
