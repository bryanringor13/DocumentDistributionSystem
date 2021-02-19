import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import Title from '../components/common/Title';
import Layout from '../components/Layout';
import Loading from '../components/common/Loading';
import AuditLogsTable from '../components/dds/AuditLogsTable';
import * as AUDIT from '../store/actions/auditActions';

import moment from 'moment';
moment.locale();

const useStyles = makeStyles(() => ({
  messengerWrapper: {
    display: 'flex',
  },
  contactBtnGroup: {
    '& button': {
      padding: '5px 20px',
      border: '1px solid #e0e6ed',
    },
  },
}));

const AuditLogs = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const audit = useSelector(state => state.audit)
    const [dataTable, setDataTable] = useState([]);

    const [tableColumn, setTableColumn] = useState([
        { title: 'Activity ID', field: 'activity_id', },
        { title: 'User', field: 'person_name', },
        { title: 'Action', field: 'action', },
        { title: 'IP Address', field: 'ip_address', },
        { title: 'Date', field: 'date', },
        { title: 'Time', field: 'time', },
    ]);

    useEffect(() => {
        dispatch(AUDIT.auditLogs())
    }, [])

    useEffect(() => {
        let processData = [];
        audit.data.map((data, index) => {
            processData = [...processData, {
                activity_id: data.activity_id,
                person_name: data.person_name,
                action: data.action,
                ip_address: data.ip_address,
                date: moment(data.date_of_entry).format('MMM. DD, YYYY'),
                time: moment(data.date_of_entry).format('hh:mm:ss A'),
            }]
        })
        console.log('Process Data: ', processData);
        setDataTable(processData)
    },[audit.data])

    return (
        <Layout>
            <Grid item className={classes.messengerWrapper} sm={12}>
                <Grid item sm={6}>
                <Title>Audit Logs</Title>
                </Grid>
            </Grid>
            {/* {!contact.reqLoading ? ( */}
                <AuditLogsTable dataTable={dataTable} tableColumn={tableColumn}/>
            {/* ) : ( */}
                {/* <Loading /> */}
            {/* )} */}
        </Layout>
    );
};

export default AuditLogs;
