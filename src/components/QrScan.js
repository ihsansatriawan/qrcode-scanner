import React, { useState } from "react";
import { Paper, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import QrReader from "react-qr-reader";

const QrScan = () => {
  const [resultScanner, setResultScanner] = useState("");
  const [resultScannerDate, setResultScannerDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const [openNotif, setOpenNotif] = useState(false);
  const [messageInfo, setMessageInfo] = useState("");

  const handleOpenNotif = (message) => {
    setOpenNotif(true)
    setMessageInfo(message)
  };

  const handleCloseNotif = () => {
    setOpenNotif(false)
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleShowProgress = () => {
    setShowProgress(true)
  }

  const handleCloseProgress = () => {
    setShowProgress(false)
  }

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
    handleShowProgress()
    // const url = "https://script.google.com/macros/s/AKfycbyBIdsfOcqLtB-MoL8BvE5d65q43nrJzYk-boK2Iw/exec?action=insert&tableName=KKP&name=ihsan%20Insom&waktuDatang=Selasa"
    const url = "https://script.google.com/macros/s/AKfycbyBIdsfOcqLtB-MoL8BvE5d65q43nrJzYk-boK2Iw/exec?action=insert"
    const tableNme = "KKP";
    const name = resultScanner
    const waktuDatang = resultScannerDate
    const finalUrl = encodeURI(`${url}&tableName=${tableNme}&name=${name}&waktuDatang=${waktuDatang}`)
    
    fetch(finalUrl, {
      method: 'POST',
      mode: 'cors',
      dataType: 'jsonp'
    })
    .then(resp => {
      console.log("resp: ", resp)
      handleCloseProgress()
      handleOpenNotif("Sukses Menyimpan Data")
    })
    .catch(err => {
      console.log("error: ", err)
      handleCloseProgress()
      handleOpenNotif("GAGAL!")
    })
    //TODO: Do Loader Disable
    handleClose();
  }

  return <Paper style={{ margin: 16, padding: 16 }}>
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      key={'top,center'}
      open={openNotif}
      onClose={handleCloseNotif}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={messageInfo}
    />
    {showProgress ? 
      <>
        <CircularProgress />
        <h1>Loading....</h1>
      </>
     :
      <QrReader
        delay={500}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
    }
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