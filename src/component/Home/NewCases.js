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
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.green[900],
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
  caption: {
    marginTop: theme.spacing(0.4),
  },
}));

const NewCases = ({ className, data, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="subtitle1">
              NEW CASES IN {new Date().toLocaleDateString("en-US")}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {Intl.NumberFormat().format(data.totalDiffFromPrevDay)}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            {Math.round((data.totalDiffFromPrevDay * 100) / data.totalCases)} %
          </Typography>
          <Typography
            className={classes.caption}
            color="textSecondary"
            variant="caption"
          >
            Since yesterday
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

NewCases.propTypes = {
  className: PropTypes.string,
};

export default NewCases;
