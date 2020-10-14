import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Line } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { API_URL } from "../../config/config";
import Loading from "../../common/Loading";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const menuListItem = ["Last 7 days", "Last 14 days", "Last 21 days"];

const LineChart = ({ className, ...rest }) => {
  const classes = useStyles();
  const [isRequesting, setIsRequesting] = useState(false);
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [recovers, setRecovers] = useState([]);
  const [days, setDays] = useState([]); // date in x axis

  const [selectedIndex, setSelectedIndex] = useState(0); // number of days
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsRequesting(true);
    const numberOfDays = (selectedIndex + 1) * 7;
    fetch(API_URL + `/covid/data-last-nth-days?days=${numberOfDays}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsRequesting(false);
        setCases(res.map((i) => i.totalCases));
        setDays(res.map((i) => i.date));
        setDeaths(res.map((i) => i.totalDeaths));
        setRecovers(res.map((i) => i.totalRecovers));
      })
      .catch((error) => console.log(error));
  }, [selectedIndex]);

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

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={
          <>
            <Button
              endIcon={<ArrowDropDownIcon />}
              size="small"
              variant="text"
              onClick={handleClickListItem}
            >
              {`Last ${(selectedIndex + 1) * 7} days`}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuListItem.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
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
