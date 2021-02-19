import React from 'react';
import AnalyticsContainer from '../containers/AnalyticsContainer';
import RequestorContainer from '../containers/RequestorContainer';
import MessengerContainer from '../containers/MessengerContainer';
import Reports from '../containers/Reports';
import Scheduler from '../containers/Scheduler';
import Contacts from '../containers/Contacts';
import AuditLogs from '../containers/AuditLogs';

// Private routes.
const AdminAssistant = () => <RequestorContainer />;
const Messenger = () => <MessengerContainer />;
const Requestor = () => <RequestorContainer />;
const Analytics = () => <AnalyticsContainer />;
const MyRequest = () => <RequestorContainer />;
const MyReport = () => <Reports />;
const MyScheduler = () => <Scheduler />;
const MyContacts = () => <Contacts />;
const MyAuditLogs = () => <AuditLogs />;

const Home = () => <h1>Home</h1>;

export { AdminAssistant, Requestor, Messenger, Analytics, MyRequest, Home, MyReport, MyScheduler, MyContacts, MyAuditLogs };
