import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import config from '../../config';
import ServiceUrls from '../helpers/ServiceUrls';
import { removeSession } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { setCacheObject, getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
import { hasWhiteSpace, validateEmail } from '../helpers/globalHelpers/Utils';
import { connect } from 'react-redux';
import { userresetpassword, setdata, cleardata, popuperrormsg } from '../redux/actions/ResetPasswordActions'
import { validate_clientresetpasswordform } from '../utils/validation'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../commons/Loading';


class UserResetPassword extends Component {
    constructor(props) {
        super(props)
        this.props.cleardata();
    }


    async resetpassworddetails() {
        const { old_password, new_password, confirm_password, user } = this.props;
        var error = validate_clientresetpasswordform(this.props);
        if (error.status) {
            this.props.popuperrormsg(error.msg);
            return false;
        }

        let dataObject = {
            old_password: old_password,
            new_password: new_password,
            confirm_password: confirm_password
        };
        console.log("request", user, dataObject);
        this.props.userresetpassword(dataObject);
    }


    handleChange = (e) => {
        var data = { name: e.target.name, value: e.target.value }
        this.props.setdata(data)
    }

    render() {
        const { old_password, new_password, confirm_password, reset_password_error_popup_msg, loading } = this.props;
        return (
            <>
                {loading && <Loader />}
                <ToastContainer />


                <div class="modal fade talitrix_modal" data-backdrop="static" role="dialog" tabindex="-1" id="reset_pwd">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title font-weight-bold">Change Password</h4><button onClick={() => this.updatedata()} type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                            <div class="modal-body">
                                <form>

                                    <div class="form-group"><label>Old password</label><input id="old_password" ref="old_password" name="old_password" value={old_password} onChange={this.handleChange} class="form-control" type="password" /></div>
                                    <div class="form-group"><label>new password</label><input id="new_password" ref="new_password" name="new_password" value={new_password} onChange={this.handleChange} class="form-control" type="password" /></div>
                                    <div class="form-group"><label>Confirm password</label><input id="confirm_password" ref="confirm_password" name="confirm_password" value={confirm_password} onChange={this.handleChange} class="form-control" type="password" /></div>

                                </form>
                                <p class="text-danger">{reset_password_error_popup_msg}</p>
                                <div class="text-right"><button onClick={() => this.resetpassworddetails()} class="btn btn-primary btn-theme btn-sm" type="button">Reset Password</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }

    updatedata() {
        this.props.cleardata();
    }

    async componentDidUpdate(prevProps, prevState) {
        // check whether client has changed
        if (prevProps.password_changed !== this.props.password_changed) {
            if (this.props.password_changed) {
                this.props.cleardata();
                window.$('#reset_pwd').modal('hide');
                setTimeout(() => {
                    this.props.parent_props.history.push('/login');
                }, 1000);

            }
        }
    }
}

const mapStateToProps = state => {
    const { id, old_password, new_password, confirm_password, reset_password_error_popup_msg, password_changed, loading } = state.reset_pwd;
    const { user } = state.auth;
    return {
        id, old_password, new_password, confirm_password, reset_password_error_popup_msg, password_changed, loading, user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        userresetpassword: i => {
            dispatch(userresetpassword(i));
        },
        setdata: i => {
            dispatch(setdata(i));
        }, cleardata: () => {
            dispatch(cleardata());
        }, popuperrormsg: (i) => {
            dispatch(popuperrormsg(i));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserResetPassword);

