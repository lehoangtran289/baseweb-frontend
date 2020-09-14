import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getMenu, logout } from "../action";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountButton from "./AccountButton";
import SideBar from "./SideBar";

const drawerWidth = 340;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarTitle: {
    marginLeft: theme.spacing(2),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  hideButton: {
    marginLeft: drawerWidth / 2 - theme.spacing(6),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  toolbarButtons: {
    marginLeft: "auto",
    marginRight: -theme.spacing(0.5),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  content1: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  largeIcon: {
    width: 50,
    height: 50,
  },
}));

function Layout(props) {
  const { children } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (props.isMenuGot === false) props.getMenu();
  });

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    props.processLogout();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div
            className={clsx({
              [classes.appBarTitle]: open,
            })}
          >
            <Typography variant="h6" noWrap>
              Basic web infrastructure
            </Typography>
          </div>
          <span className={classes.toolbarButtons}>
            <AccountButton handleLogout={handleLogout} />
          </span>
        </Toolbar>
      </AppBar>

      <SideBar
        open={open}
        handleDrawerClose={handleDrawerClose}
        menu={props.menu}
      />

      <main
        className={clsx(classes.content1, {
          // [classes.contentShift]: open,
        })}
      >
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    menu: state.menu.menu,
    isMenuGot: state.menu.isMenuGot,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMenu: () => dispatch(getMenu()),
    processLogout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
