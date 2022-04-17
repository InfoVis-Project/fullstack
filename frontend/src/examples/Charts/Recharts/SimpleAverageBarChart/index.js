import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// rechart
import {
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// d3 react parse csv example
// https://www.pluralsight.com/guides/load-remote-chart-data-for-d3.js-in-a-react-app
import * as d3 from "d3";
// https://stackoverflow.com/questions/51258615/reactjs-d3-parse-local-csv-file-and-passing-it-to-state-with-d3-request
import averageProfits from "assets/data/task5/averageProfits.csv";
import numbro from "numbro";
import { HuePicker } from "react-color";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 8px" }}>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Year"} : ${
          payload[0].payload.Year
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"BoxOfficeProfits"} : ${
          payload[0].payload.BoxOfficeProfits
        }$`}</p>
      </div>
    );
  }
  return null;
};

function formatNumber(n) {
  return numbro(n).format({
    average: true,
    totalLength: 5,
    negative: "parenthesis",
    trimMantissa: true,
    lowPrecision: false,
  });
}

const SimpleAverageBarChart = function SimpleAverageBarChart({
  mdBoxColor,
  title,
  description,
  date,
}) {
  const [averageProfitsData, setAverageProfits] = useState(null);
  const [bgBarColor, setBgBarColor] = useState("#CD853F");

  useEffect(async () => {
    const data = await d3.csv(averageProfits);
    if (data) {
      setAverageProfits(data);
    }
  }, []);

  const handleChangeComplete = (color) => {
    setBgBarColor(color.hex);
  };

  const extractAverageProfits = averageProfitsData?.map((d) => ({
    BoxOfficeProfits: d.BoxOfficeProfits,
    Year: d.Year,
  }));

  return extractAverageProfits ? (
    <Card sx={{ height: "100%", width: "100%" }}>
      <MDBox padding="1rem">
        <MDBox
          variant="gradient"
          bgColor={mdBoxColor}
          borderRadius="lg"
          coloredShadow={mdBoxColor}
          py={2}
          pr={0.5}
          mt={-5}
          height="16rem"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width="100%"
              height="100%"
              data={extractAverageProfits}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Year" />
              <YAxis
                // scale="log"
                // domain={["auto", "auto"]}
                unit="$"
                // domain={[0, "dataMax"]}
                dataKey="BoxOfficeProfits"
                tickFormatter={(tick) =>
                  // console.log("tick", tick);
                  formatNumber(tick)
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="BoxOfficeProfits" fill={bgBarColor} />
              <Brush height={15} />
            </BarChart>
          </ResponsiveContainer>
        </MDBox>

        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title} 10 years netflix original
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light" mb={1}>
            {description}
          </MDTypography>
          <MDBox mt={2}>
            <MDTypography component="div" variant="button" color="text" fontWeight="light">
              Bar Color
            </MDTypography>
            <HuePicker color={bgBarColor} onChangeComplete={handleChangeComplete} />
          </MDBox>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              {date}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  ) : (
    <h1>...Loading</h1>
  );
};

// Setting default values for the props of ReportsBarChart
SimpleAverageBarChart.defaultProps = {
  mdBoxColor: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
SimpleAverageBarChart.propTypes = {
  mdBoxColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
};

export default SimpleAverageBarChart;
