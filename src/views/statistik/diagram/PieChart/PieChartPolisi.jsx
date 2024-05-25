import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://65fcf9c49fc4425c6530ec6c.mockapi.io/dataShoe")
      .then((response) => {
        const aggregatedData = response.data.reduce((acc, curr) => {
          const existingItem = acc.find(
            (item) => item.id.toLowerCase() === curr.jenispenyakit.toLowerCase()
          );
          if (existingItem) {
            existingItem.value++;
          } else {
            acc.push({
              id: curr.jenispenyakit,
              label: curr.jenispenyakit,
              suhu: curr.suhu,
              value: 1,
            });
          }
          return acc;
        }, []);

        const sortedData = aggregatedData.sort((a, b) => b.value - a.value);

        const topFiveData = sortedData.slice(0, 5);

        setData(topFiveData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
      sortByValue={true}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ theme: "background" }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      colors={{ scheme: "purple_orange" }}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 5]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 10,
          translateY: 10,
          itemsSpacing: 0,
          itemWidth: 65,
          itemHeight: 0,
          itemTextColor: "#999",
          itemDirection: "top-to-bottom",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
