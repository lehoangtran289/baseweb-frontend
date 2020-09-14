import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 150,
    textAlign: "center",
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

function NotFoundError(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item>
          <div className={classes.content}>
            <Typography variant="h4">Error: Page Not found.</Typography>

            <Typography variant="subtitle2">
              Please try again and make sure that the URL is correct.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default NotFoundError;
