/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import './styles/siderComponents.css';
import './styles/global-styles.css';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';

import * as Constants from '../utils/Constants';

import AnalyticsIcon from '@material-ui/icons/Timeline';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
const SiderComponent = (props) => {
  const [userRoles, setUserRoles] = useState(JSON.parse(localStorage.getItem('roles')));

  return (
    <>
      <CssBaseline />
      <div className="side-menu" style={{ zIndex: 9999 }}>
        {/* For Requestor */}
        {userRoles.some((roles) => Constants.REQUESTOR.indexOf(roles) >= 0) ? (
          <List>
            <NavLink to="/app/requests">
              <ListItem button>
                <ListItemIcon>
                  <AssignmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Requests" />
              </ListItem>
            </NavLink>
            <NavLink to="/app/scheduler">
              <ListItem button data-cy="requests_nav">
                <ListItemIcon>
                  {/* <AccessAlarmIcon /> */}
                  <CalendarTodayOutlinedIcon style={{ opacity: '0.65' }} />
                </ListItemIcon>
                <ListItemText primary="Scheduled Requests" />
              </ListItem>
            </NavLink>
          </List>
        ) : null}

        {/* For Admin Assistant */}
        {userRoles.some((roles) => Constants.ADMIN_ASSISTANT.indexOf(roles) >= 0) ? (
          <List>
            <NavLink to="/app/statistics">
              <ListItem button>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItem>
            </NavLink>
            <NavLink to="/app/requests">
              <ListItem button data-cy="requests_nav">
                <ListItemIcon>
                  <AssignmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Requests" />
              </ListItem>
            </NavLink>
            <NavLink to="/app/scheduler">
              <ListItem button data-cy="requests_nav">
                <ListItemIcon>
                  <AccessAlarmIcon />
                </ListItemIcon>
                <ListItemText primary="Scheduled Requests" />
              </ListItem>
            </NavLink>
            <NavLink to="/app/myrequest">
              <ListItem data-cy="my_request_nav">
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="My Requests" />
              </ListItem>
            </NavLink>

            <NavLink to="/app/messenger">
              <ListItem button data-cy="messenger_nav">
                <ListItemIcon>
                  <DirectionsBikeIcon />
                </ListItemIcon>
                <ListItemText primary="Messenger" />
              </ListItem>
            </NavLink>
            <NavLink to="/app/reports">
              <ListItem button data-cy="reports_nav">
                <ListItemIcon>
                  <AssessmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItem>
            </NavLink>
            <NavLink to="/app/contacts">
              <ListItem button data-cy="contacts_nav">
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary="Contacts" />
              </ListItem>
            </NavLink>

            <NavLink to="/app/audit_logs">
              <ListItem button data-cy="audit_logs_nav">
                <ListItemIcon>
                  <AssignmentOutlinedIcon style={{ opacity: '0.65' }} />
                </ListItemIcon>
                <ListItemText primary="Audit Logs" style={{ opacity: '0.65' }} />
              </ListItem>
            </NavLink>
          </List>
        ) : null}
      </div>
    </>
  );
};

export default SiderComponent;
