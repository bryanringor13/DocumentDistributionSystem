/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Intellicare from '../../assets/img/icons/intellicare.png';
import Checked from '../../assets/img/icons/checked.png';
import Box from '../../assets/img/icons/box.png';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import html2pdf from 'html2pdf.js';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTION from '../../store/actions/requestActions';
import * as MESSENGER from '../../store/actions/MessengerActions';
import * as SCHEDULE from '../../store/actions/scheduleAction';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';

import moment from 'moment';
import * as REQ_TYPE from '../../utils/Constants';
import { green } from '@material-ui/core/colors';
import Barcode from 'react-barcode';
import Back from '../../assets/img/back.png';
import ESigniture from '../../assets/img/e-signiture.png';
import Proof from '../../assets/img/proof.png';
import './styles/ViewRequest.scss';
import PrintView from './PrintView';
import PrimaryButton from '../common/Button/PrimaryButton';
import SecondaryButton from '../common/Button/SecondaryButton';
import Loading from '../common/Loading';
import { numberWithComma } from '../../utils/common';
import { API_URL } from '../../utils/Constants';
import { getMessengerDetailsMy } from '../../store/actions/MessengerActions';
import Thumbnail from '../common/Thumnail/Thumbnail';
import CancelRequest from './CancelRequest';
import ViewScheduledRequest from './ViewScheduledRequest';

moment.locale();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // @ts-ignore
    margin: theme.spacing(3),
    '& .MuiCardHeader-root': {
      padding: '24px 0 8px',
      margin: '0 32px',
      borderBottom: '1px solid #E0E6ED',
    },
    '& .MuiCardContent-root': {
      padding: '0 16px 16px 16px !important',
    },
  },
  iconClose: {
    height: '48px',
    width: '48px',
    '& svg': {
      fontSize: '1.5rem',
    },
  },
  barCode: {
    marginRight: '10px',
    '& svg': {
      height: '95px',
      width: '120px',
    },
  },
  headerStyle: {
    fontWeight: 'bold',
  },
  subHeaderStyle: {
    fontSize: 14,
    color: '#7F8080',
    marginBottom: 10,
  },
  cardContentPadding: {
    padding: theme.spacing(0, 2),
  },
  contentSubText: {
    fontSize: 16,
    lineHeight: '24px',
    marginBottom: '8px',
  },
  transmittalText: {
    fontSize: 15,
  },
  contentText: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: '600',
    color: '#2F3542',
  },
  contentItemStyle: {
    marginTop: '24px',
  },
  cardHeader: {
    fontWeight: 'bold',
    padding: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: '#2F3542',
    lineHeight: '24px',
    fontWeight: 'bold',
  },
  contentAudit: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  cardFullWidth: {
    width: '100%',
  },
  headerBG: {
    backgroundColor: '#fff',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  marginTopTextArea: {
    marginTop: theme.spacing(1),
  },
  marginTopView: {
    marginTop: 30,
  },
  textFieldWhite: {
    backgroundColor: 'white',
  },
  transNumberStyle: {
    fontWeight: 'bold',
  },
  auditContectMarginTop: {
    marginTop: 40,
  },
  cancelledWrapper: {
    marginTop: 40,
  },
  dividerStyle: {
    marginBottom: 10,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  containerSize: {
    maxWidth: '389px',
  },
  borderWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px solid #2F3542',
    padding: '16px',
    borderRadius: '2px',
    width: '100%',
  },
  checkHolder: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    lineHeight: '24px',
    '& img': {
      marginRight: '5px',
    },
  },
  titleText: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '32px',
    paddingBottom: '15px',
    borderBottom: '1px solid #A5B0BE',
  },
  barcordWrapper: {
    '& svg': {
      height: '40px',
    },
  },
  brandName: {
    color: 'rgba(47, 53, 66, 0.4)',
  },
  brandSlash: {
    margin: '0 5px',
  },
  requestDetails: {
    margin: '0',
    color: '#2F3542',
    fontWeight: 600,
  },
  backName: {
    marginLeft: '10px',
  },
  signature: {
    maxWidth: '308px',
    maxHeight: '126px',
    '& img': {
      width: '100%',
      height: '126px',
      objectFit: 'cover',
    },
  },
  proof: {
    margin: '0 auto',
    maxWidth: '308px',
    cursor: 'pointer',

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  noProof: {
    textAlign: 'center',
    padding: '20px',
  },
  containerBack: {
    maxWidth: '778px',
  },
  showPrint: {
    display: 'block',
  },
  hidePrint: {
    display: 'none',
  },
  btnCancel: {
    border: '1px solid #41b67f',
  },
  scheduledRequestId: {
    display: 'inline',
    color: '#41b67f',
    cursor: 'pointer',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewRequest = (props) => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const error = useSelector((state) => state.error);
  const messenger = useSelector((state) => state.messenger);
  const schedule = useSelector((state) => state.schedule);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [successSend, setSuccessSend] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [imageLoad, setImageLoad] = useState(false);
  const [allowedPrint, setAllowedPrint] = useState(false);
  const [reassignAction, setReassignAction] = useState(false);
  const [show, setShow] = useState(false);
  const [sourceURL, setSourceUrl] = useState('');

  const [cancelOpen, setCancelOpen] = useState(false);
  const [idForCancel, setIDForCancel] = useState('');

  const setIDForCancelHandler = (id) => {
    setIDForCancel(id);
  };

  const cancelOpenHandler = (toggle, cancledId) => {
    setCancelOpen(toggle);
    setIDForCancelHandler(cancledId);
  };

  const handleViewScheduledRequest = (scheduleRequestId) => {
    dispatch(SCHEDULE.viewScheduledRequest(scheduleRequestId));
    dispatch(SCHEDULE.openScheduledRequest());
  };

  const handleClose = () => {
    if (props.buttonActive === 'unassigned') {
      dispatch(ACTION.allRequest('unassigned'));
    }
    dispatch(MESSENGER.messengerLoading(false));
    dispatch(ACTION.clearNewInfo());
    dispatch(SCHEDULE.closeViewRequest());

    if (schedule.activeTab === 'active_schedule') {
      dispatch(SCHEDULE.allScheduledRequest());
    }

    if (schedule.activeTab === 'history_schedule') {
      dispatch(SCHEDULE.historyScheduleRequest());
    }

    if (props.setRefreshTable) {
      props.setRefreshTable(true);
    }

    // props.closeView(false);
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: successSend,
  });

  function isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const onPrintPreviewSend = () => {
    printOrder();
  };

  const handleOpen = (source) => {
    setSourceUrl(source);
    setOpen(true);
  };

  // const cancelOpenHandler = (toggle) => {
  //   props.setOpenCancel(toggle);
  // };

  const printOrder = useCallback(() => {
    // window.print()
    setShow(true);
    setAllowedPrint(false);
  });

  const imageHandler = (toggle) => {
    setImageLoad(toggle);
  };

  useEffect(() => {
    if (allowedPrint) if (imageLoad) printOrder();
  }, [allowedPrint, imageLoad, printOrder, request.request_info]);

  const reassignRequest = (requestData) => {
    if (requestData.assigned_messenger_id) {
      dispatch(
        getMessengerDetailsMy(
          requestData.assigned_messenger_id,
          props.buttonActive,
          props.onOpenReassign,
          requestData._id
        )
      );
      setReassignAction(true);
    }
  };

  useEffect(() => {
    if (request.reqLoading) {
      if (reassignAction) {
        dispatch(ACTION.getRequest(request.request_info._id));
        dispatch(ACTION.getAuditLogs(request.request_info._id));
        setReassignAction(false);
      }
    }
  }, [dispatch, reassignAction, request.reqLoading, request.request_info._id]);

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  useEffect(() => {
    if (show) {
      const data = document.getElementById('printmee');
      const inTransit =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAAoCAYAAAAxH+4YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARLSURBVHgB7Zo7TFNRGMe/XnQQHCAg6gABHapRiXXQAJPGbjwnanBQSIREMEETwAFFXZQBB3XABDCKoUwUcIOoiVGCgxCRBAahgYlXwtCWocD1/E85tWB5lXKLPeeXEM69vfc7h/v/XucWEzFOdfanmWKWWk06nX+bnRFPiijB5PDGLFdlJiQ4TRBZ05YGdSIu8LvsDFJEFQvemBWLxiL5uRBZEZXEH1yOadVIpwJSRDn6eY0UMhCvhJYEJbQkKKElQQktCUpoSVBCS4ISWhKU0JKghN5jPG43jf78RZHmABnAYP8ADX4b4OOSe3coVLrb7DQ3PbPpNSkn08lakEv7Aay15kYZH1fU1ZIl6xJFCkOEnvw9QV/7PvHxboRGZIwNj2x6jXlmdt8IHRsXR4lHk2meCZ50LJmfg/gN1XV8XPmwllJOpJMRGCJ0uMi/bvNH9OT4BPU5PvBxHjuflHyEj2MPx9F+AWupf9XoG8f9Xdf8jO9v8LjcZBQRE1p49bXyEvrB0vpg/3d+nG29vGFEmjPOknl1nMiiWwh96twZ/pmgt7OH20s9mcYjppddZ8m8xByliNdM8TkedBKLOMyZbb2y47UJW2NsLXPTs//Ygv2Xj5/ysbUghwvf3tTivx9j3FPxoJb2mogJPTbsa1Dwx44FNCv2pgn+ezfpF9EO+4ic3lVngOig/vZdnkoBogzX4WeK3WMrK91ybR6XhzvMeltI0cIWHAPiwRGELTiAmx1jHgHGi25jojriqRsPqvrZEz5ubnzBjxGp4aizSPPWwlwynz3DIweiQdxY1rBVsuYI4tiZmL2OHu4QKAFrUmywtXX1cKHRLwiRcQ0yCuzjOszrCSLgBdaMHWFzNtT4MgacIVWWGn2VpTSRdq35OWR/3bJlZ71dIK7tVsmac6JmYg5Evtvl8n+2yFJtoNDB1ibqKmwL4CQQFo7T8KbJf359DRbN2UbHe0nEhQ58sIfC3EgFe4hdbIvWtyrMVmy2NgiNyO5q6/BtH/sH/OfziovW1Pz9wH/Vde8WiNz9voMLiA4+JT2N5lgdtwc0SDshr9hGWVev8HcEk+NOXo+RKVpY+obgRkXrdpBKaNFYWbIu8qgDED8Upti7AdR2YCsvJStzHpSCR6xBA0jbiUc3tyHF9ioS4K0ZXrigK25vaubnxBZtpyCVi5dAsGlmW7zJCSc/RsZIZXPpQe4LLAeIfHPfR9aU3ae9Rqp33ejksa9GJEHgISa4rawkJFt8/7vauSNdQ3REOZo3dOEbpW3spTEnBPdtv0bICEynu76scTwZ/oEfD3jR5Q5bDRX2EOWBEbsV2J7t9J5QkSp1C/heOowPN1R7RjZr6mtKSVBCS4ISWhKU0JKghJYEJbQkKKElQQktCZqJaIEUUY+mm2iIFFGO7tD05aWbKqqjmgWvV6/SRgsvO1dWlizsOzUHKaIJFrz6Z693xZJ5PMH5B+Bl8QekszctAAAAAElFTkSuQmCC';

      const delivered =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAAoCAYAAADe3YUmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU5SURBVHgB7ZtBTBRXGMe/Xbjs1gMVTW0iVK1h8bS77WmRnkyKFxJMm2DjAZqUizaxRBPLgV4w9dAa2qaGpD2oB9vUYkpKD0AkbSJdToWlF5G0CUWTQpw1HBQT3WX9/m/mG8fZFXZRZ3Hn/ZLN7sy8+d6b7/+9731vCAFidk3378pWZ84HcoHYz3vaa0hTOQRoaDWY6U6Eds8HIPRqVXY6Rzkl8uCew6SpOJZXqzLx6mxVtp8soTUVS01Vtvp8kIVuI03FkyOKBUnjF2q02D5Ci+0jtNg+QovtI7TYPkKL7SO02D5Ci+0jKkrsm//8x58F0hSmmjzg1wu/0J1F44lzoS1haojto3jzW7QRpiemaGbiL2Wn/eMjZLD9vq7P1LUT/T0UiTXSZkf8Ure3ng6830IvGk/EnkvN0tzMbN758StjVLtjGx3tO64euBRu8SxOjk6o+yF2mEXHB2zjcy8D4pfIUmPliC1AmKaWZvXbWDJ4Zk5RmiP7bPcZ6v2+T13fKBD68x/P2r81+XgqNmZca+ch+9joMOh0Vy+t3F2hq4OjaoYKN1LXaXxwTK3BCIIYp/umg+88VUi0++nbS+r3YbZzm4NonG2Co6eP2/fB7vCFIbvdTs4o0n+Kgw/U8zmMU4LPaRvnhzn94p5jbBdtYHNyZIK/Z9WxPKczeA1rPOhDspHXeCq2GzglwTMd6XySU7I4AI6/fO4Hu12aswDSHdohAxQSfOXuPXupgBBYswd6v1bHkyPX7DSZZFHQDg6H0IaVWdKOmuLWvwtqiZC132kbQjuXJNQO0s/jsXJQcRsZq7sPtMHx1te8XW7KXo3LWg2B4Aw45reL5szD7PhqeEClZ4iTVrNjrCi7YVUAmkWaUxz5HdtvFoYQD3ZhH3199/tFDox31bXL5y7l2YVQnac+opP9n6riUNrgHhkrgsg51jme+SI0nukMt0F7BJWXbLqtF7ZPEF6JFW1UKRSOikRN4W7MXC/aVtwSFOnVtL1gO30/LwkAGQWglsB1tG2I7strL7QfO6KWE+wkMFa5XmisydFr5veI2QcCu7WjTQVWa8chFRReUtY0Du6zsAKckBwxHQTBkercuJ2/FgkWZZizBGxBRFTwAE6X2SegHVkZZa3+nEuI89pA7ze0Hu5dQv2b9Twm72Z32cW+esVMdbIvdhY1SJVuQlteoWKBMBAVW5wU78nlhYvsCEIO4ZBeI9FIng3cf9MKkrUoZqz3HIENjBIC93ngaRqXdRkfVLBffvK4aEm0mGm1bu8bdvscBVS6xGeBhUI6LPUNmQiLdG2v181vq2/nup7+/7bd19Yd21Vfkv6fhthxj9VYTD8xVqlLEHTyvBC60LuHF4mnMxsP3/PBibzzmFVNB01R4Bhss7BFQRpHIYUgEcfAmaUAQcJc2a9YswoZxJk9DrzXokRA9Q0BkGpTf06p9rWuraIbBAsKLRRihcZa+/p2sw/eCSDYcA3Pv5PT950lb2c1KFuBBkfB8Sd5e4OixUnnqS67Iobj4byw9VpUgqKUfqTyBpJBBLyuRX8QFv0kLVEwNmyd1gMFW2tnm+rHPVZ5LgRQh9UHQBWOAGiIevtKN1D39xc554nN9k8Ckvae5e1aqX2FHK9eN3L/WmNFm43af1bKXqCthxciP6++irnfy+dxo/+e7SO02D5Ci+0jtNg+QovtI7TYPkKL7SO02D4iGCBaJo0vCOYClCJNxcM6DwUfZjIf6tld4eRoOfcg0x1cjPfMP8hm4nxmiDSVBUQm+mM1k4knXt09/wgSNpPPlG3byQAAAABJRU5ErkJggg==';

      const pickedUp =
        'data:image/png;base64,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';

      const notDelivered =
        'data:image/png;base64,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';

      const notPickedUp =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAAAoCAYAAAAPFkMTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAZwSURBVHgB7ZpLaFRXGMfPjHHRJgFd+Mqm0S4CWqJC2oIrXdiFiugmClapxUVS3YjG7nxkV2PJxuosAimxASPFhNAEqosJlCrEQK1gwUVrupGaLhTyKBbM9f7OnW9yZnKTTMzcewN+P5jcZObe8/jO/3yPM0kZn/8OH66t8LxOz/O2rcxkVhlFiYJUqs//eTq1evVoBaJbMT39m2eMCk6JFs874P/c6b14sT1dMT3dblR0Snys8gXYmfY93QGjKPGyLW0UJX5WqfCURFDhKYmgwlMSQYWnJIIKT0kEFZ6SCCo8JRFUeEoiqPAcxicnzcijx0aJngoTA22Z7834xIRpqN9i9n+2q+Cz/jtZu9jVVZWmpem4KTcjvz82/Xezs96vWbfWH8tOe4XxiUmz51izL74p037hnNm14xNTCm77Lc1fmurK9025OX/lqr1iO2xYTCn2rftwozlycK9ZLsQivOy9YfPs+ZjJ3n9gGrZuyS82YJT+u0P2vcUK7/Slb8yTP//2RfLxnM8+e/6vbT+MzA+3TOvZk2b/7mCxqquqrPDYBKXitt90tDES4Un7DfUfGVM/+3OxLxQLT+zb4I/znROegFc5f+U709F2yZSD8Ykpa3DaLYWWpi98YVTZkNrdO2CfxVvs2vGpFVvP9Sv2vijEoxQSq/CAHciiL7T7CGHdfQO+Rxv1veEaP1TU2mfEW55oueB/9jTfJn+3NB83dZtq52yT8CnPc9+JcxesaOmroX6z70Ev28/oR0KtFentAeutgbHs371z3lCMoNlgQDgXj0rYox2ZE+3M8lC5eeNJ6zZ9YL1oOcFmbDbAXtlfh3MRJ3w8URGr8KorK+1CEuIIj27IdcncuGXvEVhIxEVIwVvynFsEsEi8SvV8dixVM16N59zCQoRCvwiatgUWjnEQ2sM2j/uMzblybbVd77SCKp7TyKM/bLgHRMdmcPty+y4HRAmZJ2OS32U8pBpxhORYq1rExmJIyA0DA4joWLRfbneZwa7rNvyxCN29g/azwa5ree+G97F/+wl0qWTvPcj/XrN+Teg9bAD6ROgInrEcORAsirsxBBZNRMcz7Re/DvryvYqIjnYe/vyjvTInChNZfGlT+uu51maihPGSXtCPOIGweUVB7McprWdPWYNLyC2GXS9Ish6EgVy4ylWQGEqKgOCetQvmZogdYew59lXewIg1rFIEPBvwOS/aZ0xNnzdaAbJwLngQV6gyHhFW3aaNBX/LYrMJbMjPvY/HoT/GJt4wCsh52bz0w5yAcUihEiWx53iIqOnoIT/P6LSv4pzMDS3cK4g3C8Li1FsVAMVndCwuGyEM6UfuExD7XHnXTPteQWX85K/R3PWpFf7sviZsqM/3UTnz7FzpSDlw7ev+LpsnSmIXHrCj8SYslCyKUJB7OQIbn5yYuectq87WM6esgemjZv26edtxheOKAvIerCi0s4mYDwuXudGTP+KRRUXA4llcatYXemu3v8XkrcUeGObLEd37F9NPOUjsmwsOacMWXsIRUAWCHH9AWFgMM3gYDVs323NEBFOKeKUvqj7po7v3J+u1wjxXa8upfA7IeGcEWmuviJJ8kjHwyt4fti9CG0IXL1PY30AJ49xsr2xm7sdevNziISz/FfsGfWZnzTtKEvF4gKEJc3KEIdhF8SeOwQjFGJPqThbCDXPiSbiHvK2j7WJZQwTeiSqT/g81n7EHzHKEc+TgvlnilRyQI5PgSOWqn7x/a/NTiiKpeBFBYU63L3fda+fs9leKJyJ1wQbYSFIYF2wSVqn23xkKnnPSChlL1CT6XS3VqHgIF7yhFBNS4rNYVInubsTgIjQWlW8xygmbgLHQByELQZB/sThz5Xl2Q505mRtTEHJ5j2KD+fKepBnMKTgeCjYQ4pBQbI+I/hmz/S8EzyPwYk/FWOnT7cOl/SJtpwpER8ERB6n/Gxs9942VmYxZTkiFNZ8nw3Ak6FEmxDIOvNBSvtmQscJc413qfOazmXtWyBFUsKnGljyvxZJYqC2VUoyPwaI2WrlEXcpYlzqfxY416go2DP23KCURlr3HU8oLFXbH5eCfNJLwdIIK7x2DQoeiKWk01CqJoMJTEkGFpySCCk9JBBWekggI76VRlJhJG897aBQlXvrSr1es4J/G1OspcfHSvHp1Ov3ezZujr9Pp7Z6vQqMo0YFzG/JFtz21YcPoG5Y7a4lghXrIAAAAAElFTkSuQmCC';

      const cannotDeliver =
        'data:image/png;base64,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';

      const cannotPickup =
        'data:image/png;base64,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';

      const cancelled =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAoCAYAAADXNiVcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUpSURBVHgB7ZlLTFRXGMe/GXBRgQQXvthIZUFSGysJ2uiKaVI2bQjdgIk2KU0X0LohBbuDyK6lhE2rs2hCSiVR2yAxlaTtYkxMbYImtU1csNCOG1JwoQmPxiZye37n8k0vMyAjyK3lnF8yzH2cOefc8/9e55IQw1/Hj1eXBsFQEASHtqXTleLZuiQSY+ZvZ2LHjmwpwpcsLv4aiHjRXSAIms3fhuDhw7pk6eLioHjhXaPSGMFQ0nh8s3hc5FBSPK5S6cV3GC++w3jxHcaL7zBefIfx4juMF99hvPgO48V3mFKJkdn5eRkZvSqT97IyOzdvrzW92SBNjSn5P3Dlx4zc+v2O1Na8LCfeeUsm7/4hI5ev2nvdHe9LRdl22Qj5/W82sYnPQn3Q3WsMYGHZdR42ff6SfNV/Rqp275IXGeZ65adrUj/9wIozO7dgz6H93ZYNi5/f/2YTS9ifmp6RzjOfWeErysrMg70tfR+fMl6fWrr/QHo+/1I88RKL56e/uWQFBjy8tqbaHjc1Ntjj/vSQtXo+9QcP2Hu3frsjI2MmRdzNSkV5mdTu32e9S6MDIRIv4fekjvT5b21bzrvb31sWRTTd0H9ogNtXTDfRMat271x3SsLYSQeZGzdXnHt0TjwDY+EQcROL+CwmpI4dyQmvsMBEA4gK2zMQRgLusZikjcwvN+Xi2X7bDmNCTL4zNyZyxqVtL54bsCKzyK0dXbn7ihqChlcMlPSj0A9tRsbG7ZjFP2teepsOr9FXNLVF56RjxZ32Ygn7FHhQu7+64B6eQQTggweALgTecn30axkfPhcKaYpEvCkKC5c69roVqP1ky9I1YxA/T9hjvCsada6PDsuJ5iXBjdiIRB8qPGPe/uE7OyZzQDiMsVg0vaWOHrFj0U/q6OFlqY3+dE54/PjwWROt2uw84iTWar9Y+rpO2W+8NvTk+7l7iBEF4yHMA1XyyOXvc4ICUQGIOppSbHFWHkab0KAmcn3RBuOz/ZlwTT9EnGLCP3NTURlP58q86EOdQCNhdO5EIOahY8dBLOKH4XehoNJfDXIvnljMQmjKyJ2Xly8bZ6Wow6JjAMrUn6FgGAIhOx/dlq4F1b/SM/DFqv2sFgk533LiY/nhNiZTsCXCO1o/7LbHg72fGM97xYTOT62AeCE7gtqafeZa/7rCYlgfzKy4xdS5aRTge7DndEEfFeXFbeGi7djNaBornFN4Pb8OmZqJN+zHkvM1F6tnadjDw8mRgEgUg9xTofq6PgprgT27zG/nZD1gTIDhqfGQc5mHLczMnDQdcFy1Z6fUv3bAfibvUWROmO/7RY3FM6hhI6T2Q/pi/H8Nrjpss1To6bGuS1zE4vksAAZAKA89vaugTXdHm/WIaFSgQEIYBCg2ZeSjuVQNj7SguZi8zJh8NNfThmhAexVGa5C1CNNJq926snvAuOnbjm93FuF2jmjGfa4xHmOHc0pInMT2bp9wzyLmb2d4cKpwKmKwC3iyxeZyfftXf/DVnHc+KwipWyzCbE54U41HRR3sPW1F0a0jYzMHjJLtaLFgbMyf8fSNHaLy/Frc8YzRbR/tmhrfMMZ4WOIk8XdLSxC9sC2dls3GFn8mjOOFT3slSihcq83zHlfbwEb33ZpmntbP837GZ+E/Ed/zYuD/peswXnyH8eI7jBffYbz4DuPFdxgvvsN48R0G8R+Jx0mSEgS3xeMiY8knJSVt4r3fNR7J48edyZcuXMg+SSbrzAv+MfFsdXDya0b4usTevdl/AG5l5556mzn6AAAAAElFTkSuQmCC';

      let opt = {};

      if (request.request_info.tracking_status > 3) {
        if (request.request_info.tracking_status === 6 || request.request_info.tracking_status === 7) {
          opt = {
            margin: [40, 10, 28, 10],

            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 1 },

            html2canvas: { dpi: 192, logging: true, scale: 4 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
          };
        } else {
          opt = {
            margin: [40, 10, 10, 10],

            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 1 },

            html2canvas: { dpi: 192, logging: true, scale: 4 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
          };
        }
      } else {
        opt = {
          margin: [10, 10, 12, 10],

          filename: 'myfile.pdf',
          image: { type: 'jpeg', quality: 1 },

          html2canvas: { dpi: 192, logging: true, scale: 4 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        };
      }

      let signature = '';

      toDataURL(
        request.request_info.tracking_status === 6
          ? API_URL + '/' + request.request_info.tracking_status_details.delivered.files.signature
          : request.request_info.tracking_status === 7
          ? API_URL + '/' + request.request_info.tracking_status_details.picked_up.files.signature
          : ''
      ).then((dataUrl) => {
        signature = dataUrl;
      });

      html2pdf()
        .from(data)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
          const pageCount = pdf.internal.getNumberOfPages();
          if (request.request_info.tracking_status > 3) {
            for (let count = 1; count <= pageCount; ++count) {
              pdf.setPage(count);
              pdf.setTextColor(0, 0, 0);
              pdf.setFontType('normal');
              pdf.setFontSize(10);
              pdf.text(183, 8, 'Page ' + pdf.internal.getCurrentPageInfo().pageNumber + ' of ' + pageCount);
              pdf.setFontType('normal');
              pdf.setFontSize(12);
              pdf.text(10, 15, 'Transmittal Number');

              pdf.setFontType('bold');
              pdf.setFontSize(18);
              pdf.text(10, 25, request.request_info.transmittal_no);

              if (request.request_info.tracking_status === 4) {
                pdf.addImage(inTransit, 'PNG', 173, 12, 28, 10);
              } else if (request.request_info.tracking_status === 5) {
                pdf.addImage(inTransit, 'PNG', 173, 12, 28, 10);
              } else if (request.request_info.tracking_status === 6) {
                pdf.setFontType('normal');
                pdf.setFontSize(10);
                pdf.text(143, 283, request.request_info.tracking_status_details.delivered.name);
                pdf.text(85, 282, 'Received By:');
                pdf.addImage(signature, 'PNG', 121, 263, 60, 20);
                pdf.addImage(delivered, 'PNG', 173, 12, 28, 10);
                pdf.setDrawColor(165, 176, 190);
                pdf.line(200, 285, 110, 285);

                pdf.setFontType('normal');
                pdf.setFontSize(10);

                pdf.text(120, 290, 'Signature Over Printed Name / Date & Time');
              } else if (request.request_info.tracking_status === 7) {
                pdf.setFontType('normal');
                pdf.setFontSize(10);
                pdf.text(143, 283, request.request_info.tracking_status_details.picked_up.name);
                pdf.text(85, 282, 'Received By:');
                pdf.addImage(signature, 'PNG', 121, 263, 60, 20);
                pdf.addImage(pickedUp, 'PNG', 173, 12, 28, 10);
                pdf.setDrawColor(165, 176, 190);
                pdf.line(200, 285, 110, 285);

                pdf.setFontType('normal');
                pdf.setFontSize(10);

                pdf.text(120, 290, 'Signature Over Printed Name / Date & Time');
              } else if (request.request_info.tracking_status === 8) {
                pdf.addImage(cannotPickup, 'PNG', 168, 12, 33, 10);
              } else if (request.request_info.tracking_status === 9) {
                pdf.addImage(notPickedUp, 'PNG', 168, 12, 33, 10);
              } else if (request.request_info.tracking_status === 10) {
                pdf.addImage(cannotDeliver, 'PNG', 167, 12, 34, 10);
              } else if (request.request_info.tracking_status === 11) {
                pdf.addImage(notDelivered, 'PNG', 168, 12, 33, 10);
              } else if (request.request_info.tracking_status === 12) {
                pdf.addImage(cancelled, 'PNG', 173, 12, 28, 10);
              } else {
                pdf.addImage(delivered, 'PNG', 173, 12, 28, 10);
              }

              if (pdf.internal.getCurrentPageInfo().pageNumber > 1) {
                pdf.setTextColor(47, 53, 66);
                pdf.setFontType('bold');
                pdf.setFontSize(12);
                pdf.text(10, 34, 'Tracking Details');
                pdf.setDrawColor(165, 176, 190);
                pdf.line(10, 38, 201, 38);
              }
            }
          } else {
            pdf.setFontType('normal');
            pdf.setFontSize(10);

            pdf.text(85, 282, 'Received by:');

            pdf.setDrawColor(165, 176, 190);
            pdf.line(200, 285, 110, 285);

            pdf.setFontType('normal');
            pdf.setFontSize(10);

            pdf.text(120, 290, 'Signature Over Printed Name / Date & Time');
          }
          pdf.autoPrint();
          window.open(pdf.output('bloburl'), '_blank');
        });
    }
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, [request.request_info, show]);

  console.log(request.request_info, 'REQUEST INFO');

  return (
    <>
      <Dialog fullScreen open={schedule.openTransmittalRequest} onClose={handleClose} TransitionComponent={Transition}>
        <div className={classes.root} id="no-printme">
          <Grid container>
            {(props.buttonActive === 'assigne_to_me' ||
              props.buttonActive === 'pending_accept' ||
              props.buttonActive === 'accepted_messenger') &&
            !props.openNotif &&
            !props.headerOpenNotif ? (
              <>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs>
                      {/* For Margin */}
                    </Grid>
                    <Grid item xs={7}>
                      <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                        <Grid item xs={12} className={classes.containerBack}>
                          <div style={{ position: 'relative' }}>
                            <div
                              onClick={handleClose}
                              style={{
                                position: 'absolute',
                                top: '-16px',
                                left: '-170px',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <IconButton
                                aria-label="close"
                                className={`btn-custom ${classes.iconClose}`}
                                onClick={handleClose}
                                data-cy="close_btn"
                              >
                                <img className={classes.back} src={Back} alt="logo" />
                              </IconButton>
                              <p className={classes.backName}>Back</p>
                            </div>
                            <p className={classes.brandName} data-cy="breadcrumbs">
                              Requests Dashboard
                              <span className={classes.brandSlash}>/</span>Box Number{' '}
                              {isEmpty(messenger.newMessenger)
                                ? props.getBox && numberWithComma(props.getBox)
                                : numberWithComma(messenger.newMessenger.messenger.box_no)}
                              <span className={classes.brandSlash}>/</span>
                              <span className={classes.requestDetails}>Request Details</span>
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs>
                      {/* For Margin */}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Grid container alignItems="flex-start" justify="flex-end">
                  <Grid item>
                    <IconButton
                      aria-label="close"
                      className={`btn-custom ${classes.iconClose}`}
                      onClick={handleClose}
                      data-cy="close_btn"
                    >
                      <ClearSharpIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs>
                  {/* For Margin */}
                </Grid>
                <Grid item xs={7}>
                  <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                    <Grid item className={classes.containerSize} xs={6}>
                      <Grid container>
                        <Grid item style={{ paddingTop: '5px' }}>
                          <Typography
                            className={clsx('trans-text-style')}
                            data-cy="request_details_transmittal_no_text"
                          >
                            Transmittal Number
                          </Typography>
                          <Typography
                            variant="h4"
                            className={clsx(classes.transNumberStyle)}
                            gutterBottom
                            data-cy="transmittal_number"
                          >
                            {request.request_info ? request.request_info.transmittal_no : null}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={classes.containerSize} xs={6}>
                      <Grid container direction="row" alignItems="center" justify="flex-end">
                        <Grid item data-cy="status_alert_msg">
                          {request.request_info.tracking_status ? (
                            request.request_info.tracking_status === 1 ? (
                              <div className="custom-alert-info">
                                <Alert severity="info">
                                  {REQ_TYPE.TRACKING_STATUS[request.request_info.tracking_status].text}
                                </Alert>
                              </div>
                            ) : request.request_info.tracking_status === 2 ||
                              request.request_info.tracking_status === 3 ? (
                              <Alert severity="warning">
                                {REQ_TYPE.TRACKING_STATUS[request.request_info.tracking_status].text}
                              </Alert>
                            ) : request.request_info.tracking_status > 5 && request.request_info.tracking_status < 8 ? (
                              <Alert severity="success">
                                {REQ_TYPE.TRACKING_STATUS[request.request_info.tracking_status].text}
                              </Alert>
                            ) : request.request_info.tracking_status > 7 &&
                              request.request_info.tracking_status < 14 ? (
                              <Alert severity="error">
                                {
                                  request.request_info.tracking_status === 8
                                    ? 'Cannot Pickup'
                                    : request.request_info.tracking_status === 9
                                    ? 'Not Picked Up'
                                    : request.request_info.tracking_status === 10
                                    ? 'Cannot Deliver'
                                    : request.request_info.tracking_status === 11
                                    ? 'Not Delivered'
                                    : 'Cancelled'
                                  // REQ_TYPE.TRACKING_STATUS[
                                  //   request.request_info.tracking_status
                                  // ].text
                                }
                              </Alert>
                            ) : (
                              <Alert severity="info">
                                {REQ_TYPE.TRACKING_STATUS[request.request_info.tracking_status].text}
                              </Alert>
                            )
                          ) : null}
                          {/* <Alert icon={false} severity="warning" className={classes.alertStyle}>
                                                    <strong>{!!request.request_info.tracking_status ? REQ_TYPE.TRACKING_STATUS[].text : null}</strong> */}
                          {/* <strong>{!!request.request_info ? request.request_info.tracking_status : null}</strong> */}
                          {/* </Alert> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  {/* For Margin */}
                </Grid>
              </Grid>
              {request.reqLoading ? (
                <Grid container>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                  <Grid item xs={7}>
                    <Loading />
                  </Grid>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                </Grid>
              ) : error.id ? (
                <Grid container>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                  <Grid item xs={7}>
                    <Alert severity="error">{error.id}</Alert>
                  </Grid>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                </Grid>
              ) : (
                <Grid container className={classes.marginTopView}>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                  <Grid item xs={7}>
                    <form noValidate autoComplete="off">
                      <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                        <Grid item className={classes.containerSize} xs={6}>
                          <div>
                            <Typography
                              gutterBottom
                              variant="h3"
                              className={classes.headerStyle}
                              data-cy="request_details_text"
                            >
                              Request Details
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item className={classes.containerSize} xs={6}>
                          <Grid container direction="row" alignItems="center" spacing={2} justify="flex-end">
                            {props.buttonActive === 'assigne_to_me' || props.buttonActive === 'pending_accept' ? (
                              <div style={{ marginRight: '8px' }}>
                                <SecondaryButton
                                  onClick={(event) => {
                                    if (isEmpty(messenger.newMessenger)) {
                                      props.onOpenReassign(
                                        true,
                                        request.boxContent.messenger.messenger,
                                        request.boxContent.messenger.box_no,
                                        request.boxContent.messenger.id,
                                        props.requestId
                                      );
                                    } else {
                                      props.onOpenReassign(
                                        true,
                                        messenger.newMessenger.messenger.messenger,
                                        messenger.newMessenger.messenger.box_no,
                                        messenger.newMessenger.messenger.id,
                                        props.requestId
                                      );
                                    }
                                  }}
                                  datacy="view_content_reassign_btn"
                                >
                                  Reassign
                                </SecondaryButton>
                              </div>
                            ) : (
                              <>
                                {userId ? (
                                  userId === request.request_info.requestor_id &&
                                  schedule.scheduledReqMenu === false ? (
                                    request.request_info.tracking_status ? (
                                      request.request_info.tracking_status < 6 ||
                                      (request.request_info.tracking_status > 7 &&
                                        request.request_info.tracking_status < 12 &&
                                        props.buttonActive !== 'history') ? (
                                        <Grid item>
                                          <div>
                                            {props.buttonActive === 'accepted_messenger' ? (
                                              ''
                                            ) : (
                                              <Button
                                                variant="outlined"
                                                color="primary"
                                                className={classes.btnCancel}
                                                onClick={(event) => cancelOpenHandler(true, request.request_info._id)}
                                                data-cy="cancel_btn"
                                              >
                                                Cancel
                                              </Button>
                                            )}
                                          </div>
                                        </Grid>
                                      ) : null
                                    ) : null
                                  ) : (
                                    schedule.scheduledReqMenu &&
                                    request.request_info.tracking_status !== 6 &&
                                    request.request_info.tracking_status !== 7 &&
                                    request.request_info.tracking_status !== 12 && (
                                      <Grid item>
                                        <div>
                                          <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.btnCancel}
                                            onClick={(event) => cancelOpenHandler(true, request.request_info._id)}
                                            data-cy="cancel_btn"
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      </Grid>
                                    )
                                  )
                                ) : null}
                                {props.buttonActive === 'accepted_messenger' &&
                                  request.request_info.tracking_status === 12 && (
                                    <Grid item>
                                      <div className={classes.wrapper}>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          className={buttonClassname}
                                          onClick={(event) => onPrintPreviewSend()}
                                          data-cy="print_btn"
                                        >
                                          Print
                                        </Button>
                                      </div>
                                    </Grid>
                                  )}

                                {props.buttonActive === 'history' &&
                                  request.request_info.tracking_status > 7 &&
                                  request.request_info.tracking_status < 12 && (
                                    <div style={{ marginRight: '8px' }}>
                                      <SecondaryButton
                                        onClick={(event) => {
                                          reassignRequest(request.request_info);
                                        }}
                                      >
                                        Reassign
                                      </SecondaryButton>
                                    </div>
                                  )}

                                <Grid item>
                                  <div className={classes.wrapper}>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      className={buttonClassname}
                                      onClick={(event) => onPrintPreviewSend()}
                                      data-cy="print_btn"
                                    >
                                      Print
                                    </Button>
                                  </div>
                                </Grid>
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                        <Grid item className={classes.containerSize} xs={6}>
                          <div>
                            <Card>
                              <CardHeader
                                title={<Typography className={clsx(classes.cardTitle)}>Request Details</Typography>}
                              />
                              <CardContent className={classes.headerBG}>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Requestor
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info ? request.request_info.requestor_name : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Requestor Department
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info ? request.request_info.requestor_department_name : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    HMO Partner
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info.requestor_hmo_partner_id
                                      ? REQ_TYPE.PARTNER[request.request_info.requestor_hmo_partner_id].text
                                      : 'N/A'}
                                    {/* {!!request.request_info.item ? REQ_TYPE.PARTNER[request.request_info.hmo_partner_id].text : null} */}
                                    {/* {!!request.request_info.item ? REQ_TYPE.PARTNER[request.request_info.item.hmo_partner].text : null} */}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Type of Request
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                    data-cy="request_type"
                                  >
                                    {/* {!!request.request_info ? request.request_info.request_type : null} */}
                                    {request.request_info.request_type
                                      ? REQ_TYPE.REQUEST_TYPE_TEXT[request.request_info.request_type].text
                                      : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Urgent Request?
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                    data-cy="urgent_request_value"
                                  >
                                    {/* {!!request.request_info ? request.request_info.is_urgent : null} */}
                                    {request.request_info.is_urgent
                                      ? REQ_TYPE.IS_URGENT[parseInt(request.request_info.is_urgent)].text
                                      : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Reason for Urgency
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info.reason_urgency
                                      ? request.request_info.reason_urgency.length > 140
                                        ? request.request_info.reason_urgency.substring(0, 143 - 3) + '...'
                                        : request.request_info.reason_urgency
                                      : 'N/A'}
                                  </Typography>
                                </div>

                                {request.request_info.schedule_request && (
                                  <div className={classes.contentItemStyle}>
                                    <Typography
                                      className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                      color="textSecondary"
                                    >
                                      Scheduled Request ID
                                    </Typography>
                                    <Typography
                                      className={clsx(
                                        classes.contentText,
                                        classes.cardContentPadding,
                                        classes.scheduledRequestId
                                      )}
                                      gutterBottom
                                      onClick={() =>
                                        handleViewScheduledRequest(request.request_info.schedule_request_data._id)
                                      }
                                    >
                                      {request.request_info.schedule_request_id
                                        ? request.request_info.schedule_request_id
                                        : 'N/A'}
                                    </Typography>
                                  </div>
                                )}

                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Remarks
                                  </Typography>

                                  {request.request_info.schedule_request && (
                                    <Typography
                                      className={clsx(classes.contentText, classes.cardContentPadding)}
                                      gutterBottom
                                    >
                                      {`Preferred ${REQ_TYPE.REQUEST_TYPE_TEXT[
                                        request.request_info.schedule_request_data.request_details.request_type
                                      ].text.toLowerCase()} time: ${request.request_info.schedule_request_data.request_details.preferred_time.toUpperCase()}`}
                                    </Typography>
                                  )}

                                  {request.request_info.schedule_request &&
                                  request.request_info.remarks.length === 0 ? (
                                    ''
                                  ) : (
                                    <Typography
                                      className={clsx(classes.contentText, classes.cardContentPadding)}
                                      gutterBottom
                                    >
                                      {request.request_info.remarks
                                        ? request.request_info.remarks.length > 140
                                          ? request.request_info.remarks.substring(0, 143 - 3) + '...'
                                          : request.request_info.remarks
                                        : 'N/A'}
                                    </Typography>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {request.request_info.tracking_status === 6 && (
                            <div className={classes.contentItemStyle}>
                              <Card>
                                <CardHeader
                                  title={
                                    <Typography className={clsx(classes.cardTitle)} data-cy="attachments_text">
                                      Attachments
                                    </Typography>
                                  }
                                />
                                <CardContent className={classes.headerBG}>
                                  <div className={classes.contentItemStyle}>
                                    <Typography
                                      className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                      color="textSecondary"
                                    >
                                      Name
                                    </Typography>
                                    <Typography
                                      className={clsx(classes.contentText, classes.cardContentPadding)}
                                      gutterBottom
                                    >
                                      {request.request_info.tracking_status_details &&
                                        request.request_info.tracking_status_details.delivered.name}
                                    </Typography>
                                  </div>
                                  <div className={classes.contentItemStyle}>
                                    <Typography
                                      className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                      color="textSecondary"
                                    >
                                      E-signature
                                    </Typography>
                                    <div className={classes.signature}>
                                      <img
                                        src={
                                          request.request_info.tracking_status_details &&
                                          API_URL +
                                            '/' +
                                            request.request_info.tracking_status_details.delivered.files.signature
                                        }
                                        alt="signature"
                                      />
                                    </div>
                                  </div>
                                  <div className={classes.contentItemStyle}>
                                    <Typography
                                      className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                      color="textSecondary"
                                    >
                                      Proof of Delivery
                                    </Typography>
                                    {request.request_info.tracking_status_details.delivered.files.photo ? (
                                      <div
                                        onClick={() =>
                                          handleOpen(
                                            API_URL +
                                              '/' +
                                              request.request_info.tracking_status_details.delivered.files.photo
                                          )
                                        }
                                        className={classes.proof}
                                      >
                                        <img
                                          src={
                                            request.request_info.tracking_status_details &&
                                            API_URL +
                                              '/' +
                                              request.request_info.tracking_status_details.delivered.files.photo
                                          }
                                          alt="proof"
                                        />
                                      </div>
                                    ) : (
                                      <div className={classes.noProof}>No Image Available</div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                          {request.request_info.tracking_status === 7 && (
                            <div className={classes.contentItemStyle}>
                              <Card>
                                <CardHeader
                                  title={
                                    <Typography className={clsx(classes.cardTitle)} data-cy="attachments_text">
                                      Attachments
                                    </Typography>
                                  }
                                />
                                <CardContent className={classes.headerBG}>
                                  <div className={classes.contentItemStyle}>
                                    <Typography
                                      className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                      color="textSecondary"
                                    >
                                      Name
                                    </Typography>
                                    <Typography
                                      className={clsx(classes.contentText, classes.cardContentPadding)}
                                      gutterBottom
                                    >
                                      {request.request_info.tracking_status_details &&
                                        request.request_info.tracking_status_details.picked_up.name}
                                    </Typography>
                                  </div>
                                  <div className={classes.contentItemStyle}>
                                    <Typography
                                      className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                      color="textSecondary"
                                    >
                                      E-signature
                                    </Typography>
                                    <div className={classes.signature}>
                                      <img
                                        src={
                                          request.request_info.tracking_status_details &&
                                          API_URL +
                                            '/' +
                                            request.request_info.tracking_status_details.picked_up.files.signature
                                        }
                                        alt="signature"
                                      />
                                    </div>
                                  </div>
                                  <div className={classes.contentItemStyle}>
                                    <Typography
                                      className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                      color="textSecondary"
                                    >
                                      Proof of Delivery
                                    </Typography>
                                    {request.request_info.tracking_status_details.picked_up.files.photo ? (
                                      <div
                                        onClick={() =>
                                          handleOpen(
                                            API_URL +
                                              '/' +
                                              request.request_info.tracking_status_details.picked_up.files.photo
                                          )
                                        }
                                        className={classes.proof}
                                      >
                                        <img
                                          src={
                                            request.request_info.tracking_status_details &&
                                            API_URL +
                                              '/' +
                                              request.request_info.tracking_status_details.picked_up.files.photo
                                          }
                                          alt="proof"
                                        />
                                      </div>
                                    ) : (
                                      <div className={classes.noProof}>No Image Available</div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                          {request.request_info.tracking_status === 8 && (
                            <div className={classes.cancelledWrapper}>
                              <Typography className={classes.cardTitle} data-cy="cannot_pickup_text">
                                Cannot Pickup
                              </Typography>

                              <Divider className={classes.contentItemStyle} />
                              <div className={classes.contentItemStyle}>
                                <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                                  {request.request_info.tracking_status_details.cannot_pickup.others
                                    ? 'Others - ' + request.request_info.tracking_status_details.cannot_pickup.others
                                    : request.request_info.tracking_status_details.cannot_pickup.reason
                                    ? request.request_info.tracking_status_details.cannot_pickup.reason
                                    : 'N/A'}
                                </Typography>
                              </div>
                            </div>
                          )}
                          {request.request_info.tracking_status === 10 && (
                            <div className={classes.cancelledWrapper}>
                              <Typography className={classes.cardTitle}>Cannot Deliver</Typography>

                              <Divider className={classes.contentItemStyle} />
                              <div className={classes.contentItemStyle}>
                                <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                                  {request.request_info.tracking_status_details.cannot_deliver.others
                                    ? 'Others - ' + request.request_info.tracking_status_details.cannot_deliver.others
                                    : request.request_info.tracking_status_details.cannot_deliver.reason
                                    ? request.request_info.tracking_status_details.cannot_deliver.reason
                                    : 'N/A'}
                                </Typography>
                              </div>
                            </div>
                          )}
                          {request.request_info.tracking_status === 9 && (
                            <div className={classes.cancelledWrapper}>
                              <Typography className={classes.cardTitle} data-cy="not_picked_up_text">
                                Not Picked Up
                              </Typography>

                              <Divider className={classes.contentItemStyle} />
                              <div className={classes.contentItemStyle}>
                                <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                                  {request.request_info.tracking_status_details.not_picked_up.reason
                                    ? request.request_info.tracking_status_details.not_picked_up.reason
                                    : 'N/A'}
                                </Typography>
                              </div>
                            </div>
                          )}
                          {request.request_info.tracking_status === 11 && (
                            <div className={classes.cancelledWrapper}>
                              <Typography className={classes.cardTitle} data-cy="not_delivered_text">
                                Not Delivered
                              </Typography>

                              <Divider className={classes.contentItemStyle} />
                              <div className={classes.contentItemStyle}>
                                <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                                  {request.request_info.tracking_status_details.not_delivered.reason
                                    ? request.request_info.tracking_status_details.not_delivered.reason
                                    : 'N/A'}
                                </Typography>
                              </div>
                            </div>
                          )}
                          {request.request_info.tracking_status === 12 && (
                            <div className={classes.cancelledWrapper}>
                              <Typography className={classes.cardTitle} data-cy="cancelled_text">
                                Cancelled
                              </Typography>

                              <Divider className={classes.contentItemStyle} />
                              <div className={classes.contentItemStyle}>
                                <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                                  {request.request_info.tracking_status_details &&
                                    request.request_info.tracking_status_details.reason}
                                </Typography>
                              </div>
                            </div>
                          )}

                          {request.audit_logs.length > 0 && (
                            <div className={classes.auditContectMarginTop}>
                              <Typography className={clsx(classes.cardTitle)} data-cy="tracking_details_text">
                                Tracking Details
                              </Typography>
                              <Divider className={classes.contentItemStyle} />
                              {request.audit_logs
                                ? request.audit_logs
                                    .map((res, index) => (
                                      <div className={classes.contentItemStyle} key={index}>
                                        <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                                          {res.date}
                                        </Typography>
                                        <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                                          {res.details}
                                        </Typography>
                                      </div>
                                    ))
                                    .reverse()
                                : null}
                            </div>
                          )}
                        </Grid>
                        <Grid item className={classes.containerSize} xs={6}>
                          <div>
                            <Card>
                              <CardHeader
                                title={
                                  <Typography className={clsx(classes.cardTitle)} data-cy="item_details_text">
                                    Item Details
                                  </Typography>
                                }
                              />
                              <CardContent className={classes.headerBG}>
                                {request.request_info.item
                                  ? request.request_info.item.items.map((resItems, index) => (
                                      <div className={index === 0 ? null : classes.contentItemStyle} key={index}>
                                        {index > 0 ? (
                                          <Divider
                                            variant="middle"
                                            style={{
                                              marginBottom: 15,
                                              height: '0px',
                                              border: '1px dashed #A5B0BE',
                                            }}
                                          />
                                        ) : null}
                                        <div className={classes.contentItemStyle}>
                                          <Typography
                                            className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                            color="textSecondary"
                                          >
                                            Item(s) for Delivery / Pickup
                                          </Typography>
                                          <Typography
                                            className={clsx(classes.contentText, classes.cardContentPadding)}
                                            gutterBottom
                                          >
                                            {REQ_TYPE.REQUEST_ITEM_TYPE[resItems.type] &&
                                              REQ_TYPE.REQUEST_ITEM_TYPE[resItems.type].text}
                                            {/* {resItems.type} */}
                                          </Typography>
                                        </div>
                                        {resItems.type_label === 'Other' ? (
                                          <div className={classes.contentItemStyle}>
                                            <Typography
                                              className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                              color="textSecondary"
                                            >
                                              Other Item
                                            </Typography>
                                            <Typography
                                              className={clsx(classes.contentText, classes.cardContentPadding)}
                                              gutterBottom
                                            >
                                              {resItems.other}
                                            </Typography>
                                          </div>
                                        ) : null}
                                        <div className={classes.contentItemStyle}>
                                          <Typography
                                            className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                            color="textSecondary"
                                          >
                                            No of Item(s)
                                          </Typography>
                                          <Typography
                                            className={clsx(classes.contentText, classes.cardContentPadding)}
                                            gutterBottom
                                          >
                                            {numberWithComma(resItems.count)}
                                          </Typography>
                                        </div>
                                      </div>
                                    ))
                                  : null}
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Expected Delivery / Pickup Date
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info.item ? request.request_info.item.expected_date : null}
                                  </Typography>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          <div className={classes.contentItemStyle}>
                            <Card>
                              <CardHeader
                                title={
                                  <Typography className={clsx(classes.cardTitle)} data-cy="company_details_text">
                                    Company Details
                                  </Typography>
                                }
                              />
                              <CardContent className={classes.headerBG}>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Name
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info.company ? request.request_info.company.name : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Code
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info.company
                                      ? request.request_info.company.code
                                        ? request.request_info.company.code
                                        : 'N/A'
                                      : 'N/A'}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Contact Person
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info.company ? request.request_info.company.contact_person : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Contact Number
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info.company ? request.request_info.company.contact_number : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Department
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {request.request_info.company
                                      ? request.request_info.company.department
                                        ? request.request_info.company.department
                                        : 'N/A'
                                      : 'N/A'}
                                  </Typography>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          <div className={classes.contentItemStyle}>
                            <Card>
                              <CardHeader
                                title={
                                  <Typography className={clsx(classes.cardTitle)} data-cy="address_details_text">
                                    Address
                                  </Typography>
                                }
                              />
                              <CardContent className={classes.headerBG}>
                                <Grid container>
                                  <Grid item xs={12}>
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        State / Province
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {request.request_info.address ? request.request_info.address.province : null}
                                      </Typography>
                                    </div>
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        City / Municipality
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {request.request_info.address ? request.request_info.address.city : null}
                                      </Typography>
                                    </div>
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        Barangay
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {request.request_info.address ? request.request_info.address.barangay : null}
                                      </Typography>
                                    </div>
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        Unit
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {request.request_info.address
                                          ? request.request_info.address.unit
                                            ? request.request_info.address.unit
                                            : 'N/A'
                                          : 'N/A'}
                                      </Typography>
                                    </div>
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        Floor No.
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {request.request_info.address ? request.request_info.address.floor_no : null}
                                      </Typography>
                                    </div>

                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        Building Name
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {request.request_info.address
                                          ? request.request_info.address.building_name
                                          : null}
                                      </Typography>
                                    </div>
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        Street
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {request.request_info.address ? request.request_info.address.street : null}
                                      </Typography>
                                    </div>
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        Country
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {request.request_info.address ? request.request_info.address.country : null}
                                      </Typography>
                                    </div>
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        Zip Code
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {request.request_info.address
                                          ? request.request_info.address.zip_code === 0
                                            ? 'N/A'
                                            : request.request_info.address.zip_code
                                          : 'N/A'}
                                      </Typography>
                                    </div>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </div>
                          <div className={classes.contentItemStyle}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Grid container direction="row" alignItems="center" spacing={2} justify="flex-end">
                                  {props.buttonActive === 'assigne_to_me' || props.buttonActive === 'pending_accept' ? (
                                    <div style={{ marginRight: '8px' }}>
                                      <SecondaryButton
                                        onClick={(event) => {
                                          props.onOpenReassign(
                                            true,
                                            request.boxContent.messenger.messenger,
                                            request.boxContent.messenger.box_no,
                                            request.boxContent.messenger.id,
                                            props.requestId
                                          );
                                        }}
                                      >
                                        Reassign
                                      </SecondaryButton>
                                    </div>
                                  ) : (
                                    <>
                                      {userId ? (
                                        userId === request.request_info.requestor_id ? (
                                          request.request_info.tracking_status ? (
                                            request.request_info.tracking_status < 6 ||
                                            (request.request_info.tracking_status > 7 &&
                                              request.request_info.tracking_status < 12 &&
                                              props.buttonActive !== 'history') ? (
                                              <Grid item>
                                                <div>
                                                  {props.buttonActive === 'accepted_messenger' ? (
                                                    ''
                                                  ) : (
                                                    <Button
                                                      variant="outlined"
                                                      color="primary"
                                                      className={classes.btnCancel}
                                                      onClick={(event) =>
                                                        cancelOpenHandler(true, request.request_info._id)
                                                      }
                                                      data-cy="cancel_btn"
                                                    >
                                                      Cancel
                                                    </Button>
                                                  )}
                                                </div>
                                              </Grid>
                                            ) : null
                                          ) : null
                                        ) : null
                                      ) : null}

                                      {userId ? (
                                        userId === request.request_info.requestor_id ? (
                                          <Grid item>
                                            <div className={classes.wrapper}>
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                className={buttonClassname}
                                                onClick={(event) => onPrintPreviewSend()}
                                                data-cy="print_btn"
                                              >
                                                Print
                                              </Button>
                                            </div>
                                          </Grid>
                                        ) : null
                                      ) : null}
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </div>
        <Thumbnail
          open={open}
          transmittalNo={request.request_info.transmittal_no}
          sourceURL={sourceURL}
          setOpen={setOpen}
          toDataURL={toDataURL}
        />

        <div id="printmee" className={show ? classes.showPrint : classes.hidePrint}>
          <PrintView
            audit_logs={request.audit_logs}
            status={request.request_info.tracking_status}
            request_info={request.request_info}
            imageLoad={imageHandler}
          />
        </div>

        {cancelOpen && <CancelRequest getID={idForCancel} open={cancelOpen} setOpen={cancelOpenHandler} />}
      </Dialog>
      {schedule.openScheduledRequest && <ViewScheduledRequest refreshRequestTable={props.setRefreshTable} />}
    </>
  );
};

ViewRequest.propTypes = {
  // setOpenCancel: PropTypes.any,
  // closeView: PropTypes.any,
  // open: PropTypes.bool,
  getBox: PropTypes.any,
  buttonActive: PropTypes.any,
  onOpenReassign: PropTypes.any,
  requestId: PropTypes.any,
  request: PropTypes.any,
  setRefreshTable: PropTypes.any,
  status: PropTypes.any,
  request_info: PropTypes.any,
  openNotif: PropTypes.any,
  headerOpenNotif: PropTypes.any,
};

export default ViewRequest;
