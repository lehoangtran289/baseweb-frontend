import {
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { failed } from "../../action";
import { authGet, authPut } from "../../api";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { API_URL } from "../../config/config";
import DateFnsUtils from "@date-io/date-fns";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";
import UserChangePassword from "./UserChangePassword";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function UserEdit(props) {
  const history = useHistory();
  const { partyId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [middleName, setMiddleName] = useState();
  const [firstName, setFirstName] = useState();
  const [userName, setUserName] = useState();
  const [partyCode, setPartyCode] = useState();
  const [roles, setRoles] = useState([]);
  const [birthDate, setBirthDate] = useState(new Date());
  const [securityGroups, setSecurityGroups] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  function getSecurityGroups() {
    fetch(API_URL + "/get-security-groups", {
      method: "GET",
      headers: { "Content-Type": "application/json", "X-Auth-Token": token },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let arr = [];
        response.forEach((d) => {
          arr.push(d);
        });
        setSecurityGroups(arr);
        //console.log('getDepartmentList = ',departments);
      });
  }

  useEffect(() => {
    getSecurityGroups();
  }, []);

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleBirthDateChange = (date) => {
    setBirthDate(date);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleMiddleNameChange = (event) => {
    setMiddleName(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handlePartyCodeChange = (event) => {
    setPartyCode(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRoles(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      lastName: lastName,
      middleName: middleName,
      firstName: firstName,
      birthDate: birthDate,
      partyCode: partyCode,
      roles: roles,
      email: email,
    };
    setIsRequesting(true);
    authPut(dispatch, token, "/users/" + partyId, data)
      .then(
        (res) => {
          setIsRequesting(false);
          if (res.status === 401) {
            dispatch(failed());
            throw Error("Unauthorized");
          } else if (res.status === 200) {
            return res.json();
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .then((res) => {
        history.push("/userlogin/" + res);
      });
  };

  useEffect(() => {
    authGet(dispatch, token, "/users/" + partyId).then(
      (res) => {
        console.log(res);
        setFirstName(res.firstName);
        setMiddleName(res.middleName);
        setLastName(res.lastName);
        setBirthDate(res.birthDate);
        setPartyCode(res.partyCode);
        setUserName(res.userLoginId);
        setRoles(res.roles);
        setEmail(res.email);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card>
        <CardHeader
          subheader="Edit the information below"
          title={`Edit User: ${userName}`}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3} className={classes.root}>
            <Grid item>
              <TextField
                id="partyCode"
                label="Party Code"
                value={partyCode}
                variant="outlined"
                onChange={handlePartyCodeChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="firstName"
                label="First Name"
                value={firstName}
                variant="outlined"
                onChange={handleFirstNameChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="middleName"
                label="Middle Name"
                value={middleName}
                onChange={handleMiddleNameChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="lastName"
                label="LastName"
                value={lastName}
                onChange={handleLastNameChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="email"
                label="Email"
                error={!validateEmail(email)}
                helperText={validateEmail(email) ? "" : "Invalid"}
                value={email}
                onChange={handleEmailChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="birthDate"
                label="Date of birth"
                value={birthDate}
                onChange={handleBirthDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="demo-mutiple-name"
                  multiple
                  value={roles}
                  onChange={handleRoleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {securityGroups.map((s) => (
                    <MenuItem key={s.groupId} value={s.groupId}>
                      {s.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-start" p={2}>
          <Button
            disabled={isRequesting}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
          >
            {isRequesting ? <CircularProgress /> : "Save"}
          </Button>
        </Box>
      </Card>
    </MuiPickersUtilsProvider>
  );
}

export default UserEdit;
