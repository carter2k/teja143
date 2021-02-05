import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import config from '../../config';
import ServiceUrls from '../helpers/ServiceUrls';
import { removeSession } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { setCacheObject, getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { hasWhiteSpace, validateEmail } from '../helpers/globalHelpers/Utils';
import { connect } from 'react-redux';
import { resetpassword, setdata, cleardata, errormsg } from '../redux/actions/ResetPasswordActions'
import { validate_resetform } from '../utils/validation'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../commons/Loading';


class PasswordChange extends Component {
  constructor(props) {
    super(props)
    this.props.cleardata();
  }

  componentDidMount() {
    removeSession();
  }


  async resetpassworddetails() {
    const { new_password, confirm_password } = this.props;
    var token = this.props.match.params.token;
    var error = validate_resetform(this.props);
    if (error.status) {
      this.props.errormsg(error.msg);
      return false;
    }

    let dataObject = {
      reset_password_token: token,
      new_password: new_password,
      confirm_password: confirm_password,

    };
    this.props.resetpassword(dataObject);
  }

  handleEnterKey = (e) => {
    if (e.keyCode == 13 && e.target.name == "confirm_password") {
      this.resetpassworddetails();
    }
  }

  handleChange = (e) => {
    var data = { name: e.target.name, value: e.target.value }
    this.props.setdata(data)
  }

  render() {
    const { token, new_password, confirm_password, error, loading } = this.props;
    return (
      <div class="login-dark">
        {loading && <Loader />}
        <ToastContainer />
        <form>
          <h2 class="sr-only">Login Form</h2>
          <div class="illustration">
            <p class="font-size-14 text-white">Change Password</p><img class="my-4" src="assets/img/logo.svg" height="25" /></div>
          <div class="form-group">
            <input class="form-control" value={new_password} type="password" name="new_password" placeholder="New Password" onKeyDown={this.handleEnterKey} onChange={this.handleChange} />
          </div>
          <div class="form-group">
            <input class="form-control" value={confirm_password} type="password" name="confirm_password" placeholder="Confirm Password" onKeyDown={this.handleEnterKey} onChange={this.handleChange} />
          </div>
          {error && error.length > 0 ? <p className="text-danger">{error}</p> : null}

          <div class="form-group">
            <button class="btn btn-primary btn-block btn-theme" type="button" onClick={() => this.resetpassworddetails()}>Change Password</button>
          </div>
        </form>
      </div>

    )
  }



  async componentDidUpdate(prevProps, prevState) {
    // check whether client has changed
    if (prevProps.password_changed !== this.props.password_changed) {
      if (this.props.password_changed) {
        setTimeout(() => {
          this.props.history.push('/login');
        }, 1000);

      }
    }
  }
}

const mapStateToProps = state => {
  const { token, new_password, confirm_password, error, password_changed, loading } = state.reset_pwd;

  return {
    token, new_password, confirm_password, error, password_changed, loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    resetpassword: i => {
      dispatch(resetpassword(i));
    },
    setdata: i => {
      dispatch(setdata(i));
    }, cleardata: () => {
      dispatch(cleardata());
    }, errormsg: (i) => {
      dispatch(errormsg(i));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);

