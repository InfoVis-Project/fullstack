import { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import JointLineScatterChart from "examples/Charts/Recharts/JointLineScatterChart";
// import BiaxialLineChart from "examples/Charts/Recharts/BiaxialLineChart";
import BiaxialLineChartGraph1 from "examples/Charts/Recharts/NewVersion/Graph1";
import VerticalComposedChart1 from "examples/Charts/Recharts/NewVersion/Graph2";
import VerticalComposedChart3 from "examples/Charts/Recharts/NewVersion/Graph3";
import SimpleScatterChart from "examples/Charts/Recharts/NewVersion/Graph4";
// import SimpleAverageBarChart from "examples/Charts/Recharts/SimpleAverageBarChart";
// import SimpleActingResumeBarChart from "examples/Charts/Recharts/SimpleActingResumeBarChart";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function DashboardProducer() {
  const [toggleToggleReferanceLine, setToggleReferanceLine] = useState(false);
  const [yearState, setYearState] = useState("2013");
  const [dashboardGenreList, setDashboardGenreList] = useState("DRAMA");
  const [dashboardCategoryList, setDashboardCategoryList] = useState("Series");
  const [isOriginal, setIsOriginal] = useState("0.0");

  const handleToggleToggleReferanceLine = (year) => {
    setToggleReferanceLine(!toggleToggleReferanceLine);
    setYearState(year);
  };

  const handleDashboardGenreList = (genre) => {
    setDashboardGenreList(genre);
  };
  const handleDashboardCategoryList = (category) => {
    setDashboardCategoryList(category);
  };
  const handleIsOriginal = (original) => {
    setIsOriginal(original);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar
        handleDashboardGenreList={handleDashboardGenreList}
        handleDashboardCategoryList={handleDashboardCategoryList}
        handleIsOriginal={handleIsOriginal}
      />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            {/* <Grid item xs={6} md={6} lg={6}>
              <MDBox mb={6}>
                <JointLineScatterChart
                  color="light"
                  title="Awards received per year netflix original"
                  description="Graph JointLineScatterChart"
                  date="last update 2 days ago"
                />
              </MDBox>
            </Grid> */}
            <Grid item xs={6} md={6} lg={6}>
              <MDBox>
                <BiaxialLineChartGraph1
                  color="light"
                  title="Netflix content rating trend by year"
                  description="Graph1 BiaxialLineChart"
                  date="last update 2 days ago"
                  handleToggleToggleReferanceLine={handleToggleToggleReferanceLine}
                  toggleToggleReferanceLine={toggleToggleReferanceLine}
                  yearState={yearState}
                  dashboardGenreList={dashboardGenreList}
                  dashboardCategoryList={dashboardCategoryList}
                  isOriginal={isOriginal}
                />
              </MDBox>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <MDBox>
                <SimpleScatterChart
                  color="light"
                  title="Box office contribution"
                  description="Graph4 SimpleScatterChart"
                  date="last update 2 days ago"
                  yearState={toggleToggleReferanceLine ? yearState : "2013"}
                  // chartColor={toggleToggleReferanceLine ? "#FF7F50" : "#413ea0"}
                  chartColor={"#413ea0"}
                  toggleToggleReferanceLine={toggleToggleReferanceLine}
                  dashboardGenreList={dashboardGenreList}
                  dashboardCategoryList={dashboardCategoryList}
                  isOriginal={isOriginal}
                />
              </MDBox>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <MDBox>
                <VerticalComposedChart3
                  color="light"
                  title="Popular Directors of the year based on the rating"
                  description="Graph3 VerticalComposedChart"
                  date="last update 2 days ago"
                  yearState={toggleToggleReferanceLine ? yearState : "2013"}
                  chartColor={"#413ea0"}
                  // chartColor={toggleToggleReferanceLine ? "#FF7F50" : "#413ea0"}
                  toggleToggleReferanceLine={toggleToggleReferanceLine}
                  dashboardGenreList={dashboardGenreList}
                  dashboardCategoryList={dashboardCategoryList}
                  isOriginal={isOriginal}
                />
              </MDBox>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <MDBox>
                <VerticalComposedChart1
                  color="light"
                  title="Popular Writers of the year based on the rating"
                  description="Graph2 VerticalComposedChart"
                  date="last update 2 days ago"
                  yearState={toggleToggleReferanceLine ? yearState : "2013"}
                  chartColor={"#413ea0"}
                  // chartColor={toggleToggleReferanceLine ? "#FF7F50" : "#413ea0"}
                  toggleToggleReferanceLine={toggleToggleReferanceLine}
                  dashboardGenreList={dashboardGenreList}
                  dashboardCategoryList={dashboardCategoryList}
                  isOriginal={isOriginal}
                />
              </MDBox>
            </Grid>

            {/* 
            <Grid item xs={6} md={6} lg={6}>
              <MDBox mb={6}>
                <BiaxialLineChart
                  color="light"
                  title="Movie/Series genre ranking per year"
                  description="Graph BiaxialLineChart"
                  date="last update 2 days ago"
                />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <MDBox mb={6}>
                <SimpleActingResumeBarChart
                  mdBoxColor="light"
                  title="Acting resume"
                  description="Graph SimpleActingResumeBarChart"
                  date="last update 2 days ago"
                />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <MDBox mb={6}>
                <SimpleAverageBarChart
                  mdBoxColor="light"
                  title="BoxOffice($) average of the last "
                  description="Graph SimpleAverageBarChart"
                  date="last update 2 days ago"
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
    </DashboardLayout>
  );
}

export default DashboardProducer;
