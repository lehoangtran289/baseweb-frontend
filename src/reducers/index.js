import auth from "./auth";
import error from "./error";
import menu from "./menu";
import {combineReducers} from "redux";

export default combineReducers({auth, menu, error});
