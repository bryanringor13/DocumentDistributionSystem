// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SiderComponent from './SiderComponent';
import HeaderComponent from './HeaderComponents';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import ViewRequest from './dds/ViewRequest';
import ViewNotification from './dds/ViewNotification';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  layoutWrapper: {
    width: '100%',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    '& .e-calendar .e-content.e-month td': {
      border: '1px solid #E0E6ED',
    },
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
}));

/**
 *
 * @params {children}  children props
 *@returns {Element}
 */

function Layout({ children }) {
  const classes = useStyles();

  const [refreshTable, setRefreshTable] = useState(true);
  // const [cancelOpen, setCancelOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openHeaderNotif, setOpenHeaderNotif] = useState(false);

  const requestDetail = (viewDetails) => {
    setOpenView(viewDetails);
  };

  // const cancelOpenHandler = (toggle) => {
  //   setCancelOpen(toggle);
  // };

  const notifOpenHandler = (toggle) => {
    setNotifOpen(toggle);
  };

  const headerNotifHandler = (toggle) => {
    setOpenHeaderNotif(toggle);
  };

  const refreshTableHandler = (toggle) => {
    // console.log(toggle, 'Refresh Table')
    setRefreshTable(toggle);
  };

  useEffect(() => {
    if (refreshTable) {
      refreshTableHandler(false);
    }
  }, [refreshTable]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <SiderComponent />
      {/* <Grid className={classes.layoutWrapper}> */}

      <main className={classes.content}>
        <HeaderComponent requestDetail={requestDetail} setOpen={notifOpenHandler} setHeaderNotif={headerNotifHandler} />
        <Container maxWidth="xl" className={classes.container}>
          {children}
        </Container>
      </main>
      <ViewRequest
        open={openView}
        // openCancel={cancelOpen}
        buttonActive={''}
        // setOpenCancel={cancelOpenHandler}
        closeView={requestDetail}
        setRefreshTable={setRefreshTable}
        headerOpenNotif={openHeaderNotif}
      />
      {/* {openView ? (
      ) : null} */}
      {notifOpen ? <ViewNotification open={notifOpen} setOpen={notifOpenHandler} closeView={requestDetail} /> : null}

      {/* </Grid> */}
    </div>
  );
}

Layout.propTypes = { children: PropTypes.node.isRequired };
export default Layout;
