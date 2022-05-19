// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// import JointLineScatterChart from "examples/Charts/Recharts/JointLineScatterChart";
import BiaxialLineChart from "examples/Charts/Recharts/BiaxialLineChart";
import BiaxialLineChartGraph1 from "examples/Charts/Recharts/NewVersion/Graph1";
import VerticalComposedChart1 from "examples/Charts/Recharts/NewVersion/Graph2";
import SimpleAverageBarChart from "examples/Charts/Recharts/SimpleAverageBarChart";
import SimpleActingResumeBarChart from "examples/Charts/Recharts/SimpleActingResumeBarChart";
// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function DashboardProducer() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
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
              <MDBox mb={6}>
                <VerticalComposedChart1
                  color="light"
                  title="Netflix Popular Writers based on the Ratings of their Movies/Series"
                  description="Graph VerticalComposedChart"
                  date="last update 2 days ago"
                />
              </MDBox>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <MDBox mb={6}>
                <BiaxialLineChartGraph1
                  color="light"
                  title="New Version Movie/Series genre ranking per year"
                  description="Graph BiaxialLineChart"
                  date="last update 2 days ago"
                />
              </MDBox>
            </Grid>

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
            </Grid>
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
      <Footer />
    </DashboardLayout>
  );
}

export default DashboardProducer;
