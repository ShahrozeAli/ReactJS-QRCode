import './App.css';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';
import React, {useState, useRef} from 'react';
import QrReader from 'react-qr-reader';

function App() {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [imageUrl, setTmageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const qrRef = useRef(null);
  const generateQRCode = async () => {
    try{
      const response = await QRCode.toDataURL(text);
      setTmageUrl(response);
    }
    catch (error){
      console.log(error);
    }
  };

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    if(result) {
      setScanResultFile(result);
    }
  }

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  }

  return (
    <Container className = {classes.container}>
      <Card>
        <h2 className = {classes.title}> Generate QR code</h2>
        <CardContent>
          <Grid container spacing = {2}>
            <Grid item xl = {4} md = {6} sm = {12} xs={12}>
              <TextField label = "Enter Text here" onChange = {(e) => setText(e.target.value)}></TextField>
              <Button className = {classes.btn} variant="contained" color="primary" onClick = {()=> generateQRCode()}> Generate</Button>
              <br /> <br /> <br />
              {imageUrl ? (<a href={imageUrl} download><img src = {imageUrl} alt = "img" /></a>) : null}
            </Grid>
            <Grid item xl = {4} md = {6} sm = {12} xs={12}>
              <Button className = {classes.btn} variant = "contained" color="secondary" onClick={onScanFile}> Scan QR code </Button>
              <QrReader ref={qrRef} delay={300} style = {{width: '100%'}} onError = {handleErrorFile} onScan = {handleScanFile} legacyMode />
              <h3>Scanned Code: {scanResultFile} </h3>
            </Grid>
            <Grid item xl = {4} md = {6} sm = {12} xs={12}>
              <h3>Qr Code Scan by Web Cam</h3>
              <QrReader delay = {300} style = {{width: '100%'}} orError = {handleErrorWebCam} onScan = {handleScanWebCam}/>
              <h3>Scanned By WebCam Code: {scanResultWebCam} </h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  }
}));



export default App;
