import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTION from '../store/actions/authActions';
import { clearErrors } from '../store/actions/errorActions';
import { Link, useHistory } from 'react-router-dom';

// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { Form, Input, Button, Divider, Row, Col, Alert } from "antd";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import './styles/Login.css';

const FormItem = Form.Item;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const auth = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrorMsg(error.msg.msg);
    } else {
      setErrorMsg(null);
    }

    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [error, auth]);

  const usernameHandler = (username) => setUsername(username);
  const passwordHandler = (password) => setPassword(password);

  const onSubmit = () => {
    dispatch(clearErrors());
    //  Login user Object
    const newUser = {
      username,
      password,
    };

    // Attempt to login
    dispatch(ACTION.login(newUser));
    // console.log(newUser);
  };

  return (
    <div className={classes.root}>
      <Col span={10} push={14} style={{ padding: 100 }}>
        <Form className="login-form" onFinish={onSubmit}>
          <h1 style={{ textAlign: 'center' }}>Login Account</h1>
          {errorMsg ? (
            <Alert message="Error Text" description={errorMsg} type="error" style={{ marginBottom: 20 }} />
          ) : null}
          <FormItem name="username">
            <Input
              prefix={<UserOutlined style={{ fontSize: 13 }} />}
              placeholder="Username"
              value={username}
              onChange={(e) => usernameHandler(e.target.value)}
            />
          </FormItem>

          <FormItem name="password">
            <Input.Password
              prefix={<LockOutlined type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => passwordHandler(e.target.value)}
            />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            {/* <p style={{ marginTop: 10 }}>Or <a href="/register">register now!</a></p> */}
          </FormItem>
        </Form>
      </Col>
      <Col span={14} pull={10}></Col>
    </div>
  );
};

export default Login;
