import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PersonIcon from "@material-ui/icons/Person";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";

const drawerWidth = 340;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbarContent: {
    float: "left",
    width: drawerWidth / 2,
    paddingLeft: drawerWidth / 16 - 10,
    color: "#4d40c7",
  },
  icon: {
    float: "right",
    marginLeft: drawerWidth / 2,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: 0,
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menu: {
    paddingTop: theme.spacing(3),
  },
  largeIcon: {
    width: 50,
    height: 50,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SideBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const open = props.open;

  const selectedFunction = useSelector((state) => state.menu.selectedFunction);

  const [openCollapse, setOpenCollapse] = useState(new Set());

  const handleListClick = (id) => {
    let newCollapse = new Set(openCollapse);
    if (newCollapse.has(id)) {
      newCollapse.delete(id);
      setOpenCollapse(newCollapse);
    } else {
      newCollapse.add(id);
      setOpenCollapse(newCollapse);
    }
  };

  return (
    <div>
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }}
      >
        <div className={classes.drawerHeader}>
          {/*<img src={logo} height={25} width={25}/>*/}
          <h2 className={classes.toolbarContent}>{"Options"}</h2>
          <IconButton
            className={classes.icon}
            onClick={props.handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <Divider />

        <List>
          {props.menu.has("MENU_USER") ? (
            <div>
              <ListItem button onClick={() => handleListClick("MENU_USER")}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Tài khoản" />
                {openCollapse.has("MENU_USER") ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              <Collapse
                in={openCollapse.has("MENU_USER")}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {props.menu.has("MENU_USER_CREATE") ? (
                    <ListItem
                      button
                      className={classes.nested}
                      component={Link}
                      to={process.env.PUBLIC_URL + "/userLogin/create"}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Tạo mới" />
                    </ListItem>
                  ) : (
                    ""
                  )}
                  {props.menu.has("MENU_USER_LIST") ? (
                    <ListItem
                      button
                      className={classes.nested}
                      component={Link}
                      to={process.env.PUBLIC_URL + "/userLogin/list"}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Danh sách" />
                    </ListItem>
                  ) : (
                    ""
                  )}
                </List>
              </Collapse>
            </div>
          ) : (
            ""
          )}
        </List>
      </Drawer>
    </div>
  );
}
