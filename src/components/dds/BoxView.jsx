import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import html2pdf from 'html2pdf.js';
import { Button, Grid, MenuItem, Select } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import imageDefault from '../../assets/img/default.png';
import imageFull from '../../assets/img/full.png';

import * as ACTION from '../../store/actions/requestActions';

import { numberWithComma } from '../../utils/common';

import PrintSummaryList from './PrintSummaryList';

import './styles/BoxView.scss';

const useStyles = makeStyles((theme) => ({
  circle: {
    height: '12px !important',
    color: 'green',
    margin: '4px 4px 4px 4px',
    width: '12px !important',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // height: 450,
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  messengerName: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    whiteSpace: 'nowrap',
    fontWeight: 600,
    transform: 'translate(-50%, 50%)',
  },
  location: {
    position: 'absolute',
    bottom: '57px',
    left: '20px',
  },
  capacity: {
    position: 'absolute',
    bottom: '27px',
    left: '20px',
  },
  actionBtn: {
    padding: '4px 3px !important',

    fontSize: '14px',
  },
  loadingBtn: {
    height: '32px',
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  address: {
    marginBottom: '5px',
    lineHeight: 1.8,
    marginLeft: '30px',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '48px',
  },
  summaryHolder: {
    marginTop: '10px',
    textAlign: 'center',
  },
  subTitle: {
    paddingBottom: '5px',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '32px',
    width: '100%',
    borderBottom: '1px solid #A5B0BE',
  },
  areaWrapper: {
    display: 'flex',
    // flexBasis: '33.33%',
  },
  areaItem: {
    marginBottom: '-12px',
  },
  cities: {
    '& p': {
      fontWeight: 600,
    },
  },
  messengerWrapper: {
    display: 'flex',

    justifyContent: 'space-between',
  },
  name: {
    flexBasis: '33.33%',
    marginTop: '10px',
    '& span': {
      fontWeight: 600,
    },
  },
  adminAssistant: {
    '& span': {
      fontWeight: 600,
    },
  },
  adminTitle: {
    width: '300px',
  },
  tableHeader: {
    borderBottom: '1px solid #A5B0BE',
    justifyContent: 'space-between',
    '& p': {
      fontWeight: 600,
    },
  },
  tableContent: {
    marginBottom: '-15px',
    justifyContent: 'space-between',
  },
  itemHolder: {
    flexBasis: '11%',
  },
  itemAddress: {
    flexBasis: '30%',
  },
  itemContact: {
    flexBasis: '12%',
  },
  itemTransmital: {
    flexBasis: '15%',
  },
  content: {
    height: '250px',
  },
  signiture: {
    marginTop: '60px',
    position: 'relative',
    borderTop: '2px solid #A5B0BE',
    '& p': {
      textAlign: 'center',
      fontWeight: 500,
    },
    '&::before': {
      left: '-112px',
      top: '-35px',
      fontWeight: 500,
      position: 'absolute',
      content: '"Received By:"',
    },
  },
  messengerInfo: {
    marginLeft: '16px',
    fontWeight: '600',
  },
  messengerInfoDate: {
    marginLeft: '39px',
    fontWeight: '600',
  },
  paginationWrapper: {
    width: '100%',
  },
  contentWrapper: {
    width: '100%',
  },
  showPrint: {
    display: 'block',
  },
  showPrintSpace: {
    marginTop: '600px',
  },
  hidePrint: {
    display: 'none',
  },
}));

const BoxView = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [refInd, setRefIn] = useState();
  const request = useSelector((state) => state.request);
  const [showPrint, setShowPrint] = useState(false);
  const [boxViewPrint, setBoxViewPrint] = useState(false);
  const [printLoad, setPrintLoad] = useState(false);
  const boxContentHandler = (toggle, id) => {
    dispatch(ACTION.clearActionFilter());
    dispatch(ACTION.getBoxView(id, props.content));
    props.boxViewContent(toggle);

    props.getId(id);
  };

  const handlePagination = (page) => {
    dispatch(ACTION.setPaginationPage(page));
    dispatch(ACTION.allRequest(props.content));
  };

  const onPrintPreviewSend = (id, idx) => {
    dispatch(ACTION.getBoxSummary(id));
    setBoxViewPrint(true);
    setPrintLoad(true);
    setRefIn(idx);
    setTimeout(() => {
      setPrintLoad(false);
    }, 7000);

    console.log(id);
    // dispatch(ACTION.getBoxViewData(id, props.content))
  };

  const handleRowPerPage = (event) => {
    dispatch(ACTION.setPageLimit(event.target.value));
    dispatch(ACTION.allRequest(props.content));
  };

  const onSend = (id) => {
    dispatch(ACTION.assignedSend(id, props.content));
  };

  const proceedPrint = () => {
    // window.print()
    setShowPrint(true);
  };

  useEffect(() => {
    dispatch(ACTION.getCountRequest());
    if (!request.boxLoad && Object.keys(request.summaryList).length !== 0 && props.content === 'accepted_messenger') {
      proceedPrint();

      setTimeout(() => {
        dispatch(ACTION.removeBoxViewData());
        setBoxViewPrint(false);
      }, 3000);
    }
  }, [request.boxLoad, request.boxContent, dispatch, request.summaryList.summary, request.summaryList, props.content]);

  useEffect(() => {
    if (showPrint && boxViewPrint) {
      const data = document.getElementById('print-summary');
      const img =
        'data:image/png;base64,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';

      const opt = {
        margin: [28, 10, 16, 10],

        filename: 'summary-list.pdf',
        image: { type: 'jpeg', quality: 1 },

        html2canvas: { dpi: 96, logging: true, scale: 4 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };
      html2pdf()
        .from(data)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
          const pageCount = pdf.internal.getNumberOfPages();

          for (let count = 1; count <= pageCount; ++count) {
            console.log('anuarpogi');
            pdf.setPage(count);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(269, 12, 'Page ' + pdf.internal.getCurrentPageInfo().pageNumber + ' of ' + pageCount);
            pdf.addImage(img, 'PNG', 10, 5, 45, 15);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(63, 12, '7/F Feliza Building, 108 V.A. Rufino St., Legaspi Village, Makati City, Philippines');
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(63, 17, 'Tels.: (632) 789-400 Fax # (632)750-7009');
          }
          pdf.autoPrint();
          window.open(pdf.output('bloburl'), '_blank');
        });
    }
    setTimeout(() => {
      setShowPrint(false);
    }, 2000);
  }, [boxViewPrint, showPrint]);

  console.log(showPrint, 'SHOW PRINT BOX VIEW');

  return (
    <div className={classes.contentWrapper}>
      <div id="no-printme-box">
        <Grid container spacing={4} data-cy="box_view">
          {request.request
            ? request.request.map((assigntome, index) => {
                return (
                  <Grid item xs={3} key={index}>
                    <div
                      style={{ position: 'relative', cursor: 'pointer' }}
                      onClick={(event) => boxContentHandler(true, assigntome.id)}
                    >
                      <img
                        src={assigntome.exceed_capacity ? imageFull : imageDefault}
                        style={{ width: '100%' }}
                        data-cy="box_img"
                      />
                      <div className={classes.messengerName} data-cy="box_name">
                        {assigntome.messenger}
                      </div>
                      <div className={classes.location} data-cy="box_location">
                        {assigntome.assigned_locations ? assigntome.assigned_locations[0].city : null}
                        {assigntome.assigned_locations
                          ? parseInt(assigntome.assigned_locations.length) - 1 > 0
                            ? ', +' + (parseInt(assigntome.assigned_locations.length) - 1) + ' ' + 'Cities'
                            : null
                          : null}
                      </div>
                      <div
                        className={classes.capacity}
                        style={{
                          color: assigntome.exceed_capacity ? '#FA5656' : '#2F3542',
                        }}
                        data-cy="box_capacity"
                      >
                        Capacity
                        <span style={{ marginLeft: '4px' }}>{numberWithComma(assigntome.capacity)}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        paddingTop: '10px',
                        position: 'relative',
                      }}
                    >
                      <div className={classes.btnGroup}>
                        {props.content === 'accepted_messenger' ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              data-cy="box_print"
                              className={refInd === index && printLoad ? classes.loadingBtn : classes.actionBtn}
                              onClick={() => onPrintPreviewSend(assigntome.id, index)}
                            >
                              {/* <CircularProgress
                                classes={{ root: classes.circle }}
                              /> */}
                              {refInd === index && printLoad ? (
                                <CircularProgress classes={{ root: classes.circle }} />
                              ) : (
                                'Print'
                              )}
                            </Button>
                            {/* <Button
                              variant="contained"
                              color="primary"
                              data-cy="box_print"
                              className={
                                refInd === index && printLoad
                                  ? classes.loadingBtn
                                  : classes.actionBtn
                              }
                              onClick={() =>
                                onPrintPreviewSend(assigntome.id, index)
                              }
                            >
                              Print
                            </Button> */}
                          </>
                        ) : null}

                        {props.content === 'assigne_to_me' ? (
                          <Button
                            variant="contained"
                            color="primary"
                            data-cy="box_send"
                            className={classes.actionBtn}
                            onClick={() => onSend(assigntome.id)}
                          >
                            Send
                          </Button>
                        ) : null}

                        <Button
                          variant={props.content === 'pending_accept' ? 'contained' : 'outlined'}
                          color="primary"
                          data-cy="box_view_content"
                          className={classes.actionBtn}
                          style={{ marginLeft: '15px' }}
                          onClick={(event) => boxContentHandler(true, assigntome.id)}
                        >
                          View Content
                        </Button>
                        {props.content === 'assigne_to_me' || props.content === 'pending_accept' ? (
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.actionBtn}
                            data-cy="box_reassign"
                            style={{ marginLeft: '15px' }}
                            onClick={() => props.onOpenReassignBox(true, assigntome)}
                          >
                            Reassign
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </Grid>
                );
              })
            : null}
        </Grid>
        <div className={classes.paginationWrapper}>
          <div className="pagination-custom">
            <Pagination
              count={request.table ? Math.ceil(request.table.total_count / request.table.page_limit) : 1}
              onChange={(event, page) => handlePagination(page)}
              page={request.table ? request.table.page_number : 0}
            />
          </div>
          <div className="pagination-custom">
            <Select
              value={request.table ? request.searchParams.pageLimit : 0}
              inputProps={{ 'aria-label': 'Without label' }}
              variant="outlined"
              onChange={(event) => handleRowPerPage(event)}
              className="select-option-custom"
            >
              <MenuItem value={10}>Show 10</MenuItem>
              <MenuItem value={15}>Show 15</MenuItem>
              <MenuItem value={100}>Show 100</MenuItem>
            </Select>
          </div>
          <div style={{ marginTop: '24px', marginLeft: '7px', fontSize: '16px' }}>
            {request.table
              ? request.table.page_limit * request.table.page_number -
                request.table.page_limit +
                (request.request.length ? 1 : 0)
              : 0}{' '}
            -{' '}
            {request.table
              ? request.table.page_number * request.table.page_limit > request.table.total_count
                ? request.table.total_count
                : request.table.page_number * request.table.page_limit
              : 0}{' '}
            out of {request.table ? request.table.total_count : 0}
          </div>
        </div>
      </div>

      <div className={showPrint && request ? classes.showPrintSpace : classes.hidePrint}></div>
      <div id="print-summary" className={showPrint && request ? classes.showPrint : classes.hidePrint}>
        <PrintSummaryList request={request} />
      </div>
    </div>
  );
};

BoxView.propTypes = {
  boxViewContent: PropTypes.any,
  content: PropTypes.any,
  getId: PropTypes.any,
  onOpenReassignBox: PropTypes.any,
};

export default BoxView;
