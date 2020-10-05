import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  colors,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const TotalProfit = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="subtitle1">
              TOTAL PROFIT
            </Typography>
            <Typography color="textPrimary" variant="h6">
              $23,200
            </Typography>
          </Grid>
          {/*<Grid item>*/}
          {/*  <Avatar className={classes.avatar}>*/}
          {/*    <AttachMoneyIcon />*/}
          {/*  </Avatar>*/}
          {/*</Grid>*/}
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string,
};

export default TotalProfit;
