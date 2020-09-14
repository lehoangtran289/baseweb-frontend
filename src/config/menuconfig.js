import { buildMapPathMenu } from "../utils/MenuUtils";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import ApartmentSharpIcon from "@material-ui/icons/ApartmentSharp";
import AttachMoneySharpIcon from "@material-ui/icons/AttachMoneySharp";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import DescriptionIcon from "@material-ui/icons/Description";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PersonIcon from "@material-ui/icons/Person";
import StarBorder from "@material-ui/icons/StarBorder";
import StoreMallDirectorySharpIcon from "@material-ui/icons/StoreMallDirectorySharp";
import React from "react";
import { user } from "./menuconfig/user";

export const MENU_LIST = [];
MENU_LIST.push(user);

export const menuIconMap = new Map();
menuIconMap.set("InboxIcon", <InboxIcon />);
menuIconMap.set("StarBorder", <StarBorder />);
menuIconMap.set("PeopleIcon", <PeopleIcon />);
menuIconMap.set("AirportShuttleIcon", <AirportShuttleIcon />);
menuIconMap.set("PeopleOutlineIcon", <PeopleOutlineIcon />);
menuIconMap.set("PersonIcon", <PersonIcon />);
menuIconMap.set("FormatListNumberedIcon", <FormatListNumberedIcon />);
menuIconMap.set("DescriptionIcon", <DescriptionIcon />);
menuIconMap.set("DescriptionOutlinedIcon", <DescriptionOutlinedIcon />);
menuIconMap.set("ApartmentSharpIcon", <ApartmentSharpIcon />);
menuIconMap.set("AttachMoneySharpIcon", <AttachMoneySharpIcon />);
menuIconMap.set("StoreMallDirectorySharpIcon", <StoreMallDirectorySharpIcon />);
menuIconMap.set("HomeSharpIcon", <HomeSharpIcon />);
menuIconMap.set("FastfoodIcon", <FastfoodIcon />);
menuIconMap.set("LocalGroceryStoreIcon", <LocalGroceryStoreIcon />);
menuIconMap.set("BlurOnIcon", <BlurOnIcon />);

export const mapPathMenu = buildMapPathMenu(MENU_LIST);