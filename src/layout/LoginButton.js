import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  toolbarButtons: {
    display: "flex",
  },
  login: {
    marginTop: theme.spacing(1.4),
    marginRight: theme.spacing(0.5),
  },
}));

function LoginButton(props) {
  const classes = useStyles();

  return (
    <span className={classes.toolbarButtons}>
      <Button
        variant="contained"
        color="primary"
        align="right"
        className={classes.button}
        onClick={props.handleLogin}
        startIcon={<LockOpenIcon />}
      >
        Login
      </Button>
    </span>
  );
}

export default LoginButton;
