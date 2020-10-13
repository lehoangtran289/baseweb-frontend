import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  colors,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
  caption: {
    marginTop: theme.spacing(0.4),
  },
}));

const TotalDeaths = ({ className, data, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="subtitle1">
              TOTAL DEATHS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {Intl.NumberFormat().format(data.totalDeaths)}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          {/*<ArrowDownwardIcon className={classes.differenceIcon} />*/}
          <Typography className={classes.differenceValue} variant="body2">
            Deaths around the globe
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

TotalDeaths.propTypes = {
  className: PropTypes.string,
};

export default TotalDeaths;
