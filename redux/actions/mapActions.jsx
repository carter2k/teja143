
import MapActions from '../actionTypes/MapActions';
export const clickedonMarker = (data) => {
    return dispatch => {
        dispatch(clickonMarker(data));
    };
}

const clickonMarker = (data) => ({
    type: OffendersDetailsActionTypes.CLICKED_ON_MARKER,
    payload: data
});