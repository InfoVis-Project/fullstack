import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Radio Button
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

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
import popularSeriesMovies from "assets/data/task3/popularSeriesMovies.csv";
import { HuePicker } from "react-color";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div style={{ backgroundColor: "black", borderRadius: "5px", padding: "1px 8px" }}>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Title"} : ${
          payload[0].payload.title
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Imdb Score"} : ${
          payload[0].payload.imdbScore
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Year"} : ${
          payload[0].payload.year
        }`}</p>
        <p style={{ fontSize: "9pt", color: "white" }}>{`${"Series or Movies"} : ${
          payload[0].payload.seriesOrmovie
        }`}</p>
      </div>
    );
  }
  return null;
};

const VerticalComposedChart = function VerticalComposedChart({
  mdBoxColor,
  title,
  description,
  date,
}) {
  const [popularSeriesAndMovies, setPopularSeriesAndMovies] = useState(null);
  const [bgBarColor, setBgBarColor] = useState("#413ea0");
  const [filterItemValue, setFilterItemValue] = useState("5");
  const [inputFilterItemValue, setInputFilterItemValue] = useState("");
  const [filterYearValue, setFilterYearValue] = useState("2021");
  const [inputFilterYearValue, setInputFilterYearValue] = useState("");
  const [filterGenreValue, setFilterGenreValue] = useState("ACTION");
  const [inputFilterGenreValue, setInputFilterGenreValue] = useState("");

  const [radioValue, setRadioValue] = useState("Movie");

  const handleChangeComplete = (color) => {
    setBgBarColor(color.hex);
  };

  const handleChange = (event) => {
    setRadioValue(event.target.value);
  };

  useEffect(async () => {
    const data = await d3.csv(popularSeriesMovies);
    if (data) {
      setPopularSeriesAndMovies(data);
    }
  }, []);

  //  remove duplicates year
  const extractYearsForDublicates = popularSeriesAndMovies?.map((d) => d.Year2);
  const noDuplicateYear = Array.from(new Set(extractYearsForDublicates));

  //  remove duplicates genre
  const extractGenre = popularSeriesAndMovies?.map((d) => d.Genre);
  const noDuplicateGenre = Array.from(new Set(extractGenre));
  console.log("noDuplicateGenre", noDuplicateGenre);
  const extractPopularSeriesAndMovies = popularSeriesAndMovies?.map((d) => ({
    imdbScore: parseFloat(d["IMDb Score"]).toFixed(2),
    year: d.Year2,
    seriesOrmovie: d["Series or Movie"],
    genre: d.Genre,
    title: d.Title,
  }));

  const filteredPopularSeriesAndMovies = extractPopularSeriesAndMovies
    ?.filter((data) => data.year === filterYearValue)
    .filter((data) => data.seriesOrmovie === radioValue)
    .filter((data) => data.genre === filterGenreValue)
    .slice(0, filterItemValue);

  return popularSeriesAndMovies ? (
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
          height={`${filterItemValue * 5}rem`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              width="100%"
              height="100%"
              data={filteredPopularSeriesAndMovies}
              margin={{
                top: 35,
                right: 20,
                bottom: 20,
                left: 40,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis tick={{ fontSize: 15 }} dataKey="imdbScore" type="number" domain={[0, 10]} />
              <YAxis tick={{ fontSize: 15 }} dataKey="title" type="category" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
              <Legend />
              <Bar barSize={20} dataKey="imdbScore" fill={bgBarColor} />
            </BarChart>
          </ResponsiveContainer>
        </MDBox>

        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {/* {inputValue}-{radioValue} {title} */}
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light" mb={1}>
            {description}
          </MDTypography>
          <MDBox>
            <Autocomplete
              value={filterItemValue}
              onChange={(event, newValue) => newValue && setFilterItemValue(newValue)}
              inputValue={inputFilterItemValue}
              onInputChange={(event, newInputValue) => {
                setInputFilterItemValue(newInputValue);
              }}
              id="controllable-item"
              options={["5", "10", "15", "20"]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Top" />}
            />
          </MDBox>
          <MDBox mt={2}>
            <Autocomplete
              value={filterYearValue}
              onChange={(event, newValue) => newValue && setFilterYearValue(newValue)}
              inputValue={inputFilterYearValue}
              onInputChange={(event, newInputValue) => {
                setInputFilterYearValue(newInputValue);
              }}
              id="controllable-year"
              options={noDuplicateYear}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Year" />}
            />
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="awards"
                name="awards"
                value={radioValue}
                onChange={handleChange}
              >
                <FormControlLabel value="Series" control={<Radio />} label="Series" />
                <FormControlLabel value="Movie" control={<Radio />} label="Movies" />
              </RadioGroup>
            </FormControl>
          </MDBox>
          <MDBox mt={2}>
            <Autocomplete
              value={filterGenreValue}
              onChange={(event, newValue) => newValue && setFilterGenreValue(newValue)}
              inputValue={inputFilterGenreValue}
              onInputChange={(event, newInputValue) => {
                setInputFilterGenreValue(newInputValue);
              }}
              id="controllable-genre"
              options={noDuplicateGenre}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Genre" />}
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
VerticalComposedChart.defaultProps = {
  mdBoxColor: "dark",
  description: "",
};

// Typechecking props for the ReportsBarChart
VerticalComposedChart.propTypes = {
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

export default VerticalComposedChart;
