import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";
import { authGet } from "../../api";

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

function UserCreate(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isRequesting, setIsRequesting] = useState(false);
  const [securityGroups, setSecurityGroups] = useState([]);

  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDate, setBirthDate] = useState(new Date());
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    authGet(dispatch, token, "/get-security-groups").then((res) => {
      setSecurityGroups(res.map((item) => item.groupId));
    });
  }, []);

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleBirthDateChange = (date) => {
    setBirthDate(date);
  };
  const handleRoleChange = (event) => {
    setRoles(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card>
        <CardHeader
          subheader="Fill the information below"
          title={`Create new user`}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3} className={classes.root}>
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
                id="userName"
                label="Username"
                value={userName}
                onChange={handleUserNameChange}
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
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="Password"
                onChange={handlePasswordChange}
                type="password"
                value={password}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="select-gender"
                select
                label="Gender"
                value={gender}
                onChange={handleGenderChange}
                helperText="Select your gender"
              >
                <MenuItem key="male" value="M">
                  Male
                </MenuItem>
                <MenuItem key="female" value="F">
                  Female
                </MenuItem>
              </TextField>
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
                    <MenuItem key={s} value={s}>
                      {s}
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

export default UserCreate;
