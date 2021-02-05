import ClientsActionTypes from '../actionTypes/ClientsActionTypes';
import config from '../../../config';
import { toast } from 'react-toastify';
const TOTAL_RECORDS_PER_PAGE = config.TOTAL_RECORDS_PER_PAGE;

const INITIAL_STATE = {
    clients: [],
    raw_clients: [],
    states: [],
    state_id: 0,
    search_by_string: "",
    search_by_type: "",
    search_by_alphabet: "",
    page_no: 1,
    pagination_total_pages: 1,
    page_limit: TOTAL_RECORDS_PER_PAGE,
    error: '',
    popup_msg: "",
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ClientsActionTypes.CLIENTS_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }

        case ClientsActionTypes.CLIENTS_REQUEST_SUCCESS:
            var clients = action.payload.data;
            clients.splice(0, 0, { client_user_id: 0, client_name: "All" });
            let states = [];
            states.splice(0, 0, { id: 0, client_state: "All" });
            clients.forEach((item, index) => {
                const stateExists = states.some(c => c.client_state === item.state);
                if (!stateExists && item && item.id) {
                    let state = { id: item.id, client_state: item.state }
                    states.push(state);
                }

            })

            return {
                ...state, loading: false,
                clients: clients,
                raw_clients: clients,
                states: states,
                pagination_total_pages: action.payload.totalPages,
                search_by_string: action.searchInfo.search_by_string, page_no: action.searchInfo.page_no,
                search_by_alphabet: action.searchInfo.search_by_alphabet
            }
        case ClientsActionTypes.CLIENTS_REQUEST_FAIL:

            return { ...state, loading: false, error: action.payload }

        case ClientsActionTypes.SET_CLIENTS_ALPHABET_VAL:
            return {
                ...state,
                search_by_alphabet: action.payload
            }
        case ClientsActionTypes.FIND_STATE_BY_CLIENT:
            let selected_state = action.payload;
            var filterclients;
            console.log("filterclients", selected_state)
            if (parseInt(selected_state.id) == 0) {
                filterclients = state.raw_clients;
            } else {
                filterclients = state.raw_clients.filter(st => st.state == selected_state.client_state);
            }

            return {
                ...state,
                clients: filterclients, state_id: selected_state.id
            }

        case ClientsActionTypes.ADD_CLIENTS_REQUEST_SUCCESS:
            toast.success("Client Added Successfully.", {
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
        case ClientsActionTypes.POPUP_BOX_ERROR_MESSAGE:
            return {
                ...state,
                popup_msg: action.payload
            }
        case ClientsActionTypes.CLIENT_PAGE_RESET:
            return {
                ...state, ...INITIAL_STATE
            }

        default: return state;
    }
}