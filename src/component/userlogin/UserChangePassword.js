import React, { useState } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import { authPost } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { failed } from "../../action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserChangePassword(props) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const { partyId } = useParams();

  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [isRequesting, setIsRequesting] = useState(false);
  const [isNewPasswordDiff, setIsNewPasswordDiff] = useState(false); // new password must !== current password
  const [isConfirmPasswordMatch, setIsConfirmPasswordMatch] = useState(false); // confirm password must === new password
  const [currentPasswordFailed, setCurrentPasswordFailed] = useState(false);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPasswordFailed(false);
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setIsNewPasswordDiff(event.target.value !== currentPassword);
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsConfirmPasswordMatch(event.target.value === newPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    if (!isNewPasswordDiff) {
      toast.error("New password must be different from current one!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!isConfirmPasswordMatch) {
      toast.error("Confirm password does not match!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    console.log(data, isConfirmPasswordMatch, isNewPasswordDiff);

    if (isConfirmPasswordMatch && isNewPasswordDiff) {
      setIsRequesting(true);
      authPost(dispatch, token, "/change-password", data).then(
        (res) => {
          console.log(res);
          setIsRequesting(false);
          if (res.status === 401) {
            dispatch(failed());
          } else if (res.status === 400) {
            setCurrentPasswordFailed(true);
          } else if (res.status === 200) {
            history.push("/userLogin/" + partyId);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Current Password"
            margin="normal"
            name="currentPassword"
            error={currentPasswordFailed}
            helperText={currentPasswordFailed ? "Wrong password" : ""}
            onChange={handleCurrentPasswordChange}
            type="password"
            value={currentPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="newPassword"
            onChange={handleNewPasswordChange}
            type="password"
            value={newPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleConfirmPasswordChange}
            type="password"
            value={confirmPassword}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-start" p={2}>
          <Button
            disabled={isRequesting}
            onClick={handleSubmit}
            color="primary"
            variant="contained"
          >
            {isRequesting ? <CircularProgress /> : "Update"}
          </Button>
        </Box>
      </Card>
    </div>
  );
}

export default UserChangePassword;
