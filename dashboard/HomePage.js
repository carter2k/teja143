import React from 'react'
import { connect } from 'react-redux'
import Footer from '../commons/Footer'
import Header from '../commons/Header'
import { getedithomescreenEvents, refresh_edit_homescreen_data } from '../redux/actions/EditHomeScreenActions'
import { setHomePageData, page_refresh } from '../redux/actions/HomePageActions';
import Offender_Home_Percetage from './HomePage_Offender_Percentage'
import { eventType } from '../helpers/globalHelpers/Utils';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.props.refresh_edit_homescreen_data();
    this.props.page_refresh();
  }

  render() {
    const { eventTypes } = this.props;
    var renderevents = [];
    eventTypes.filter((event, index) => {
      if (event.status == 1)
        renderevents.push(
          <li key={index} class="widget _text_link" onClick={() => this.redirectTOdetails(event)}>
            <h4>
              {event.qty}<sup>%</sup>
            </h4>
            <p>{event.event}</p>
          </li>
        )
    });


    return (
      <div>
        <Header />
        <section class="main_content py-5">
          <div class="container">
            <Offender_Home_Percetage urlhistory={this.props.history} />
            <div class="mb-2">
              <div
                class="percent_section">

                <ul className="widgets_list mt-3 ml-0"
                        /* style={{ marginTop: "0px", marginBottom: "0px" }} */>
                  {renderevents}
                </ul>

              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
  componentDidMount() {

  }

  handleChange = (item) => {
    let d = { name: 'client_id', value: item.id };
    this.props.setHomePageData(d)
  }

  redirectTOdetails(item) {
    if (item.id && eventType(item.event_type)) {
      //let d = { name: 'event_type', value: item.id };
      // this.props.setHomePageData(d)
      this.props.history.push("/events/event_type/" + item.event_type);
    }
  }
}




const mapStateToProps = state => {
  const { eventTypes } = state.edithomescreen;
  const { voilent_offenders, sex_offenders, non_voilent_offenders, client_id } = state.homepagedata;
  const { clients } = state.clients;
  return {
    eventTypes, voilent_offenders, sex_offenders, non_voilent_offenders, clients, client_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    geteditevents: (input) => {
      dispatch(getedithomescreenEvents(input));
    }, setHomePageData: (input) => {
      dispatch(setHomePageData(input));
    }, refresh_edit_homescreen_data: () => {
      dispatch(refresh_edit_homescreen_data());
    }, page_refresh: () => {
      dispatch(page_refresh());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
