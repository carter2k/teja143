import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../commons/Header";
import Search from "../commons/Search";
import Footer from "../commons/Footer";
import { MENU, URL } from "../helpers/Constans";
import { hasWhiteSpace, validateEmail } from "../helpers/globalHelpers/Utils";
import { getedithomescreenEvents, updateevent, refresh_edit_homescreen_data } from '../redux/actions/EditHomeScreenActions'
import { connect } from "react-redux";
import usa_states from "../DUMMY_DATA/usa_states.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../commons/Loading";
import config from '../../config';
import { getCacheObject } from '../helpers/globalHelpers/GlobalHelperFunctions';
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;

class EditHomeScreen extends Component {
  constructor(props) {
    super(props)
    this.props.refresh_edit_homescreen_data();
  }



  render() {
    const { eventTypes, loading } = this.props;
    var renderevents = [];
    var usa_states_data = [];

    eventTypes.forEach((event, index) => {
      renderevents.push(
        <li key={index} class={`widget ${(event.status == 1) ? "" : "removed"}`}>
          <h4>
            {event.qty}<sup>%</sup>
          </h4>
          <p>{event.event}</p>
          <div className="controls"  >
            <a >
              {event.status == 1 ?
                <i onClick={() => this.UpdateEvent(event)} className="fa fa-minus "></i> :
                <i onClick={() => this.UpdateEvent(event)} className="fa fa-plus " ></i>}
            </a>
          </div>
        </li>
      )
    });
    return (
      <div>
        <Header menu={MENU.EDITHOMESCREEN} />
        <ToastContainer />
        {/*handleChange={this.handleChange} search_by_string={search_by_string}*/}

        <section class="main_content py-5">
          <div class="breadcrumb_talitrix">
            <div class="container">
              <div class="row">
                <div class="col">
                  <div style={{ fontSize: "19px" }}>
                    <i onClick={this.changeSign} class="fa fa-home"></i>
                    <span>
                      <Link to={URL.NAV_HOME} style={{ color: "black" }}>
                        &nbsp; Home&nbsp;
                    </Link>
                    </span>
                    <span>
                      <i onClick={this.changeSign} class="fa fa-angle-double-right"></i>
                    </span>
                    <span>
                      <a style={{ color: "black" }}>&nbsp; EditHomeScreen</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div className="col mt-5">
                <h4 className="font-weight-bold">EDIT HOME SCREEN</h4>
                <p>Customize your home screen</p>
              </div>
            </div>
            <div class=" mb-5">
              <div
                class="percent_section">
                <div class="d-flex align-items-center">
                  <div class="row ">
                    <div className="col">
                      <ul className="widgets_list mt-4"
                        style={{ marginTop: "0px", marginBottom: "0px" }}>
                        {renderevents}
                      </ul>
                    </div>
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
    const user = getCacheObject(SESSION_KEY_NAME).user;
    var dataObject = { client_id: user.client_user_id };

    this.props.getedithomescreenEvents(dataObject);
  }
  UpdateEvent(item) {
    if (item.status == 0) {
      item.status = 1;
    } else if (item.status == 1) {
      item.status = 0;
    }
    this.props.updateevent(item)
  }

}


const mapStateToProps = state => {
  const { eventTypes, error, popup_msg, loading } = state.edithomescreen;
  return {
    eventTypes, loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getedithomescreenEvents: (input) => {
      dispatch(getedithomescreenEvents(input));
    }, updateevent: (input) => {
      dispatch(updateevent(input));
    }, refresh_edit_homescreen_data: () => {
      dispatch(refresh_edit_homescreen_data());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditHomeScreen);
