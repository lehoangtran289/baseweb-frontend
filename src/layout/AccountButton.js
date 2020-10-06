import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authGet } from "../api";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import withStyles from "@material-ui/core/styles/withStyles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

function AccountButton(props) {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [partyId, setPartyId] = useState("");

  useEffect(() => {
    authGet(dispatch, token, "/my-account").then(
      (res) => {
        if (res) {
          setName(res.name);
          setUserName(res.user);
          setPartyId(res.partyId);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewAccount = () => {
    handleClose();
    history.push(`/userLogin/${partyId}`);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        startIcon={<AccountCircleIcon />}
      >
        Profile
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleViewAccount}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My account" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={props.handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default AccountButton;
