import { combineReducers } from 'redux';
import Login from './LoginReducers';
import HomePageReducers from './HomePageReducers';
import BraceletsReducers from './BraceletsReducers';
import SupervisorReducers from './SupervisorReducers';
import VictimsReducers from './VictimsReducers';
import OffendersReducers from './OffendersReducers';
import GroupDetailsReducers from './GroupDetailsReducers';
import GroupsReducers from './GroupsReducers';
import EventsReducers from './EventsReducers';
import OffendersDetailsReducers from './OffendersDetailsReducers';
import PrecinctReducers from './PrecinctReducers';
import SupervisorDetailsReducers from './SupervisorDetailsReducers';
import PrecinctDetailsReducers from './PrecinctDetailsReducers';
import ClientsReducers from './ClientsReducers';
import ClientDetailsReducers from './ClientDetailsReducers';
import PlacesAutoCompleteReducers from './PlacesAutoCompleteReducers';
import BraceletDetailsReducers from './BraceletDetailsReducers';
import VictimDetailsReducers from './VictimDetailsReducers';
import ValidationReducers from './ValidationReducers'
import ResetPasswordReducer from './ResetPasswordReducer'
import DepartmentReducers from './DepartmentReducers';
import DepartmentDetailsReducers from './DepartmentDetailsReducers'
import EditHomeScreenReducers from './EditHomeScreenReducer';
export default combineReducers({
    auth: Login,
    homepagedata: HomePageReducers,
    groups_braceltes: BraceletsReducers,
    bracelet_details: BraceletDetailsReducers,
    groups_supervisor: SupervisorReducers,
    groups_victims: VictimsReducers,
    victim_details: VictimDetailsReducers,
    groups_offenders: OffendersReducers,
    groups_details: GroupDetailsReducers,
    groups_home: GroupsReducers,
    home_events: EventsReducers,
    offender_details: OffendersDetailsReducers,
    groups_precinct: PrecinctReducers,
    supervisor_details: SupervisorDetailsReducers,
    precinct_details: PrecinctDetailsReducers,
    clients: ClientsReducers,
    client_details: ClientDetailsReducers,
    places: PlacesAutoCompleteReducers,
    validate: ValidationReducers,
    reset_pwd: ResetPasswordReducer,
    departments_home: DepartmentReducers,
    departments_details: DepartmentDetailsReducers,
    edithomescreen: EditHomeScreenReducers,
});