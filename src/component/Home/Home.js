import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NewCases from "./NewCases";
import TotalDeaths from "./TotalDeaths";
import TotalRecovers from "./TotalRecovers";
import Sales from "./Sales";
import PieChart from "./PieChart";
import LatestProducts from "./LatestProducts";
import LatestOrders from "./LatestOrders";
import { API_URL } from "../../config/config";
import TotalCases from "./TotalCases";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  title: {
    margin: theme.spacing(2),
  },
}));

function Home(props) {
  const classes = useStyles();

  const [data, setData] = useState({});

  useEffect(() => {
    fetch(API_URL + "/covid/data-general", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData({ ...res });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="root">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid className={classes.title} item lg={12} sm={12} xl={12} xs={12}>
            <Typography align="center" color="textPrimary" variant="h3">
              COVID19 LATEST REPORT
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              This application lists the latest reported COVID19 across the
              globe. Reports are updated frequently once a day
            </Typography>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCases data={data} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <NewCases data={data} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalDeaths data={data} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalRecovers data={data} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <PieChart data={data} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
