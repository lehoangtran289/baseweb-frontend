import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  colors,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
  caption: {
    marginTop: theme.spacing(0.4),
  },
}));

const TotalCases = ({ className, data, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="subtitle1">
              TOTAL REPORTED CASES
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {Intl.NumberFormat().format(data.totalCases)}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          {/*<ArrowDownwardIcon className={classes.differenceIcon} />*/}
          <Typography className={classes.differenceValue} variant="body2">
            Cases around the globe
          </Typography>
          <Typography
            className={classes.caption}
            color="textSecondary"
            variant="caption"
          >
            {/*around the globe*/}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalCases.propTypes = {
  className: PropTypes.string,
};

export default TotalCases;
