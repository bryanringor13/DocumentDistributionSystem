import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  reassignMessenger,
  reassignMessengerAssignToMe,
  reassignMessengerPending,
} from '../../store/actions/MessengerActions';
import * as ACTION from '../../store/actions/requestActions';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from '../common/Button/PrimaryButton';
import SecondaryButton from '../common/Button/SecondaryButton';
import { useSelector, useDispatch } from 'react-redux';
import { numberWithComma } from '../../utils/common';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: '12px',
    lineHeight: '20px',
    color: 'rgba(43, 45, 51, 0.8)',
  },
  reassignWrapper: {
    padding: '16px 24px',
    height: '82vh',
    '& .MuiOutlinedInput-root': {
      width: '100%',
    },
  },
  messengerItem: {
    borderTop: '1px solid #d8d8d8',
    paddingTop: '24px',
  },
  text: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    marginTop: '0',
    marginBottom: '10px',
  },
  select: {
    marginBottom: '5px',
  },
  reassignBtn: {
    padding: ' 16px 24px',
    display: 'flex',
    borderTop: '1px solid #d8d8d8',
    alignItems: 'center',
    justifyContent: ' space-between',
  },
}));

const ReassignContent = ({ reassign, close, buttonActive, closeOnReassign }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.messenger.messengerDetails);
  // const messenger = useSelector((state) => state.messenger.newMessenger)

  const [newMessenger, setNewMessenger] = useState('');
  const [boxNo, setBoxNo] = useState({});
  const onChangeMessenger = (data) => {
    const item = request.find((item) => item.messenger_id === data);
    setBoxNo(item);
    setNewMessenger(item.id);
  };

  const handleClose = () => {
    close();
  };

  const onReasignMessenger = () => {
    const newData = {
      new_messenger_id: newMessenger,
    };
    if (buttonActive === 'assigne_to_me' && !reassign.requestId) {
      dispatch(reassignMessengerAssignToMe(reassign.messengerId, newData, closeOnReassign));
      dispatch(ACTION.allRequest(buttonActive));

      dispatch(ACTION.getCountRequest());
    } else if (buttonActive === 'pending_accept' && !reassign.requestId) {
      dispatch(reassignMessengerPending(reassign.messengerId, newData, closeOnReassign));
      dispatch(ACTION.allRequest(buttonActive));
      dispatch(ACTION.getCountRequest());
    } else if (buttonActive === 'assigne_to_me' && reassign.requestId) {
      dispatch(reassignMessenger(reassign.requestId, newData, closeOnReassign, buttonActive, reassign.messengerId));

      dispatch(ACTION.getCountRequest());
    } else if (buttonActive === 'pending_accept' && reassign.requestId) {
      dispatch(reassignMessenger(reassign.requestId, newData, closeOnReassign, buttonActive, reassign.messengerId));

      dispatch(ACTION.getCountRequest());
    } else if (buttonActive === 'history' || (buttonActive === 'my_request' && reassign.requestId)) {
      dispatch(reassignMessenger(reassign.requestId, newData, closeOnReassign, buttonActive, reassign.messengerId));

      dispatch(ACTION.getCountRequest());
    } else {
      dispatch(reassignMessenger(reassign.requestId, newData, closeOnReassign));
      dispatch(ACTION.allRequest('unassigned'));
    }
    closeOnReassign();
  };

  const dynamicSort = (property) => {
    let sortOrder = 1;

    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };

  return (
    <div>
      <div className={classes.reassignWrapper}>
        <p className={classes.title}>Reassign to</p>
        <Select
          onChange={(e) => onChangeMessenger(e.target.value)}
          name="reassign"
          classes={{ root: classes.select }}
          variant="outlined"
          data-cy="reassign_to"
          MenuProps={{ MenuListProps: { 'data-cy': 'reassign_to_dropdown' } }}
        >
          {/* <MenuItem value="anuar">anuar</MenuItem> */}
          {request &&
            request.sort(dynamicSort('name')).map((item, idx) => {
              return (
                <MenuItem key={idx} value={item.messenger_id}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
        <p className={classes.title}>Box No:</p>
        <p className={classes.text} data-cy="new_box_no">
          {boxNo.box_no ? numberWithComma(boxNo.box_no) : boxNo.box_no}
        </p>
        <div className={classes.messengerItem}>
          <p className={classes.title}>Original Messenger:</p>
          <p className={classes.text} data-cy="original_messenger">
            {reassign.messenger}
          </p>
          <p className={classes.title}>Original Box No.:</p>
          <p className={classes.text} data-cy="original_box_no">
            {numberWithComma(reassign.box_no)}
          </p>
        </div>
      </div>
      <div className={classes.reassignBtn}>
        <SecondaryButton datacy="cancel_btn" onClick={handleClose}>
          Cancel
        </SecondaryButton>
        <PrimaryButton datacy="reassign_btn" disabled={!newMessenger} onClick={onReasignMessenger}>
          Reassign
        </PrimaryButton>
      </div>
    </div>
  );
};

ReassignContent.propTypes = {
  reassign: PropTypes.any,
  close: PropTypes.any,
  buttonActive: PropTypes.any,
  closeOnReassign: PropTypes.any,
};
export default ReassignContent;
