import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SuccessAlert = ({ message, setError }) => {
  const [alert, setAlert] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
    setError(false);
  };

  return (
    <Snackbar
      open={alert}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity="success" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
