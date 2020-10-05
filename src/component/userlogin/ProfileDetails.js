import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function ProfileDetails({
  data,
  history,
  handlePopup,
  canDelete,
  canEdit,
  partyId,
}) {
  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" align="left">
            Detail User: {data.userLoginId}
            {canDelete ? (
              <IconButton
                style={{ float: "right" }}
                onClick={() => handlePopup(true)}
                aria-label="Delete"
                component="span"
              >
                <DeleteIcon color="error" />
              </IconButton>
            ) : (
              ""
            )}
            {canEdit ? (
              <IconButton
                style={{ float: "right" }}
                onClick={() => history.push("/userLogin/" + partyId + "/edit")}
                aria-label="Edit"
                component="span"
              >
                <EditIcon color="action" />
              </IconButton>
            ) : (
              ""
            )}
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="firstName"
                label="First Name"
                value={data.firstName}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="middleName"
                label="Middle Name"
                value={data.middleName}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="lastName"
                label="LastName"
                value={data.lastName}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="birthDate"
                label="Birth Date"
                value={data.birthDate}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="userLoginId"
                label="UserName"
                value={data.userLoginId}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileDetails;
