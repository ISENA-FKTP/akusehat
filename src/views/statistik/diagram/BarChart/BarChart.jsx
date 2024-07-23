import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect, useRef } from "react";

const BarChart = ({ data, colors }) => {
  BarChart.propTypes = {
    data: PropTypes.array.isRequired,
    year: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const chartRef = useRef(null);
  const [dataInput, setDataInput] = useState([]);
  const [keys, setKeys] = useState([]);
  const [legendWidth, setLegendWidth] = useState(100);

  useEffect(() => {
    const processData = (data) => {
      const satuankerjaSet = new Set();
      const groupedData = data.reduce((acc, curr) => {
        const month = new Date(curr.awalsakit).toLocaleString("default", {
          month: "long",
        });
        const satuankerja = curr.pegawai.satuankerja;

        satuankerjaSet.add(satuankerja);

        if (!acc[month]) {
          acc[month] = {};
        }
        if (!acc[month][satuankerja]) {
          acc[month][satuankerja] = 0;
        }

        acc[month][satuankerja] += 1;
        return acc;
      }, {});

      setKeys([...satuankerjaSet]);

      return Object.entries(groupedData).map(([month, values]) => ({
        bulan: month,
        ...values,
      }));
    };

    const outputData = processData(data);
    setDataInput(outputData);
  }, [data]);

  useEffect(() => {
    const updateLegendWidth = () => {
      if (chartRef.current) {
        const chartWidth = chartRef.current.offsetWidth;
        setLegendWidth(chartWidth / keys.length);
      }
    };

    window.addEventListener("resize", updateLegendWidth);
    updateLegendWidth();

    return () => {
      window.removeEventListener("resize", updateLegendWidth);
    };
  }, [keys]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "500px" }}>
      <ResponsiveBar
        data={dataInput}
        keys={keys}
        indexBy="bulan"
        margin={{ top: 20, right: 10, bottom: 220, left: 55 }}
        padding={0.15}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={colors}
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
              fontSize: "12px",
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
            translateX: 10,
            translateY: 75,
            itemsSpacing: 10,
            itemWidth: legendWidth,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolShape: "circle",
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
    </div>
  );
};

export default BarChart;
