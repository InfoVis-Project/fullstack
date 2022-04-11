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
  LineChart,
  Line,
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
import movies from "assets/data/task1/Movies_genre.csv";
import series from "assets/data/task1/Series_genre.csv";

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 8px" }}>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Country"} : ${
          payload[0].payload.country
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Genre"} : ${
          payload[0].payload.genre
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Films"} : ${
          payload[0].payload.films
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Imdb Score"} : ${
          payload[0].payload.imdbScore
        }`}</p>
      </div>
    );
  }
  return null;
};

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

const BiaxialLineChart = function BiaxialLineChart({ color, title, description, date }) {
  const [moviesData, setMoviesData] = useState(null);
  const [seriesData, setSeriesData] = useState(null);
  let groupSeriesBelgium;
  console.log("moviesData", moviesData);
  useEffect(async () => {
    const data = await d3.csv(movies);
    if (data) {
      setMoviesData(data);
    }
  }, []);

  useEffect(async () => {
    const data = await d3.csv(series);
    if (data) {
      setSeriesData(data);
    }
  }, []);

  const extractMovies = moviesData?.map((d) => ({
    country: d.Country,
    genre: d.Genre,
    films: Number(d.Films),
    imdbScore: parseFloat(d.IMDb_Score).toFixed(2),
  }));

  const extractSeries = seriesData?.map((d) => ({
    country: d.Country,
    genre: d.Genre,
    films: Number(d.Films),
    imdbScore: parseFloat(d.IMDb_Score).toFixed(2),
  }));

  if (extractSeries) {
    const groupCountrySeries = groupBy(extractSeries, "country");
    groupSeriesBelgium = groupCountrySeries.Belgium;
  }
  console.log("groupSeries", groupSeriesBelgium);
  console.log("extractMovies", extractMovies);
  return extractMovies && extractSeries ? (
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
            <LineChart
              width="100%"
              height="100%"
              data={groupSeriesBelgium}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis domain={["dataMin", "dataMax"]} dataKey="genre" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="films"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line yAxisId="right" type="monotone" dataKey="imdbScore" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </MDBox>

        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
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
BiaxialLineChart.defaultProps = {
  color: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
BiaxialLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
};

export default BiaxialLineChart;
