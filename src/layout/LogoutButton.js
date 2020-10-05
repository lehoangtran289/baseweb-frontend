import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  toolbarButtons: {
    display: "flex",
  },
  logout: {
    marginTop: theme.spacing(1.4),
    marginRight: theme.spacing(0.5),
  },
}));

function LogoutButton(props) {
  const classes = useStyles();

  return (
    <span className={classes.toolbarButtons}>
      <Button
        variant="contained"
        color="primary"
        align="right"
        className={classes.button}
        onClick={props.handleLogout}
        startIcon={<ExitToAppIcon />}
      >
        Logout
      </Button>
    </span>
  );
}

export default LogoutButton;
