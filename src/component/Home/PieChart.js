import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const PieChart = ({ className, data, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const piedata = {
    datasets: [
      {
        data: [
          data.totalRecovers,
          data.totalDeaths,
          data.totalCases - data.totalDeaths - data.totalRecovers,
        ],
        backgroundColor: ["#3cba9f", "#c45850", "#3e95cd"],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ["Recovers", "Deaths", "Infected"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = [
    {
      title: "Recovers",
      value: Math.round((data.totalRecovers * 100) / data.totalCases),
      icon: TagFacesIcon,
      color: "#3cba9f",
    },
    {
      title: "Deaths",
      value: Math.round((data.totalDeaths * 100) / data.totalCases),
      icon: SentimentVeryDissatisfiedIcon,
      color: "#c45850",
    },
    {
      title: "Infected",
      value: Math.round(
        ((data.totalCases - data.totalDeaths - data.totalRecovers) * 100) /
          data.totalCases
      ),
      icon: BugReportIcon,
      color: "#3e95cd",
    },
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Reports by categories" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={piedata} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h5">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

PieChart.propTypes = {
  className: PropTypes.string,
};

export default PieChart;
