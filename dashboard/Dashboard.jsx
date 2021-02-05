import React, { Component } from 'react'
import Header from '../commons/Header'
import Search from '../commons/Search'
import Footer from '../commons/Footer'
import { getredallevents, page_refresh, getoverviewPercentages } from '../redux/actions/HomePageActions';
import { connect } from 'react-redux';
import config from '../../config';
import { URL } from '../helpers/Constans';
import Loader from '../commons/Loading';
import { formatAMPM, rendereventcolor } from '../helpers/globalHelpers/Utils';
import HomePage from './HomePage';



const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.props.page_refresh();
  }



  render() {
    const { events, loading, missedCheckIn,
      nextCheckin,
      outOfRange } = this.props;
    var events_data = [];
    events.forEach((item, index) => {
      events_data.push(
        <li class="list-group-item" key={index}>
          <div class="row">
            <div class="col-md-1"><span class={rendereventcolor(item.event_type, item.status)}></span></div>
            <div class="col p-0">
              <h6 class="pt-1 mb-0">{item.event_title}</h6>
              <span class="text-muted text-muted text-sm text_underline d-block" onClick={() => this.redirectToEvents()}>{item.user_name}</span>
            </div>
            <div class="col-md-3 text-right time"><span class="text-center text-muted text-muted">{formatAMPM(item.event_time)}</span></div>
          </div>
        </li>
      )
    });

    return (
      <div>
        <Header />
        <Search />
        {loading && <Loader />}
        <section class="main_content py-5">
          <div class="container">
            <div class="card mb-5">
              <div class="card-body percent_section">
                <div class="row">
                  <div class="col-md-4">
                    <div class="d-flex align-items-center">
                      <h1 class="mr-3 mb-0">{nextCheckin}%</h1>
                      <p class="mb-0">Check-In's in next 30 minites</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="d-flex align-items-center">
                      <h1 class="mr-3 mb-0">{outOfRange}%</h1>
                      <p class="mb-0">Not Checked-In in last 30 minites</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="d-flex align-items-center">
                      <h1 class="mr-3 mb-0">{missedCheckIn}%</h1>
                      <p class="mb-0">Out of range in last 30 minites</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body p-0">
                    <h3 class="card-title card_head px-4 py-3 mb-0">EVENTS</h3>
                    <ul class="list-group events_list">
                      {events_data}
                    </ul>
                    <h6 class="text-uppercase border-top px-4 py-2 text_link" onClick={() => this.redirectToEvents()}>More events</h6>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card mb-3 bg_card_map">
                  <div class="card-body">
                    <h4 class="card-title color-orng _text_link" onClick={() => this.redirectToGroups()}>Groups</h4>
                    <p class="text-white-50 font-size-14"><br /></p>
                  </div>
                </div>
                <div class="card bg_card_map">
                  <div class="card-body">
                    <h4 class="card-title color-orng _text_link" onClick={() => this.redirectToBracelets()}>Bracelets</h4>
                    <p class="text-white-50 font-size-14"><br /></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
        <Footer />
      </div>
    )
  }
  componentDidMount() {
    var dataObject = {
      search_by_string: "", search_by_date: "", search_by_event: "",
      page_no: "1", page_limit: "3", group_id: "0", offender_id: "0"
    };
    this.props.getredallevents(dataObject);
    this.props.getoverviewPercentages(dataObject);
  }

  redirectToGroups() {
    this.props.history.push(URL.NAV_GROUPS);
  }

  redirectToBracelets() {
    this.props.history.push(URL.NAV_BRACELETS);
  }
  redirectToEvents() {
    this.props.history.push(URL.NAV_EVENTS);
  }

  redirectTOoffender(item) {
    if (item.user_id)
      this.props.history.push("/offenders/" + item.user_id + "/details");
  }



}


const mapStateToProps = state => {
  const { error, loading, events, overviewPercentages, missedCheckIn,
    nextCheckin,
    outOfRange } = state.homepagedata;
  const { user } = state.auth;
  return {
    error, loading, events, overviewPercentages, missedCheckIn,
    nextCheckin,
    outOfRange,
    user
  }
};

const mapDispatchToProps = dispatch => {

  return {
    getredallevents: (input) => {
      dispatch(getredallevents(input));
    }, page_refresh: () => {
      dispatch(page_refresh());
    }, getoverviewPercentages: (i) => {
      dispatch(getoverviewPercentages(i));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);