import ClientDetailsActionTypes from '../actionTypes/ClientDetailsActionTypes';
import { toast } from 'react-toastify';
const INITIAL_STATE = {
    id: '',
    client_name: '',
    client_address: '',
    client_city: '',
    u_state: '',
    client_zip: '',
    client_email: '',
    status: '',
    client_users: [{ fname: '', lname: '', mobile: '', email: '', username: '', password: '' }],
    client_users_error_messages: [{ emsg: '', phemsg: '', emailmsg: '' }],
    updateval: '',
    client_users_list_cursor_point: '',
    user: 1,
    error: '',
    popup_msg: "",
    is_create: false,
    loading: false,
    submit_success: false,
    reset_password: '',
    reset_password_user: {},
    item_deleted: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ClientDetailsActionTypes.CLIENT_DETAILS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case ClientDetailsActionTypes.CLIENT_DETAILS_REQUEST_SUCCESS:
            var client = action.payload.data;
            var users = action.payload.data.users;
            let errormsgarr = [];
            users.forEach((item, index) => {
                errormsgarr.push({ emsg: '', phemsg: '', emailmsg: '' })
            });
            return {
                ...state, loading: false,
                client_name: client.client_name,
                client_address: client.address,
                client_city: client.city,
                u_state: client.state,
                client_zip: client.zip,
                id: client.id,
                status: client.status + '',
                client_users: users,
                client_users_error_messages: errormsgarr,
            }
        case ClientDetailsActionTypes.CLIENT_DETAILS_REQUEST_FAIL:

            toast.error(action.payload, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });

            return { ...state, loading: false, error: action.payload }



        case ClientDetailsActionTypes.ADD_CLIENT_DETAILS_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            return {
                ...state,

                client_name: '',
                client_address: '',
                client_city: '',
                u_state: '',
                client_zip: '',
                client_email: '',
                id: '',
                status: '',
                client_users: [{ fname: '', lname: '', mobile: '', email: '', username: '', password: '' }],
                client_users_error_messages: [{ emsg: '', phemsg: '', emailmsg: '' }],
                error: '',
                popup_msg: "",
                loading: false,
                submit_success: true
            }

        case ClientDetailsActionTypes.CLIENT_DETAILS_PAGE_RESET:
            let is_create = action.payload ? action.payload : false;
            return {
                ...state,

                client_name: '',
                client_address: '',
                client_city: '',
                u_state: '',
                client_zip: '',
                client_email: '',
                client_users: [{ fname: '', lname: '', mobile: '', email: '', username: '', password: '' }],
                error: '',
                id: '',
                status: '',
                is_create: is_create,
                client_users_error_messages: [{ emsg: '', phemsg: '', emailmsg: '' }],
                popup_msg: "",
                loading: false,
                submit_success: false,
                reset_password: '',
                reset_password_user: {},
                item_deleted: false
            }
        case ClientDetailsActionTypes.UPDATE_CLIENT_DETAILS_REQUEST_SUCCESS:
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            return {
                ...state,
                loading: false,
                submit_success: true
            }

        case ClientDetailsActionTypes.UPDATE_CLIENT_USER_PASSWORD:
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            window.$('#update_password').modal('hide');
            return {
                ...state,
                loading: false,
                reset_password: '',
                reset_password_user: {}
            }

        case ClientDetailsActionTypes.DELETE_CLIENT_REQUEST_SUCCESS:
            window.$('#delete_item').modal('hide');
            toast.success(action.payload.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            return {
                ...state,
                item_deleted: true,
                loading: false,
            }

        case ClientDetailsActionTypes.EDIT_PASSWORD_USER:

            return {
                ...state,
                reset_password_user: action.payload
            }



        case ClientDetailsActionTypes.VALIDATE_CLIENT_DETAILS:

            toast.error(action.payload, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });

            return {
                ...state,
                error: action.payload
            }



        case ClientDetailsActionTypes.SET_CLIENT_DETAILS:
            const val = action.payload.value;
            return {
                ...state,
                [action.payload.name]: val,
            }


        case ClientDetailsActionTypes.SET_CLIENT_USERS_DETAILS:
            const val1 = action.payload.value;
            var matches = action.payload.name.split('.', 3);
            var dataposition = matches[1];
            var client_users = state.client_users;
            var previousvalue = client_users[matches[1]][matches[2]] ? client_users[matches[1]][matches[2]] : '';
            client_users[dataposition][matches[2]] = val1;


            return {
                ...state,
                updateval: val1,
                client_users: client_users,
                loading: false,
            }

        case ClientDetailsActionTypes.CLIENT_USERNAME_EXIST:
            const val2 = action.payload.value;
            console.log('val2', val2);
            let msg2 = action.msg
            var code = action.code;
            let type = action.errtype;
            var matches = action.payload.name.split('.', 3);
            var dataposition = matches[1];
            var client_users = state.client_users;
            let errormsga = state.client_users_error_messages;
            // client_users[dataposition][matches[2]] = val2;

            /*   client_users.forEach((item, index) => {
                   console.log(type, type, item.phone, val2);
                   if (type == 1 && index != dataposition && item.username == val2) {
                       msg2 = "UserName already Used in User" + (index != 0 ? index : '');
                   } else if (type == 2 && index != dataposition && item.phone == val2) {
                       msg2 = "Phone already Used in User" + (index != 0 ? index : '');
                   } else if (type == 3 && index != dataposition && item.email == val2) {
                       msg2 = "Email already Used in User" + (index != 0 ? index : '');
                   }
   
               });  */


            if (type == 1) {
                errormsga[dataposition]['emsg'] = msg2;
            } else if (type == 2) {
                errormsga[dataposition]['phemsg'] = msg2;
            } else if (type == 3) {
                errormsga[dataposition]['emailmsg'] = msg2;
            }

            return {
                ...state,
                updateval: val2 + "val2",
                client_users_error_messages: errormsga,
                loading: false,
            }

        case ClientDetailsActionTypes.ADD_MORE_USERS:
            var client_users = state.client_users;
            let errormsgarray = state.client_users_error_messages;
            var newuser = { fname: '', lname: '', email: '', mobile: '', username: '', password: '' };
            errormsgarray.push({ emsg: '', phemsg: '', emailmsg: '' });
            client_users.push(newuser)
            let r = Math.random().toString(36).substring(7);
            return {
                ...state,
                client_users: client_users,
                updateval: r,
                client_users_error_messages: errormsgarray
            }

        case ClientDetailsActionTypes.CLIENT_DETAILS_POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }
        default: return state;
    }
}