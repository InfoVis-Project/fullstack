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
  BarChart,
  Bar,
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
import newGraph3 from "assets/data/newVersion/graph3/directors3.csv";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 8px" }}>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Year"} : ${
          payload[0]?.payload?.year
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Genre"} : ${
          payload[0]?.payload?.seriesOrmovie
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Original"} : ${
          payload[0]?.payload?.original
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Films"} : ${
          payload[0]?.payload?.singleDirector
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Imdb Score"} : ${
          payload[0]?.payload?.avgRating
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Imdb Score"} : ${
          payload[0]?.payload?.multiListDirector
        }`}</p>
      </div>
    );
  }
  return null;
};

const VerticalComposedChart3 = function VerticalComposedChart3({
  color,
  title,
  description,
  yearState,
  chartColor,
  toggleToggleReferanceLine,
}) {
  const [newGraph3Data, setnewGraph3Data] = useState(null);

  useEffect(async () => {
    const data = await d3.csv(newGraph3);
    if (data) {
      setnewGraph3Data(data);
    }
  }, []);

  const extractNewGraph3 = newGraph3Data?.map((d) => ({
    year: parseFloat(d.Year).toFixed(0),
    original: d.Original,
    seriesOrmovie: d["Series or Movie"],
    genre: d.Genre.toUpperCase().trim(),
    singleDirector: d.X,
    multiListDirector: d.Director,
    avgRating: parseFloat(d.Y).toFixed(2),
  }));
  const sortedExtractNewGraph3 = extractNewGraph3?.sort((a, b) => a.year - b.year);

  const filteredNewGraph3Data = sortedExtractNewGraph3
    ?.filter((data) => data.year === yearState)
    ?.filter((data) => data.seriesOrmovie === "Series")
    .filter((data) => data.genre === "DRAMA")
    .filter((data) => data.original === "0");

  console.log("filteredNewGraph3Data", filteredNewGraph3Data);
  return extractNewGraph3 && extractNewGraph3 && filteredNewGraph3Data ? (
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
            <BarChart
              layout="vertical"
              width="100%"
              height="100%"
              data={filteredNewGraph3Data}
              margin={{
                top: 35,
                right: 20,
                bottom: 20,
                left: 40,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <YAxis
                tick={{ fontSize: 15 }}
                dataKey="singleDirector"
                type="category"
                domain={["dataMin", "dataMax"]}
              />
              <XAxis tick={{ fontSize: 15 }} dataKey="avgRating" type="number" domain={[0, 10]} />
              {/* <XAxis tick={{ fontSize: 15 }} dataKey="firstWriter" type="category" />
              <YAxis tick={{ fontSize: 15 }} dataKey="rating" type="number" domain={[0, 10]} /> */}
              <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
              <Legend />
              <Bar barSize={20} dataKey="avgRating" fill={chartColor} />
            </BarChart>
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
VerticalComposedChart3.defaultProps = {
  color: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
VerticalComposedChart3.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  // title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  // date: PropTypes.string.isRequired,
};

export default VerticalComposedChart3;
