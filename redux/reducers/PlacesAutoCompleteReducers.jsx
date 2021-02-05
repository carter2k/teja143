import PlacesAutoCompleteActionTypes from '../actionTypes/PlacesAutoCompleteActionTypes';
const INITIAL_STATE = {
    places: [],
    selected_place: {},
    loc_search_input: '',
    selected_address: '',
    selected_lat: '',
    selected_lng: '',
    loading: false,
    places_loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PlacesAutoCompleteActionTypes.PLACES_LOADING_START:
            return { ...state, places_loading: false, }
        case PlacesAutoCompleteActionTypes.SET_PLACES_LIST:
            console.log("action.payload.predictions", action.payload.predictions)
            return {
                ...state, loading: false,
                places: action.payload.predictions
            }
        case PlacesAutoCompleteActionTypes.GET_LAT_LANG_BY_PLACE_ID:
            let formatted_address = action.payload.result.formatted_address;
            let geometry_lat = action.payload.result.geometry.location.lat;
            let geometry_lng = action.payload.result.geometry.location.lng;
            return {
                ...state, loading: false,
                selected_place: action.payload,
                selected_address: formatted_address,
                selected_lat: geometry_lat,
                selected_lng: geometry_lng
            }
        case PlacesAutoCompleteActionTypes.PLACES_REQEST_START:
            return {
                ...state, loading: false,
            }
        case PlacesAutoCompleteActionTypes.PLACES_REQEST_STOP:
            return {
                ...state, loading: false, places_loading: false
            }
        case PlacesAutoCompleteActionTypes.ON_CHANGE_ADDRESS:
            return {
                ...state, loading: false, loc_search_input: action.payload
            }


        default: return state;
    }
}