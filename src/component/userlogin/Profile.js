import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import ProgressBar from "../../common/ProgressBar";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
  Text: {
    marginTop: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  dateText: {},
}));

const Profile = ({ className, data, ...rest }) => {
  const classes = useStyles();
  const types = ["image/png", "image/jpeg"];
  const [selectedFile, setSelectedFile] = useState(null);

  /**
   * This input event handler is triggered when user upload their image file
   */
  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file && types.includes(file.type)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Invalid selected image type (png or jpeg only)", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="subtitle1"
            className={classes.Text}
          >
            {data.fullName}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format("hh:mm A")} GTM-7`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth component="label" variant="text">
          Upload picture
          <input
            type="file"
            accept="image/*"
            className={classes.input}
            onChange={fileSelectedHandler}
          />
        </Button>
      </CardActions>
      {selectedFile && (
        <ProgressBar file={selectedFile} setFile={setSelectedFile} />
      )}
    </Card>
  );
};

export default Profile;
