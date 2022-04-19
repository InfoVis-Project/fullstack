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

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// d3 react parse csv example
// https://www.pluralsight.com/guides/load-remote-chart-data-for-d3.js-in-a-react-app
import * as d3 from "d3";
// https://stackoverflow.com/questions/51258615/reactjs-d3-parse-local-csv-file-and-passing-it-to-state-with-d3-request
import actingResume from "assets/data/task4/task4.csv";

import { HuePicker } from "react-color";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 8px" }}>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Year"} : ${
          payload[0].payload.Year
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Rating"} : ${
          payload[0].payload.Rating
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Title"} : ${
          payload[0].payload.Title
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Actor"} : ${
          payload[0].payload.Actor
        }`}</p>
      </div>
    );
  }
  return null;
};

const SimpleActingResumeBarChart = function SimpleActingResumeBarChart({
  mdBoxColor,
  title,
  description,
  date,
}) {
  const [actingResumeData, setActingResumeData] = useState(null);
  const [filterActorValue, setFilterActorValue] = useState("Tom Cruise");
  const [inputFilterActorValue, setInputFilterActorValue] = useState("");

  const [bgBarColor, setBgBarColor] = useState("#FF0096");

  useEffect(async () => {
    const data = await d3.csv(actingResume);
    if (data) {
      setActingResumeData(data);
    }
  }, []);

  const handleChangeComplete = (color) => {
    setBgBarColor(color.hex);
  };

  //  remove duplicates actor
  const extractActorsForDublicates = actingResumeData?.map((d) => d.Actors.trim());
  const noDuplicateActors = Array.from(new Set(extractActorsForDublicates));

  const extractActors = actingResumeData?.map((d) => ({
    Actor: d.Actors.trim(),
    Title: d.Title,
    Year: d.X,
    Rating: d.Y,
  }));

  const sortedExtractActors = extractActors.sort((a, b) => a.Year - b.Year);
  const filteredPopularSeriesAndMovies = sortedExtractActors?.filter(
    (data) => data.Actor === filterActorValue
  );
  return extractActors ? (
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
              data={filteredPopularSeriesAndMovies}
              margin={{
                top: 5,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Year" />
              <YAxis dataKey="Rating" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Rating" fill={bgBarColor} />
              <Brush height={15} />
            </BarChart>
          </ResponsiveContainer>
        </MDBox>

        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title} netflix original
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light" mb={1}>
            {description}
          </MDTypography>
          <MDBox>
            <Autocomplete
              value={filterActorValue}
              onChange={(event, newValue) => newValue && setFilterActorValue(newValue)}
              inputValue={inputFilterActorValue}
              onInputChange={(event, newInputValue) => {
                setInputFilterActorValue(newInputValue);
              }}
              id="controllable-Actor"
              options={noDuplicateActors}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Top" />}
            />
          </MDBox>
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
SimpleActingResumeBarChart.defaultProps = {
  mdBoxColor: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
SimpleActingResumeBarChart.propTypes = {
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

export default SimpleActingResumeBarChart;
