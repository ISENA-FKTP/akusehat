import { ResponsivePie } from "@nivo/pie";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { calculateTotals } from "../../model/dataStatusPasienKlinik";

const PieChart = ({ dataInput, colors }) => {
  PieChart.propTypes = {
    dataInput: PropTypes.array.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  const {
    totalPolisi,
    totalPNS,
    totalKeluarga,
    totalPesertaMandiri,
    totalUmum,
  } = calculateTotals(dataInput);

  const totalVisits =
    totalPolisi + totalPNS + totalKeluarga + totalPesertaMandiri + totalUmum;

  const totalPolisiPercentage = ((totalPolisi / totalVisits) * 100).toFixed(1);
  const totalPNSPercentage = ((totalPNS / totalVisits) * 100).toFixed(1);
  const totalKeluargaPercentage = ((totalKeluarga / totalVisits) * 100).toFixed(
    1
  );
  const totalPesertaMandiriPercentage = (
    (totalPesertaMandiri / totalVisits) *
    100
  ).toFixed(1);
  const totalUmumPercentage = ((totalUmum / totalVisits) * 100).toFixed(1);

  const data = [
    { id: `Polisi (${totalPolisi})`, value: parseFloat(totalPolisiPercentage) },
    { id: `PNS (${totalPNS})`, value: parseFloat(totalPNSPercentage) },
    {
      id: `Keluarga (${totalKeluarga})`,
      value: parseFloat(totalKeluargaPercentage),
    },
    {
      id: `Peserta Mandiri (${totalPesertaMandiri})`,
      value: parseFloat(totalPesertaMandiriPercentage),
    },
    {
      id: `Umum (${totalUmum})`,
      value: parseFloat(totalUmumPercentage),
    },
  ];

  const [legendTranslateX, setLegendTranslateX] = useState(130);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setLegendTranslateX(150);
      } else {
        setLegendTranslateX(130);
      }
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    if (mediaQuery.matches) {
      setLegendTranslateX(150);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 110, bottom: 10, left: 10 }}
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
        modifiers: [["brighter", 5]],
      }}
      valueFormat={(value) => `${value}%`}
      legends={[
        {
          anchor: "bottom",
          direction: "column",
          justify: false,
          translateX: legendTranslateX,
          translateY: 0,
          itemsSpacing: 0,
          itemWidth: 0,
          itemHeight: 50,
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
