import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  editButton: {
    marginRight: theme.spacing(1),
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
        <CardHeader
          subheader={
            canEdit
              ? "The information can be edited"
              : "The information is read-only"
          }
          title={`Detail User: ${data.userLoginId}`}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3} className={classes.root}>
            <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-start" p={2}>
          {canEdit ? (
            <Button
              color="primary"
              variant="outlined"
              className={classes.editButton}
              onClick={() => history.push("/userLogin/" + partyId + "/edit")}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          ) : (
            ""
          )}
          {canDelete ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePopup(true)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Card>
    </div>
  );
}

export default ProfileDetails;
