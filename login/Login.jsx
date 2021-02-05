import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import config from '../../config';
import ServiceUrls from '../helpers/ServiceUrls';
import { removeSession } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { setCacheObject, getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { hasWhiteSpace, validateEmail } from '../helpers/globalHelpers/Utils';
import { connect } from 'react-redux';
import { login, errorlogin, setdata, resetlogin } from '../redux/actions/LoginActions'
import { URL } from '../helpers/Constans';
import ResetPassword from './ResetPassword';
const LOGIN_USER_NAME = config.LOGIN_USER_NAME;
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;


class Login extends Component {
  constructor(props) {
    super(props)
    this.props.resetlogin();
    this.state = {
      login: false,
      password: "",
      error: false
    }
  }

  componentDidMount() {
    removeSession();
    let isLoggedIn = localStorage.getItem("auth");
    this.setState({ login: isLoggedIn });
    // this.refs["username"].focus();
  }


  async login() {
    const { email } = this.props;
    if (email == "" || this.state.password == "") {
      this.props.onErrorLogin('Please Enter Email and Password');
      return false;
    } else if (!validateEmail(email)) {
      this.props.onErrorLogin('Enter valid Email.');
      return false;
    }
    let dataObject = {
      email: email,
      password: this.state.password
    };
    this.props.onUserLogin(dataObject);
  }

  handleEnterKey = (e) => {
    if (e.keyCode == 13 && e.target.name == "password") {
      this.login();
    }
  }

  handleChange = (e) => {
    var data = { name: e.target.name, value: e.target.value }
    if (e.target.name == "email") {
      this.props.setdata(data)
    } else if (e.target.name == "password") {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  render() {
    const { loading, isUserLogIn, error, email } = this.props;

    return (
      <div class="login-dark">
        <ResetPassword />
        <form>
          <h2 class="sr-only">Login Form</h2>
          <div class="illustration">
            <p class="font-size-14 text-white">Welcome to Login</p><img class="my-4" src="assets/img/logo.svg" height="25" /></div>
          <div class="form-group">
            <input class="form-control" value={email} type="email" name="email" placeholder="Email" onChange={this.handleChange} />
          </div>
          <div class="form-group">
            <input class="form-control" value={this.state.password} type="password" name="password" placeholder="Password" onKeyDown={this.handleEnterKey} onChange={this.handleChange} />
          </div>
          {error.length > 0 ? <p className="text-danger">{error}</p> : null}

          <div class="form-group">
            <button class="btn btn-primary btn-block btn-theme" type="button" onClick={() => this.login()}>Log In</button>
          </div>
          <a class="forgot text_link" data-toggle="modal" data-target="#reset_password">Forgot your  password?</a>
        </form>
      </div>
    )
  }



  async componentDidUpdate(prevProps, prevState) {
    // check whether client has changed
    if (prevProps.isUserLogIn !== this.props.isUserLogIn) {
      if (this.props.isUserLogIn) {
        await setCacheObject(LOGIN_USER_NAME, this.props.user.user.email);
        await setCacheObject(SESSION_KEY_NAME, this.props.user);
        this.props.history.push(URL.REDIRECT_HOME);
      }
    }
  }
}

const mapStateToProps = state => {
  const { error, loading, user, isUserLogIn, email } = state.auth;
  console.log("email>>>>", email);
  return {
    error,
    loading,
    user,
    isUserLogIn,
    email
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLogin: user => {
      dispatch(login(user));
    },
    onErrorLogin: user => {
      dispatch(errorlogin(user));
    }, setdata: user => {
      dispatch(setdata(user));
    }, resetlogin: () => {
      dispatch(resetlogin());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

