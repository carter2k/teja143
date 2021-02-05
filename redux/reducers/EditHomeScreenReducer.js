import EditHomeScreenActionTypes from '../actionTypes/EditHomeScreenActionTypes';
import config from '../../../config';
import { toast } from 'react-toastify';
import _ from 'lodash';
const TOTAL_RECORDS_PER_PAGE = config.TOTAL_RECORDS_PER_PAGE;
const INITIAL_STATE = {
    eventTypes: [],
    error: '',
    popup_msg: "",
    loading: false,

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EditHomeScreenActionTypes.EDITHOMESCREEN_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }

        case EditHomeScreenActionTypes.EDITHOMESCREENS_REQUEST_SUCCESS:
            return {
                ...state, loading: false,
                eventTypes: action.payload.data,

            }
        case EditHomeScreenActionTypes.EDITHOMESCREENS_REQUEST_FAIL:

            return { ...state, loading: false, error: action.payload }

        case EditHomeScreenActionTypes.ADD_EVENT_HOMESCREENS_REQUEST_SUCCESS:
            var data = action.event_info;

            var events = state.eventTypes;
            let updatedevents = [];
            events.forEach((event, sno) => {
                if (event.id == data.id) {
                    event.status = data.status;
                }
                updatedevents.push(event)
            });
            console.log("add user response", updatedevents)
            return {
                ...state,
                eventTypes: updatedevents
            }
        case EditHomeScreenActionTypes.EDIT_HOME_SCREEN_CLEAR_DATA:
            return { ...state, ...INITIAL_STATE }

        default: return state;
    }
}