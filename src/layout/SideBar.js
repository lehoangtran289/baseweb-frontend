import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { MENU_LIST, menuIconMap } from "../config/menuconfig";
import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // justifyContent: "flex",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menu: {
    paddingTop: theme.spacing(10),
  },
  largeIcon: {
    width: 50,
    height: 50,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function SideBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const open = props.open;
  const selectedFunction = useSelector((state) => state.menu.selectedFunction);

  const [openCollapse, setOpenCollapse] = useState(new Set());

  const handleOpenCollapseMenu = (id) => {
    let newCollapse = new Set(openCollapse);
    if (!newCollapse.has(id)) {
      newCollapse.add(id);
      setOpenCollapse(newCollapse);
    }
  };

  const handleListClick = (id) => {
    let newCollapse = new Set(openCollapse);
    if (newCollapse.has(id)) newCollapse.delete(id);
    else newCollapse.add(id);
    setOpenCollapse(newCollapse);
  };

  useEffect(() => {
    if (selectedFunction !== null) {
      if (
        selectedFunction.parent !== null &&
        selectedFunction.parent !== undefined
      ) {
        handleOpenCollapseMenu(selectedFunction.parent.id);

        if (
          selectedFunction.parent.parent !== null &&
          selectedFunction.parent.parent !== undefined
        ) {
          handleOpenCollapseMenu(selectedFunction.parent.parent.id);
        }
      }
    }
  }, [selectedFunction]);

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

        <div className={clsx(classes.menu)}>
          <ListMenuItem
            configs={MENU_LIST}
            openCollapse={openCollapse}
            menu={props.menu}
            handleListClick={handleListClick}
            iconMap={menuIconMap}
            selectedFunction={selectedFunction}
          />
        </div>
      </Drawer>
    </div>
  );
}

function ListMenuItem(props) {
  let menuItems = props.configs.map((config) => (
    <MenuItem
      config={config}
      openCollapse={props.openCollapse}
      menu={props.menu}
      handleListClick={props.handleListClick}
      iconMap={props.iconMap}
      selectedFunction={props.selectedFunction}
    />
  ));

  return (
    <List component="div" disablePadding>
      {menuItems}
    </List>
  );
}

function MenuItem(props) {
  let classes = useStyles();
  if (!props.config.isPublic) if (!props.menu.has(props.config.id)) return "";
  let icon = (
    <ListItemIcon>{props.iconMap.get(props.config.icon)}</ListItemIcon>
  );
  let menu = {};
  if (
    props.config.child !== undefined &&
    props.config.child !== null &&
    props.config.child.length !== 0
  ) {
    menu = (
      <div>
        <ListItem button onClick={() => props.handleListClick(props.config.id)}>
          {icon}
          <ListItemText primary={props.config.text} />
          {props.openCollapse.has(props.config.id) ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItem>
        <Collapse
          in={props.openCollapse.has(props.config.id)}
          timeout="auto"
          unmountOnExit
        >
          <ListMenuItem
            iconMap={props.iconMap}
            configs={props.config.child}
            openCollapse={props.openCollapse}
            menu={props.menu}
            handleListClick={props.handleListClick}
            selectedFunction={props.selectedFunction}
          />
        </Collapse>
      </div>
    );
  } else {
    menu = (
      <div>
        <ListItem
          button
          className={classes.nested}
          component={Link}
          selected={
            props.selectedFunction !== null
              ? props.config.id === props.selectedFunction.id ||
                props.config.path === props.selectedFunction.path
              : false
          }
          to={process.env.PUBLIC_URL + props.config.path}
        >
          {icon}
          <ListItemText primary={props.config.text} />
        </ListItem>
      </div>
    );
  }
  return menu;
}

export default SideBar;
