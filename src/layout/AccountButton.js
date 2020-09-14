import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbarButtons: {
    display: "flex",
  },
  logout: {
    marginTop: theme.spacing(1.4),
    marginRight: theme.spacing(0.5),
  },
}));

function AccountButton(props) {
  const classes = useStyles();

  return (
    <span className={classes.toolbarButtons}>
      <Typography variant="subtitle1" className={classes.logout}>
        Logout
      </Typography>

      <IconButton color="inherit">
        <ExitToAppIcon onClick={props.handleLogout} align="right" />
      </IconButton>
    </span>
  );
}

export default AccountButton;
