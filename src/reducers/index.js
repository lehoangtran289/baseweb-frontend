import {combineReducers} from "redux";
import auth from "./auth";
import error from "./error";
import menu from "./menu";

export default combineReducers(auth, menu, error);