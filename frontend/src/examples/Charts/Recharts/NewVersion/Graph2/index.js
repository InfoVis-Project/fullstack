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
// import newGraph2 from "assets/data/newVersion/graph2/writer_top15.csv";
import newGraph2 from "assets/data/newVersion/graph2/writer_fulldata.csv";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 8px" }}>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Writer"} : ${
          payload[0].payload?.firstWriter
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Title"} : ${
          payload[0]?.payload?.title
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Year"} : ${
          payload[0]?.payload?.year
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Category"} : ${
          payload[0]?.payload?.seriesOrmovie
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Genre"} : ${
          payload[0]?.payload?.genre
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Original"} : ${
          payload[0].payload.original === "1.0" ? "Yes" : "No"
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Films"} : ${
          payload[0]?.payload?.films
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Imdb Score"} : ${
          payload[0]?.payload?.AvgRating
        }`}</p>
      </div>
    );
  }
  return null;
};

const formatYAxis = (value) => {
  const [firstName, lastName] = value?.split(" ");

  return lastName;
};
const VerticalComposedChart1 = function VerticalComposedChart1({
  color,
  title,
  description,
  yearState,
  chartColor,
  toggleToggleReferanceLine,
  dashboardGenreList,
  dashboardCategoryList,
  isOriginal,
}) {
  const [newGraph2Data, setnewGraph2Data] = useState(null);

  useEffect(async () => {
    const data = await d3.csv(newGraph2);
    if (data) {
      setnewGraph2Data(data);
    }
  }, []);

  const extractNewGraph2 = newGraph2Data?.map((d) => ({
    year: parseFloat(d.Year).toFixed(0),
    original: d.Original,
    seriesOrmovie: d["Series or Movie"],
    films: Number(d.Films),
    AvgRating: parseFloat(d.Rating).toFixed(2),
    genre: d.Genre,
    writer: d.Writer,
    firstWriter: d.First_Writer,
    title: d.Title,
  }));
  const sortedExtractNewGraph2 = extractNewGraph2?.sort((a, b) => a.year - b.year);

  const filteredNewGraph2Data = sortedExtractNewGraph2
    ?.filter((data) => data.year === yearState)
    ?.filter((data) => data.seriesOrmovie === dashboardCategoryList)
    .filter((data) => data.genre === dashboardGenreList)
    .filter((data) => data.original === isOriginal)
    // ?.filter((data) => data.seriesOrmovie === "Series")
    // .filter((data) => data.genre === "DRAMA")
    // .filter((data) => data.original === "0");
    .slice(0, 5);

  return extractNewGraph2 && extractNewGraph2 && filteredNewGraph2Data ? (
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
          height="16rem"
        >
          {filteredNewGraph2Data?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                width="100%"
                height="100%"
                data={filteredNewGraph2Data}
                margin={{
                  top: 35,
                  right: 20,
                  bottom: 20,
                  left: 40,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis tick={{ fontSize: 15 }} dataKey="AvgRating" type="number" domain={[0, 10]} />
                <YAxis
                  tick={{ fontSize: 13 }}
                  dataKey="firstWriter"
                  tickFormatter={formatYAxis}
                  type="category"
                  interval={0}
                  angle={-45}
                  dy={-5}
                />
                {/* <XAxis tick={{ fontSize: 15 }} dataKey="firstWriter" type="category" />
              <YAxis tick={{ fontSize: 15 }} dataKey="AvgRating" type="number" domain={[0, 10]} /> */}
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
                <Legend />
                <Bar barSize={20} dataKey="AvgRating" fill={chartColor} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <h1
              style={{
                color: "#F78B03",
                margin: "2rem",
              }}
            >
              No Data
            </h1>
          )}
        </MDBox>

        <MDBox pt={3} pb={1} px={1}>
          <MDTypography
            variant="h6"
            textTransform="capitalize"
            color={toggleToggleReferanceLine ? "warning" : "white"}
          >
            {toggleToggleReferanceLine ? yearState : ""} {title}
          </MDTypography>
          {/* <MDTypography
            component="div"
            variant="button"
            color={toggleToggleReferanceLine ? "warning" : "white"}
            fontWeight="light"
            mb={1}
          >
            {description}
          </MDTypography> */}
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
VerticalComposedChart1.defaultProps = {
  color: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
VerticalComposedChart1.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  // title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  // date: PropTypes.string.isRequired,
};

export default VerticalComposedChart1;
