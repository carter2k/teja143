import React from 'react'
import { connect } from 'react-redux'
import { offender_percentage, setHomePageData, page_refresh } from '../redux/actions/HomePageActions';
import { getedithomescreenEvents } from '../redux/actions/EditHomeScreenActions'
import { getallclients, filterClients, clients_page_refresh } from '../redux/actions/ClientsActions';
import { ROLE, OFFENDER_TYPES } from '../helpers/Constans';
import config from '../../config';
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.props.page_refresh();
    this.props.clients_page_refresh()

  }

  render() {
    const { violent_offenders, sex_offenders, non_violent_offenders, client_id, clients, states, state_id } = this.props;
    let selected_cleint_name = 'All';
    let selected_state = 'All'
    const user = getCacheObject(SESSION_KEY_NAME).user;
    console.log("render")
    // cleint dropdown data
    let clients_data = [];

    clients.forEach((item, index) => {
      let active = false
      if (client_id == 0 && index == 0) {
        selected_cleint_name = clients[0].client_name;
        active = true
      } else if (item.client_user_id == client_id) {
        selected_cleint_name = item.client_name
        active = true
      }

      clients_data.push(
        <a key={item.client_user_id} class={`dropdown-item ${active ? "active" : ""}`} role="presentation"
          onClick={() => this.handleChange(item)}  >{item.client_name}</a>
      )
    });
    // state dropdown data
    let states_data = [];
    let selected_state_name = 'All';
    states.forEach((item, index) => {
      if (item.id == state_id) {
        selected_state_name = item.client_state
      }
      states_data.push(
        <a key={item.id} class={`dropdown-item ${item.id == state_id ? "active" : ""}`} role="presentation"
          onClick={() => this.filterClients(item)}  >{item.client_state}</a>
      )
    });

    return (
      <>
        <div className="row align-items-center">
          <div className="col-md-4">
            {user && (user.role_id == ROLE.SUPERADMIN) &&
              <div class="x-dropdown dropdown" >
                <div class="text-left x-drop-btn" data-toggle="dropdown" aria-expanded="false">
                  {selected_state_name} <i class="fa fa-caret-down"></i>
                </div>
                <div class="dropdown-menu scrollable-menu" role="menu">
                  {states_data}
                </div>
              </div>}
          </div>

          <div className="col-md-4">
            {user && (user.role_id == ROLE.SUPERADMIN) &&
              <div class="x-dropdown dropdown" >
                <div class="text-left x-drop-btn" data-toggle="dropdown" aria-expanded="false">
                  {selected_cleint_name} <i class="fa fa-caret-down"></i>
                </div>
                <div class="dropdown-menu scrollable-menu" role="menu">
                  {clients_data}

                </div>
              </div>}
          </div>

          <div className="col-md-4">
            <div className="d-flex align-items-center justify-content-end offender_count">
              <h4>{violent_offenders + sex_offenders + non_violent_offenders}</h4>
              <h6>TOTAL <br /> OFFENDERS</h6>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="d_wid _text_link" onClick={() => this.redirectTOOffdetails(OFFENDER_TYPES[0])}>
              <h4>Violent Offenders</h4>
              <div className="wid_number">
                <h5>{violent_offenders}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d_wid _text_link" onClick={() => this.redirectTOOffdetails(OFFENDER_TYPES[1])}>
              <h4>Sex Offenders</h4>
              <div className="wid_number wid_y_bg">
                <h5>{sex_offenders}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d_wid _text_link" onClick={() => this.redirectTOOffdetails(OFFENDER_TYPES[2])}>
              <h4>Non Violent Offenders</h4>
              <div className="wid_number wid_g_bg">
                <h5>{non_violent_offenders}</h5>
              </div>
            </div>
          </div>
        </div>


      </>

    )
  }

  componentDidMount() {
    const user = getCacheObject(SESSION_KEY_NAME).user;
    var req;
    var dataObject = {
      search_by_string: "", page_no: 1,
      search_by_alphabet: "", page_limit: 0
    };
    this.props.getClients(dataObject);
    if (user && (user.role_id == ROLE.ADMIN)) {
      req = { client_id: user.client_user_id };
    } else if (user && (user.role_id == ROLE.SUPERADMIN)) {
      req = { client_id: 0 };
    }
    this.props.offender_percentage(req);
    this.props.getedithomescreenEvents(req);
  }

  componentDidUpdate(prevProps, prevState) {
    const { state_id, clients } = this.props;
    //when state change get percentages and events of 1 st client in list
    if ((prevProps.state_id != state_id) && clients.length > 0) {
      let req = { client_id: clients[0].client_user_id };
      console.log("req1", req)
      this.props.offender_percentage(req);
      this.props.getedithomescreenEvents(req);
    }

  }

  redirectTOOffdetails(type) {
    this.props.urlhistory.push("/offenders/filterbyofdtype/" + type);
  }


  handleChange = (item) => {
    let d = { name: 'client_id', value: item.client_user_id };
    this.props.setHomePageData(d);
    let req = { client_id: item.client_user_id };
    this.props.offender_percentage(req);
    this.props.getedithomescreenEvents(req);
  }

  filterClients = (item) => {
    let d = { name: 'client_id', value: 0 };
    this.props.setHomePageData(d);
    this.props.filterClients(item)
  }

}


const mapStateToProps = state => {
  const { violent_offenders, sex_offenders, non_violent_offenders, client_id } = state.homepagedata;
  const { clients, states, state_id } = state.clients;
  const { user } = state.auth;
  return {
    violent_offenders, sex_offenders, non_violent_offenders, clients, client_id, user, states, state_id
  }
};

const mapDispatchToProps = dispatch => {
  return {
    offender_percentage: (i) => {
      dispatch(offender_percentage(i));
    }, setHomePageData: (input) => {
      dispatch(setHomePageData(input));
    }, getClients: (input) => {
      dispatch(getallclients(input));
    }, page_refresh: () => {
      dispatch(page_refresh());
    }, getedithomescreenEvents: (input) => {
      dispatch(getedithomescreenEvents(input));
    }, filterClients: (input) => {
      dispatch(filterClients(input));
    }, clients_page_refresh: () => {
      dispatch(clients_page_refresh());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
