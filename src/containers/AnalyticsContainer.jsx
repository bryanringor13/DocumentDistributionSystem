/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Chart from 'chart.js';
import 'chartjs-plugin-style';
import Hammer from 'hammerjs';
import * as Zoom from 'chartjs-plugin-zoom';
import Loading from '../components/common/Loading';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import BoxRibbonIcon from '../assets/img/icons/box-ribbon.svg';

import Layout from '../components/Layout';
import Title from '../components/common/Title';

import { useDispatch, useSelector } from 'react-redux';
import * as KPI from '../store/actions/kpiActions';
moment.locale();

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100vh',
    padding: '40px',
  },
  lastUpdated: {
    marginTop: '2px',
    fontSize: '12px',
    color: '#2f3542cc',
    '& span': {
      fontWeight: 'bold',
    },
  },
  currentDate: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '35px',
    fontSize: '16px',
    color: '#2f3542cc',
    '& span': {
      margin: '0 4px 0 12px',
      fontWeight: 'bold',
    },
  },
  analyticsWrapper: {
    marginTop: '10px',
  },
  analyticsCard: {
    background: '#FFF',
    border: '1px solid #E0E6ED',
  },
  dataIcon: {
    textAlign: 'center',
  },
  dataHeader: {
    alignItems: 'center',
    padding: '30px 30px 24px',
    borderBottom: '1px solid #E0E6ED',
  },
  dataTitle: {
    marginLeft: '30px',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '40px',
    color: '#2F3542',
  },
  dataWrapper: {
    padding: '50px 30px 60px',
  },
  dataGraphWrapper: {
    padding: '32px 30px 24px',
  },
  dataGraphHolder: {
    cursor: 'pointer',
  },
  dataDetails: {
    textAlign: 'center',
  },
  dataInfo: {
    margin: '0 auto',
    maxWidth: '235px',
    fontSize: '14px',
    lineHeight: '24px',
    color: '#2F3542',
  },
  dataNote: {
    padding: '24px',
    fontSize: '12px',
    fontWeight: '300',
    color: 'rgba(47, 53, 66, 0.8)',
    lineHeight: '20px',
    borderTop: '1px solid #e0e6ed',
  },
  dataSuccess: {
    fontWeight: 'bold',
    fontSize: '48px',
    color: '#1DD28B',
  },
  dataFailed: {
    fontWeight: 'bold',
    fontSize: '48px',
    color: '#FA5656',
  },
  checkIcon: {
    fontSize: '45px',
    color: '#1DD28B',
  },
  blockIcon: {
    fontSize: '45px',
    color: '#FA5656',
  },
  graphIcon: {
    fontSize: '45px',
    color: '#29B1C3',
  },
  dataLegend: {
    position: 'relative',
    paddingLeft: '20px',
    fontSize: '12px',
    color: '#2F3542',
    '&:before': {
      content: "''",
      position: 'absolute',
      top: '8px',
      left: '0',
      width: '16px',
      height: '2px',
      backgroundColor: '#29B1C3',
    },
  },
}));

const AnalyticsContainer = () => {
  const classes = useStyles();
  const now = moment().format('MMM D, YYYY hh:mm A');
  const [currDateTime, setCurrDateTime] = useState(now);
  const [lastUpdated, setLastUpdated] = useState('');
  const [currMonth, setCurrMonth] = useState('');
  const dispatch = useDispatch();

  const kpi = useSelector((state) => state.kpi);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedNow = moment().format('MMM D, YYYY hh:mm A');
      setCurrDateTime(updatedNow);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLastUpdated(moment().format('MMM D, YYYY hh:mm A'));
    setCurrMonth(moment().format('MMMM'));
  }, []);

  useEffect(() => {
    dispatch(KPI.kpiPerformanceIndicator());
    dispatch(KPI.kpiMonthyProductivity());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(KPI.kpiPercentagePocessed());
    dispatch(KPI.kpiNotDelivered());

    const lineCtx = document.getElementById('lineGraph').getContext('2d');
    const barCtx = document.getElementById('barGraph').getContext('2d');

    const kpiMonthlyHolder = [];
    const kpiMonthlyDataHolder = [];

    for (const [week] of Object.entries(kpi.monthyProductivity)) {
      const item = kpi.monthyProductivity[week];
      kpiMonthlyHolder.push(item.week);

      kpiMonthlyDataHolder.push(item.percentage);
    }

    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: kpiMonthlyHolder,
        datasets: [
          {
            label: 'Total percentage processed',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#29B1C3',
            borderColor: '#29B1C3',
            borderWidth: 2,
            data: kpiMonthlyDataHolder,
          },
        ],
      },

      options: {
        responsive: true,
        // aspectRatio: 1.4,
        legend: {
          display: true,
          position: 'bottom',
          align: 'start',
          labels: {
            padding: 20,
            fontFamily: 'Inter, Arial, sans-serif',
            fontSize: 14,
          },
        },
        tooltips: {
          intersect: false,
          xPadding: 11,
          yPadding: 10,
          caretSize: 7,
          backgroundColor: '#fff',
          titleFontFamily: 'Inter, Arial, sans-serif',
          titleFontColor: '#2F3542',
          titleFontStyle: 'normal',
          bodyFontFamily: 'Inter, Arial, sans-serif',
          bodyFontColor: '#2F3542',
          bodyFontStyle: 'bold',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          callbacks: {
            label: function (tooltipItem, data) {
              const label = tooltipItem.yLabel + '%';

              return label;
            },
          },
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100,
                min: 0,
                stepSize: 20,
                callback: function (value) {
                  return value.toString() + '%';
                },
              },
            },
          ],
        },
      },
    });

    const kpiDataHolder = [];
    const kpiPercentageHolder = [];

    for (const [messenger] of Object.entries(kpi.performanceIndicator)) {
      const item = kpi.performanceIndicator[messenger];
      kpiDataHolder.push(item.messenger);

      kpiPercentageHolder.push(item.percentage);
    }

    new Chart(barCtx, {
      type: 'horizontalBar',
      data: {
        labels: kpiDataHolder,
        datasets: [
          {
            label: 'Daily Performance',
            backgroundColor: 'rgba(41, 177, 195, 0.48)',
            borderColor: '#29B1C3',
            borderWidth: 2,
            data: kpiPercentageHolder,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 1.3,
        legend: {
          display: true,
          position: 'bottom',
          align: 'start',
          labels: {
            padding: 20,
            fontFamily: 'Inter, Arial, sans-serif',
            fontSize: 14,
          },
        },
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100,
                min: 0,
                stepSize: 20,
                callback: function (value) {
                  return value.toString() + '%';
                },
              },
            },
          ],
        },
        tooltips: {
          xPadding: 11,
          yPadding: 10,
          caretSize: 7,
          backgroundColor: '#fff',
          titleFontFamily: 'Inter, Arial, sans-serif',
          titleFontColor: '#2F3542',
          titleFontStyle: 'normal',
          bodyFontFamily: 'Inter, Arial, sans-serif',
          bodyFontColor: '#2F3542',
          bodyFontStyle: 'bold',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 5,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          callbacks: {
            label: function (tooltipItem, data) {
              const label = tooltipItem.xLabel + '% were processed';

              return label;
            },
          },
        },
        pan: {
          enabled: true,
          mode: 'y',
          speed: 20,
          threshold: 10,
        },
        zoom: {
          enabled: true,
          drag: false,
          mode: 'y',
          speed: 0.05,
          // threshold: 2,
          // sensitivity: 3,
        },
      },
    });
    // eslint-disable-next-line
  }, [dispatch, kpi.performanceIndicator, kpi.monthyProductivity]);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={6}>
          <Title>Statistics</Title>
          <div className={classes.lastUpdated}>
            <span>Last updated: </span>
            {lastUpdated}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.currentDate}>
            <AccessTimeIcon />
            <span>Current Date & Time: </span>
            {currDateTime}
          </div>
        </Grid>
      </Grid>
      {!kpi.reqLoading ? (
        <Grid container spacing={5} className={classes.analyticsWrapper}>
          <Grid item xs={6}>
            <div className={classes.analyticsCard}>
              <Grid container className={classes.dataHeader}>
                <Grid item xs={1}>
                  <div className={classes.dataIcon}>
                    <CheckIcon className={classes.checkIcon} />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div className={classes.dataTitle}>Received vs. Processed Transmittal Requests for the Day</div>
                </Grid>
              </Grid>

              <Grid container className={classes.dataWrapper}>
                <Grid item xs={6}>
                  <div className={classes.dataDetails}>
                    <div className={classes.dataSuccess} data-cy="delivered_percent">
                      {kpi.receivedVsProcess.delivered}%
                    </div>
                    <div className={classes.dataInfo}>of the documents received for the day were delivered</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.dataDetails}>
                    <div className={classes.dataSuccess} data-cy="picked_up_percent">
                      {kpi.receivedVsProcess.picked_up}%
                    </div>
                    <div className={classes.dataInfo}>of the documents received for the day were picked up</div>
                  </div>
                </Grid>
              </Grid>

              <div className={classes.dataNote}>
                Note: The data shown above are the percentage of transmittal requests that are scanned by the Admin
                Assistants for the day vs. the processed transmittal requests by the messengers for the day.
              </div>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className={classes.analyticsCard}>
              <Grid container className={classes.dataHeader}>
                <Grid item xs={1}>
                  <div className={classes.dataIcon}>
                    <BlockIcon className={classes.blockIcon} />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div className={classes.dataTitle}>Not Delivered and Not Picked Up Requests for the Day</div>
                </Grid>
              </Grid>

              <Grid container className={classes.dataWrapper}>
                <Grid item xs={6}>
                  <div className={classes.dataDetails}>
                    <div className={classes.dataFailed} data-cy="not_delivered_requests">
                      {kpi.notDelivered.count && kpi.notDelivered.count.not_delivered}
                    </div>
                    <div className={classes.dataInfo}>transmittal requests were not delivered</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.dataDetails}>
                    <div className={classes.dataFailed} data-cy="not_picked_up_requests">
                      {kpi.notDelivered.count && kpi.notDelivered.count.not_picked_up}
                    </div>
                    <div className={classes.dataInfo}>transmittal requests were not picked up</div>
                  </div>
                </Grid>
              </Grid>

              <div className={classes.dataNote}>
                Note: The data shown above are the total number of all not delivered and not picked up transmittal
                requests of messengers for the day.
              </div>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className={classes.analyticsCard}>
              <Grid container className={classes.dataHeader}>
                <Grid item xs={1}>
                  <div className={classes.dataIcon}>
                    <img src={BoxRibbonIcon} alt="Box Ribbon" />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div className={classes.dataTitle}>Productivity for the Month of {currMonth}</div>
                </Grid>
              </Grid>

              <div className={classes.dataGraphWrapper}>
                <div className={classes.dataGraphHolder} data-cy="processed_graph">
                  <canvas id="lineGraph" />
                </div>
              </div>

              <div className={classes.dataNote}>
                Note: The data shown above is the percentage of all transmittal requests received vs. processed by
                FPAD-Delivery Section for the month.
              </div>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className={classes.analyticsCard}>
              <Grid container className={classes.dataHeader}>
                <Grid item xs={1}>
                  <div className={classes.dataIcon}>
                    <DirectionsBikeIcon className={classes.graphIcon} />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div className={classes.dataTitle}>Messenger&apos;s Daily Performance Indicator</div>
                </Grid>
              </Grid>

              <div className={classes.dataGraphWrapper}>
                <div className={classes.dataGraphHolder} data-cy="messengers_graph">
                  <canvas id="barGraph" />
                </div>
              </div>

              <div className={classes.dataNote}>
                Note: The data shown above is the percentage of all assigned vs. processed transmittal requests of a
                messenger for the day.
              </div>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default AnalyticsContainer;
