/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as ACTION from '../../store/actions/requestActions';
import * as MESSENGER_ACTION from '../../store/actions/MessengerActions';
import * as SCHEDULE from '../../store/actions/scheduleAction';
import * as REQ_TYPE from '../../utils/Constants';
import Alert from '@material-ui/lab/Alert';
import './styles/RequestTable.scss';
import CommonTable from '../common/CommonTable/CommonTable';
import { TableCell, Button } from '@material-ui/core';
import { numberWithComma } from '../../utils/common';
import Urgent from '../../assets/img/urgent.png';
moment.locale();

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiAlert-root': {
      padding: '6px 8px 6px 8px',
      width: 'fit-content',
      '& .MuiAlert-message': {
        padding: '0',
      },
    },
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  actionBtn: {
    marginRight: '10px !important',
    padding: '4px 3px !important',
    fontSize: '14px',
  },
  urgent: {
    marginRight: '10px',
  },
  noUrgrent: {
    marginLeft: '26px',
  },
}));

const RequestTable = ({
  // setidForCancel,
  reqViewDetails,
  disabledAction = true,
  buttonActive,
  tableAction,
  boxViewContent,
  components,
  onOpenReassignBox,
  content,
  datacyTable,
}) => {
  const request = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [rows, setRows] = useState('');

  // const [tableOption, setTableOption] = useState('')
  const [userRoles, setUserRoles] = useState(JSON.parse(localStorage.getItem('roles')));

  const data = REQ_TYPE.TABLE_COMPONENT[localStorage.getItem('user_type')].tableColumn[buttonActive];

  useEffect(() => {
    for (const a of request.request) {
      if (a.admin_asst_name === '') {
        a.admin_asst_name = 'N/A';
      }
    }
    setRows(request.request);
    // for (const a of data) {
    //   if (a.field === 'box_no') {
    //     a.width = 50
    //     a.cellStyle = {
    //       width: '50px !important',
    //       maxWidth: '50px !important',
    //       whiteSpace: 'nowrap',
    //     }
    //     a.headerStyle = {
    //       width: '50px !important',
    //       maxWidth: '50px !important',
    //     }
    //   }
    // }

    if (
      buttonActive === 'assigne_to_me' ||
      buttonActive === 'pending_accept' ||
      buttonActive === 'accepted_messenger'
    ) {
      for (const data of request.request) {
        const copyArr = [];
        if (data.assigned_locations) {
          for (const item of data.assigned_locations) {
            const lastItem = data.assigned_locations[data.assigned_locations.length - 1];

            if (lastItem.city === item.city) {
              copyArr.push(`${item.city}${' '}`);
            } else {
              copyArr.push(`${item.city}, ${' '}`);
            }
          }
          data.box_assignment = copyArr;
          data.capacity = `${data.capacity}`;
        }
      }
    }

    // eslint-disable-next-line
  }, []);

  const handleClick = (index) => {
    dispatch(MESSENGER_ACTION.clearMessenger);
    if (buttonActive === 'assigne_to_me') {
      boxViewContent(true);
      dispatch(ACTION.getBoxView(index, 'assigne_to_me'));
    } else if (buttonActive === 'pending_accept') {
      boxViewContent(true);
      dispatch(ACTION.getBoxView(index, 'pending_accept'));
    } else if (buttonActive === 'accepted_messenger') {
      boxViewContent(true);
      dispatch(ACTION.getBoxView(index, 'accepted_messenger'));
    } else {
      const trans_id = index;
      // setidForCancel(trans_id);

      dispatch(ACTION.getRequest(trans_id));
      dispatch(ACTION.getAuditLogs(trans_id));
      dispatch(SCHEDULE.openTransmittalRequest());

      // reqViewDetails(true);
    }
  };

  const columns = data;
  const componentsTable = {
    Cell: (props) => {
      let valueItem = '';

      if (props.columnDef.title === 'Status') {
        const data = REQ_TYPE.TRACKING_STATUS.find((item) => item.code === props.value);
        valueItem = data.text;
      }
      return props.columnDef.title === 'Status' ? (
        props.value === 1 ? (
          <TableCell>
            {' '}
            <div className="custom-alert-info">
              <Alert severity="info">{valueItem}</Alert>
            </div>
          </TableCell>
        ) : props.value === 2 || props.value === 3 ? (
          <TableCell>
            {' '}
            <Alert severity="warning">{valueItem}</Alert>
          </TableCell>
        ) : props.value > 5 && props.value < 8 ? (
          <TableCell>
            {' '}
            <Alert severity="success">{valueItem}</Alert>
          </TableCell>
        ) : props.value > 7 && props.value < 14 ? (
          <TableCell>
            {' '}
            <Alert severity="error">{props.value === 12 ? 'Cancelled' : valueItem}</Alert>
          </TableCell>
        ) : props.value > 3 && props.value < 6 ? (
          <TableCell>
            {' '}
            <Alert severity="info">{valueItem}</Alert>
          </TableCell>
        ) : (
          <TableCell>{props.value}</TableCell>
        )
      ) : props.columnDef.field === 'transmittal_no' && props.rowData.is_urgent === 1 ? (
        <TableCell>
          <img className={classes.urgent} src={Urgent} alt="urgent" />
          {props.value}
        </TableCell>
      ) : props.columnDef.field === 'transmittal_no' && props.rowData.is_urgent !== 1 ? (
        <TableCell>
          <div className={classes.noUrgrent}> {props.value}</div>
        </TableCell>
      ) : props.columnDef.title === 'Type' ? (
        parseInt(props.value) > 0 ? (
          <TableCell>{REQ_TYPE.REQUEST_TYPE_TEXT[props.value].text}</TableCell>
        ) : (
          <TableCell>{props.value}</TableCell>
        )
      ) : props.columnDef.title === 'Action' ? (
        <TableCell>
          {buttonActive === 'accepted_messenger' ? (
            ''
          ) : (
            <Button variant="outlined" color="primary" className={classes.actionBtn} style={{ marginLeft: '5px' }}>
              Reassign
            </Button>
          )}
          {buttonActive === 'pending_acceptance' || buttonActive === 'accepted_messenger' ? (
            ''
          ) : (
            <Button variant="contained" color="primary" className={classes.actionBtn}>
              Send
            </Button>
          )}
          {buttonActive === 'assigne_to_me' ||
          buttonActive === 'pending_acceptance' ||
          buttonActive === 'accepted_messenger' ? (
            ''
          ) : (
            <Button variant={'outlined'} color="primary" className={classes.actionBtn} style={{ marginLeft: '5px' }}>
              View Content
            </Button>
          )}

          {buttonActive === 'accepted_messenger' && (
            <Button variant="contained" color="primary" style={{ minWidth: '20px' }} className={classes.actionBtn}>
              Print
            </Button>
          )}
        </TableCell>
      ) : props.columnDef.title === 'Capacity' ? (
        <TableCell>{numberWithComma(props.value)}</TableCell>
      ) : (
        <TableCell>{props.value}</TableCell>
      );
    },
  };

  return (
    <div className={classes.root}>
      <CommonTable
        columns={columns}
        data={rows}
        actions={
          buttonActive === 'assigne_to_me' ||
          buttonActive === 'pending_accept' ||
          buttonActive === 'accepted_messenger' ||
          buttonActive === ' my_request' ||
          buttonActive === 'history'
            ? tableAction
            : null
        }
        onRowClick={(rowData) => handleClick(rowData.id)}
        components={
          buttonActive === 'assigne_to_me' ||
          buttonActive === 'pending_accept' ||
          buttonActive === 'accepted_messenger' ||
          buttonActive === ' my_request' ||
          buttonActive === ' all_request' ||
          buttonActive === 'history'
            ? components
            : componentsTable
        }
        buttonActive={buttonActive}
        disabledAction={disabledAction}
        datacyTable={datacyTable}
        // options={tableOption}
        // localization={localization}
      />
    </div>
  );
};

RequestTable.propTypes = {
  value: PropTypes.any,
  // setidForCancel: PropTypes.any,
  reqViewDetails: PropTypes.any,
  columnDef: PropTypes.any,
  buttonActive: PropTypes.any,
  disabledAction: PropTypes.any,
  content: PropTypes.any,
  components: PropTypes.any,
  boxViewContent: PropTypes.any,
  tableAction: PropTypes.any,
  onOpenReassignBox: PropTypes.any,
  datacyTable: PropTypes.string,
  rowData: PropTypes.any,
};
export default RequestTable;
