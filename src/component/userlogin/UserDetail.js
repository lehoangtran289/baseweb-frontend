import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ProfileDetails from "./ProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { authDelete, authGet } from "../../api";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Profile from "./Profile";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

function UserDetail(props) {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { partyId } = useParams();

  const [data, setData] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    authGet(dispatch, token, "/users/" + partyId).then(
      (res) => {
        setData(res);
        if (res._links !== undefined) {
          if (res._links.edit !== undefined) setCanEdit(true);
          if (res._links.delete !== undefined) setCanDelete(true);
        }
      },
      (err) => {
        setData([]);
      }
    );
  }, []);

  const handlePopup = (value) => {
    setOpenPopup(value);
  };

  const deleteUser = (value) => {
    setIsWaiting(true);
    authDelete(dispatch, token, "/userLogin/" + partyId).then(
      (res) => {
        if (res === true) {
          setOpenPopup(false);
          history.push("/users/list");
        }
      },
      (error) => {
        setData([]);
      }
    );
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={openPopup}
        onClose={() => handlePopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to delete this user. This action can not be un-done.
            Do you want to continue, Click yes to continue or click cancel
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={isWaiting}
            onClick={() => deleteUser()}
            color="primary"
          >
            {isWaiting ? <CircularProgress color="secondary" /> : "Yes"}
          </Button>
          <Button
            disabled={isWaiting}
            onClick={() => handlePopup(false)}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Container>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile data={data} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails
              history={history}
              data={data}
              handlePopup={handlePopup}
              canDelete={canDelete}
              canEdit={canEdit}
              partyId={partyId}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UserDetail;
