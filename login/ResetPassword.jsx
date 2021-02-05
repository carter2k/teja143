import React, { Component } from 'react'
import usa_states from '../DUMMY_DATA/usa_states.json'
import { resetpasswordsuccess, setpopuperrormsg, resetpassword, setdata } from '../redux/actions/LoginActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validate_ResetPassword } from '../utils/validation';
import { connect } from 'react-redux';


class ResetPassword extends Component {
    constructor(props) {
        super(props)
    }



    render() {
        const { email, reset_password_popup_msg } = this.props;


        return (
            <>

                <div class="modal fade talitrix_modal" role="dialog" tabindex="-1" id="reset_password">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title font-weight-bold">Reset your Password</h4><button onClick={() => this.updatedata()} type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                            <div class="modal-body">

                                <div>
                                    <p>To reset your password, enter the email address you use to log into your
                                    Talitrix account. A verification link will be sent to your email address
                                         using which you can reset password.</p>
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input id="email" ref="email" name="email" value={email} onChange={this.formchangeHandler} class="form-control" type="text" />
                                    </div>
                                </div>
                                {reset_password_popup_msg}
                                <div class="text-right"><button onClick={() => this.reset_password()} class="btn btn-primary btn-theme btn-sm" type="button">Confirm</button></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade talitrix_modal" role="dialog" tabindex="-1" id="resend_confirmed">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title font-weight-bold">Check your Email</h4><button onClick={() => this.updatedata()} type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                            <div class="modal-body">

                                <div>
                                    <p>We’ve sent a verification link to your Email.<br /><b>{email}</b> </p>
                                    <p className="mt-2">Didn't get an email? </p>
                                </div>

                                <div class="text-right"><button onClick={() => this.reset_password()} class="btn btn-primary btn-theme btn-sm" type="button">Resend Email</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    formchangeHandler = (e) => {
        var data = { name: e.target.name, value: e.target.value }
        this.props.setdata(data);
    }

    updatedata() {
        this.props.setpopuperrormsg("");
    }

    reset_password() {
        const { email } = this.props;
        var errormsg = validate_ResetPassword(this.props);
        if (errormsg) {
            this.props.setpopuperrormsg(errormsg);
            return false;
        }
        let dataObject = { client_email: email };
        // this.props.resetpassword(dataObject);
        this.props.resetpassword(dataObject);
    }

}


const mapStateToProps = state => {
    const { email, reset_password_popup_msg } = state.auth;
    return {
        email, reset_password_popup_msg
    }
};

const mapDispatchToProps = dispatch => {
    return {
        resetpasswordsuccess: msg => {
            dispatch(resetpasswordsuccess(msg));
        }, resetpassword: i => {
            dispatch(resetpassword(i));
        }, setpopuperrormsg: msg => {
            dispatch(setpopuperrormsg(msg));
        }, setdata: i => {
            dispatch(setdata(i));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);