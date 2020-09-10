import React from 'react';
import {connect} from 'react-redux';
import {login} from "../action";
import SignIn from "../component/SignIn";

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isRequesting: state.auth.isRequesting,
    errorState: state.auth.errorState,
    errorMsg: state.auth.errorMsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestLogin: (username, password) => dispatch(login(username, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);