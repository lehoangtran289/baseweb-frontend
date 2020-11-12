import React, { useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import useStorage from "../hooks/useStorage";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  progressBar: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
  },
}));

function ProgressBar({ setFile, file }) {
  const classes = useStyles();
  const { url, progress } = useStorage(file);
  console.log(progress);

  useEffect(() => {
    if (url) {
      console.log(url);
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <LinearProgress
      className={classes.progressBar}
      variant="determinate"
      value={progress}
    />
  );
}

export default ProgressBar;
