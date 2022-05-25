import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
// import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// rechart
import {
  ScatterChart,
  Scatter,
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
import numbro from "numbro";

// https://stackoverflow.com/questions/51258615/reactjs-d3-parse-local-csv-file-and-passing-it-to-state-with-d3-request
import boxOffice from "assets/data/newVersion/graph4/boxOffice.csv";
// import newGraph3 from "assets/data/newVersion/graph3/directors3.csv";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatNumber(n) {
  return numbro(n).format({
    average: true,
    totalLength: 5,
    negative: "parenthesis",
    trimMantissa: true,
    lowPrecision: false,
  });
}
const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 8px" }}>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Title"} : ${
          payload[0]?.payload?.title
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Genre"} : ${
          payload[0]?.payload?.genre
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Rating"} : ${
          payload[0]?.payload?.imdbScore
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"BoxOfficeProfits"} : ${numberWithCommas(
          payload[0]?.payload?.boxOfficeProfits
        )}`}</p>
      </div>
    );
  }
  return null;
};

const SimpleScatterChart = function SimpleScatterChart({
  color,
  title,
  description,
  yearState,
  chartColor,
  toggleToggleReferanceLine,
}) {
  const [newGraph3Data, setnewGraph3Data] = useState(null);

  useEffect(async () => {
    const data = await d3.csv(boxOffice);
    if (data) {
      setnewGraph3Data(data);
    }
  }, []);

  const extractNewGraph3 = newGraph3Data?.map((d) => ({
    year: parseFloat(d.Year).toFixed(0),
    original: d.Original,
    seriesOrmovie: d["Series or Movie"],
    genre: d.MainGenre.toUpperCase().trim(),
    imdbScore: parseFloat(d["IMDb Score"]).toFixed(0),
    multipleGenre: d.Genre,
    boxOfficeProfits: d.BoxOfficeProfits,
    title: d.Title,
  }));

  const sortedExtractNewGraph2 = extractNewGraph3?.sort(
    (a, b) => a.boxOfficeProfits - b.boxOfficeProfits
  );
  const sortedExtractNewGraph3 = sortedExtractNewGraph2?.sort((a, b) => a.imdbScore - b.imdbScore);
  // console.log("extractNewGraph3", extractNewGraph3);

  const filteredNewGraph3Data = sortedExtractNewGraph3
    ?.filter((data) => data.year === yearState)
    .filter((data) => data.imdbScore !== "0.00")
    .filter((data) => data.boxOfficeProfits !== "0.0")
    .filter((data) => data.seriesOrmovie === "Movie")
    .filter((data) => data.genre === "DRAMA")
    .filter((data) => data.original === "0.0");

  console.log("filteredNewScatter", filteredNewGraph3Data);
  return extractNewGraph3 ? (
    <Card sx={{ height: "100%", width: "100%" }}>
      <MDBox padding="1rem">
        <MDBox
          variant="gradient"
          bgColor={color}
          borderRadius="lg"
          coloredShadow={color}
          py={2}
          pr={0.5}
          mt={-5}
          height="12.5rem"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              layout="vertical"
              width="100%"
              height="100%"
              margin={{
                top: 35,
                right: 20,
                bottom: 20,
                left: 40,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <YAxis
                // tickCount={10}
                tick={{ fontSize: 15 }}
                // ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                dataKey="year"
                type="number"
                // allowDataOverflow
                domain={["dataMin", "dataMax"]}
              />
              <XAxis
                // scale="log"
                // domain={["auto", "auto"]}
                unit="$"
                type="number"
                // domain={[0, "dataMax"]}
                dataKey="boxOfficeProfits"
                tickFormatter={(tick) =>
                  // console.log("tick", tick);
                  formatNumber(tick)
                }
              />

              {/* <XAxis tick={{ fontSize: 15 }} dataKey="firstWriter" type="category" />
              <YAxis tick={{ fontSize: 15 }} dataKey="rating" type="number" domain={[0, 10]} /> */}
              <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
              <Legend />
              <Scatter name="BoxOfficeProfits" data={filteredNewGraph3Data} fill={chartColor} />
            </ScatterChart>
          </ResponsiveContainer>
        </MDBox>

        <MDBox pt={3} pb={1} px={1}>
          <MDTypography
            variant="h6"
            textTransform="capitalize"
            color={toggleToggleReferanceLine ? "warning" : "white"}
          >
            {title}
          </MDTypography>
          <MDTypography
            component="div"
            variant="button"
            color={toggleToggleReferanceLine ? "warning" : "white"}
            fontWeight="light"
            mb={1}
          >
            {description}
          </MDTypography>
          {/* <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              {date}
            </MDTypography>
          </MDBox> */}
        </MDBox>
      </MDBox>
    </Card>
  ) : (
    <h1>...Loading</h1>
  );
};

// Setting default values for the props of ReportsBarChart
SimpleScatterChart.defaultProps = {
  color: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
SimpleScatterChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  // title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  // date: PropTypes.string.isRequired,
};

export default SimpleScatterChart;
