import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Line } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { API_URL } from "../../config/config";
import Loading from "../../common/Loading";

const useStyles = makeStyles(() => ({
  root: {},
}));

const LineChart = ({ className, ...rest }) => {
  const classes = useStyles();

  const [isRequesting, setIsRequesting] = useState(false);
  const [data, setData] = useState([]);
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [recovers, setRecovers] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    setIsRequesting(true);
    fetch(API_URL + "/covid/data-last-7days", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsRequesting(false);
        setData([...res]);
        setCases(res.map((i) => i.totalCases));
        setDays(res.map((i) => i.date));
        setDeaths(res.map((i) => i.totalDeaths));
        setRecovers(res.map((i) => i.totalRecovers));
      })
      .catch((error) => console.log(error));
  }, []);

  const dataInChart = {
    datasets: [
      {
        data: [...cases],
        label: "Total Cases",
        borderColor: "#3e95cd",
        fill: false,
      },
      {
        data: [...deaths],
        label: "Deaths",
        borderColor: "#c45850",
        fill: false,
      },
      {
        data: [...recovers],
        label: "Recovers",
        borderColor: "#3cba9f",
        fill: false,
      },
    ],
    labels: [...days],
  };

  const options = {
    title: {
      display: true,
      text: "World covid-19 reported statistics (in number of cases)",
    },
    legend: {
      display: true,
      position: "bottom",
    },
  };

  console.log(days, cases, deaths, recovers);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
            Last 7 days
          </Button>
        }
        title="Latest reports"
      />
      <Divider />

      <CardContent>
        <Box height={400} position="relative">
          {isRequesting ? (
            <Loading />
          ) : (
            <Line data={dataInChart} options={options} />
          )}
        </Box>
      </CardContent>

      <Divider />

      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          href="#details-report"
        >
          Details
        </Button>
      </Box>
    </Card>
  );
};

export default LineChart;
