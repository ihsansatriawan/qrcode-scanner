import React, { useState } from "react";
import { Paper, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import QrReader from "react-qr-reader";

const QrScan = () => {
  const [resultScanner, setResultScanner] = useState("");
  const [resultScannerDate, setResultScannerDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleError = (err) => {
    console.error(err);
  }

  const handleScan = (data) => {
    if (data) {
      setResultScanner(data)
      setResultScannerDate(new Date().toString())
      handleClickOpen()
    }
  }

  const handleSubmit = () => {
    console.log("resultScanner: ", resultScanner)
    console.log("resultScannerDate: ", resultScannerDate)
    //TODO: Do Submit data to Google Sheet here

    handleClose();
  }

  return <Paper style={{ margin: 16, padding: 16 }}>
    <QrReader
      delay={500}
      onError={handleError}
      onScan={handleScan}
      style={{ width: "100%" }}
    />
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Yakin Simpan Data ?</DialogTitle>
      <DialogContent>
        <DialogContentText>Nama Peserta: {resultScanner}</DialogContentText>
        <DialogContentText>Jam Presensi: {resultScannerDate}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  </Paper>
}

export default QrScan;