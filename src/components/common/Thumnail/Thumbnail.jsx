/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import html2pdf from 'html2pdf.js';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Grid from '@material-ui/core/Grid';

import CircleDownload from '../../../assets/img/icons/circle-download.svg';

const useStyles = makeStyles((theme) => ({
  dialogBackrop: {
    backgroundColor: '#595d68',
  },
  dialogContent: {
    padding: '24px 40px 50px',
  },
  imgDetails: {
    maxHeight: '800px',
    width: '100%',
    objectFit: 'contain',
  },
  imgTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  btnDownload: {
    cursor: 'pointer',
    margin: '8px 0 0 8px',
  },
}));

const Thumbnail = ({ setOpen, open, sourceURL, transmittalNo, toDataURL }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDownload = (url, number) => {
  //   fetch(url)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob)
  //       const downloadLink = document.createElement('a')
  //       downloadLink.href = url
  //       downloadLink.download = `${transmittalNo}_proof_of_delivery`
  //       downloadLink.click()
  //     })
  // }

  const handleDownload = (url, number) => {
    const proof = document.getElementById('proof-image');
    let proofImage = '';
    toDataURL(url).then((dataURL) => (proofImage = dataURL));

    const opt = {
      filename: `${number}_proof_of_delivery.pdf`,
      image: { type: 'png', quality: 1 },

      html2canvas: { dpi: 192, logging: true, scale: 4 },
      jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .from(proof)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then(function (pdf) {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(proofImage);

        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        const processedImgWidth = imgWidth / 2;
        const processedImgHeight = imgHeight / 2;

        const setX = pageWidth / 2 - processedImgWidth / 1.8;
        const setY = pageHeight / 2 - processedImgHeight / 1.7;

        pdf.addImage(proofImage, 'PNG', setX, setY);
      })
      .save();
  };

  return (
    <Dialog
      open={open}
      BackdropProps={{
        classes: {
          root: classes.dialogBackrop,
        },
      }}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      disableBackdropClick
    >
      <DialogContent className={classes.dialogContent}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" alignItems="center" justify="space-between">
              <div className={classes.imgTitle}>
                <div>{`${transmittalNo}_proof_of_delivery.png`}</div>
                <div className={classes.btnDownload}>
                  <img
                    src={CircleDownload}
                    alt="Download Icon"
                    onClick={() => handleDownload(sourceURL, transmittalNo)}
                  />
                </div>
              </div>
              <Grid item>
                <IconButton aria-label="close" className="btn-cancel-custom" onClick={handleClose}>
                  <ClearSharpIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: '24px' }}>
              <div id="proof-image"></div>
              <img className={classes.imgDetails} src={sourceURL} alt="thumnail" />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
Thumbnail.propTypes = {
  setOpen: PropTypes.any,
  open: PropTypes.bool,
  img: PropTypes.any,
  sourceURL: PropTypes.any,
  transmittalNo: PropTypes.any,
  toDataURL: PropTypes.any,
};
export default Thumbnail;
