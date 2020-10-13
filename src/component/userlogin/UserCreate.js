import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import { authGet, authPost } from "../../api";
import Chip from "@material-ui/core/Chip";
import { withFormik } from "formik";
import * as Yup from "yup";
import { failed } from "../../action";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  content: {
    marginBottom: theme.spacing(3),
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function UserCreate(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [isRequesting, setIsRequesting] = useState(false);
  const [securityGroups, setSecurityGroups] = useState([]);

  useEffect(() => {
    authGet(dispatch, token, "/get-security-groups").then((res) => {
      setSecurityGroups(res);
    });
  }, []);

  const handleSubmit = () => {
    const data = {
      userName: props.values.userName,
      password: props.values.password,
      email: props.values.email,
      roles: props.values.roles,
      firstName: props.values.firstName,
      lastName: props.values.lastName,
      middleName: props.values.middleName,
      gender: props.values.gender,
      birthDate: props.values.birthDate,
      partyCode: "",
    };
    console.log(data);

    setIsRequesting(true);
    authPost(dispatch, token, "/users", data)
      .then(
        (res) => {
          console.log(res);
          setIsRequesting(false);
          if (res.status === 401) {
            dispatch(failed());
            throw Error("Unauthorized");
          } else if (res.status === 409) {
            toast.error("Username or Email already exist", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (res.status === 201) {
            return res.json();
          }
        },
        (error) => console.log(error)
      )
      .then((res) => {
        history.push("/userLogin/" + res);
      });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card>
        <CardHeader
          subheader="Fill the information below"
          title={`Create new user`}
        />
        <Divider />
        <CardContent className={classes.content}>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={4} alignContent="stretch">
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                margin="dense"
                error={!!props.errors.firstName}
                helperText={props.errors.firstName}
                value={props.values.firstName}
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="middleName"
                name="middleName"
                label="Middle Name"
                fullWidth
                margin="dense"
                value={props.values.middleName}
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="lastName"
                name="lastName"
                label="LastName"
                fullWidth
                margin="dense"
                value={props.values.lastName}
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="userName"
                name="userName"
                label="Username"
                fullWidth
                margin="dense"
                error={!!props.errors.userName}
                helperText={props.errors.userName}
                value={props.values.userName}
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                error={!!props.errors.email}
                helperText={props.errors.email}
                value={props.values.email}
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                margin="dense"
                name="password"
                error={!!props.errors.password}
                helperText={props.errors.password}
                onChange={props.handleChange}
                type="password"
                value={props.values.password}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="select-gender"
                name="gender"
                select
                fullWidth
                label="Gender"
                error={!!props.errors.gender}
                helperText={props.errors.gender}
                value={props.values.gender}
                onChange={props.handleChange}
              >
                <MenuItem key="male" value="M">
                  Male
                </MenuItem>
                <MenuItem key="female" value="F">
                  Female
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="dense"
                id="birthDate"
                name="birthDate"
                label="Date of birth"
                error={!!props.errors.birthDate}
                helperText={props.errors.birthDate}
                value={props.values.birthDate}
                onChange={(val) => props.setFieldValue("birthDate", val)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="role-label">Role(s)</InputLabel>
                <Select
                  labelId="role-label"
                  id="role-id"
                  multiple
                  autoWidth
                  value={props.values.roles}
                  onChange={props.handleChange}
                  input={
                    <Input
                      name="roles"
                      id="select-role(s)"
                      error={!!props.errors.roles}
                      helperText={props.errors.roles}
                    />
                  }
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {securityGroups.map((item) => (
                    <MenuItem
                      key={item.groupId}
                      value={item.groupId}
                      style={getStyles(item, props.values.roles, theme)}
                    >
                      {item.groupId}
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

const UserCreateForm = withFormik({
  mapPropsToValues() {
    return {
      userName: "",
      password: "",
      email: "",
      roles: [],
      firstName: "",
      lastName: "",
      middleName: "",
      gender: "",
      birthDate: new Date(),
      partyCode: "",
    };
  },
  validationSchema: Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid!"),
    firstName: Yup.string().required("FirstName is required"),
    gender: Yup.string().required("Gender is required"),
    roles: Yup.array().required("Role(s) is empty"),
    birthDate: Yup.date().max(new Date(), "birthDate is invalid").required(),
  }),
})(UserCreate);

export default UserCreateForm;
