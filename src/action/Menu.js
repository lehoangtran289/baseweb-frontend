import api from "../api";

export const MENU_REQUESTING = "MENU_REQUESTING";
export const MENU_REQUEST_SUCCESS = "MENU_REQUEST_SUCCESS";
export const MENU_REQUEST_FAILURE = "MENU_REQUEST_FAILURE";
export const SELECTED_FUNCTION_UPDATE = "SELECTED_FUNCTION_UPDATE";

// thunk action creator!
// Note that the function also receives getState() which lets you choose what to dispatch next.
export const getMenu = () => {
  return (dispatch, getState) => {
    dispatch(menuRequesting());
    api.getMenu(dispatch, getState().auth.token, "/menu").then(
      (data) => {
        console.log("getmenudata: " + data);
        if (!data) dispatch(menuRequestFailed());
        else dispatch(menuRequestSuccess(data));
      },
      (error) => {
        console.log("getMenuError: " + error);
        dispatch(menuRequestFailed());
      }
    );
  };
};

const menuRequesting = () => {
  return {
    type: MENU_REQUESTING,
  };
};

const menuRequestFailed = () => {
  return {
    type: MENU_REQUEST_FAILURE,
  };
};

const menuRequestSuccess = (menu) => {
  return {
    type: MENU_REQUEST_SUCCESS,
    menu: menu,
  };
};

export const updateSelectedFunction = (selectedFunction) => {
  return {
    type: SELECTED_FUNCTION_UPDATE,
    selectedFunction: selectedFunction,
  };
};
