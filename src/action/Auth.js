import {API_URL} from "../config/config";

export const LOGIN_REQUESTING = "LOGIN_REQUESTING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// thunk action creator!
export const logout = () => {
  return (dispatch, getState) => {
    dispatch(requesting()); //create action

    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("X-Auth-Token", getState().auth.token);

    fetch(`${API_URL}/logout`, {
      method: "GET",
      headers: headers
    })
      .then(res => {
        if (res.ok) {
          dispatch(logoutsuccess());
        }
        return res.json();
      })
      .then(
        res => {
        },
        error => {
          dispatch(failed());
        }
      );
  }
}

// thunk action creator!
export const login = (username, password) => {
  return (dispatch) => {
    dispatch(requesting()); //create action

    const headers = new Headers();

    headers.set(
      "Authorization", "Basic " + base64.encode(username + ":" + password)
    );
    headers.append("Content-type", "application/json");

    fetch(`${API_URL}/`, {
      method: "GET",
      headers: headers
    })
      .then(res => {
        if (res.ok) {
          dispatch(success(res.headers.get("X-Auth-Token")));
        } else if (res.status === 401) {
          dispatch(failed(true, "Username or password is incorrect!!"));
        }
        return res.json();
      })
      .then(
        res => {
        },
        error => {
        }
      );
  };
};


const requesting = () => {
  return {
    type: LOGIN_REQUESTING
  }
}

export const failed = (errorState = false, errorMsg = null) => {
  return {
    type: LOGIN_FAILURE,
    errorState: errorState,
    errorMsg: errorMsg,
  }
}

const success = token => {
  return {
    type: LOGIN_SUCCESS,
    token: token
  };
};

const logoutsuccess = token => {
  return {
    type: LOGOUT_SUCCESS,
  };
};