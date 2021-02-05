import React from 'react'
import { connect } from 'react-redux'
import Footer from '../commons/Footer'
import Header from '../commons/Header'
import { getedithomescreenEvents } from '../redux/actions/EditHomeScreenActions'
import { offender_percentage_ns, setHomePageData } from '../redux/actions/HomePageActions';
import { Line } from 'react-chartjs-2'
import { dataformat, todaydate, dateTost, filter_country_code } from "../helpers/globalHelpers/Utils";
import DatePicker from "react-datepicker";
import Offender_Home_Percetage from './HomePage_Offender_Percentage'

const offendertypes = [{ id: 0, name: "All" }, { id: 1, name: "Voilent Offender" }, { id: 2, name: "Sex Offender" }, { id: 3, name: "Non Voilent Offender" }]

class HomePage extends React.Component {

  render() {
    var { eventTypes, loading, voilent_offenders, sex_offenders, non_voilent_offenders, client_id, clients,
      offender_type, event_type, clients, from_date, to_date, offender_fromday_date, offender_today_date } = this.props;
    from_date = from_date ? dataformat(from_date) : null;
    to_date = to_date ? dataformat(to_date) : null;

    console.log("eventTypes", eventTypes)
    var events_types = [];
    let selected_event_name = 'All';
    eventTypes.forEach((item, index) => {
      if (item.status == 1) {
        if (item.id == event_type) {
          selected_event_name = item.event
        }
        events_types.push(
          <a key={item.id} class={`dropdown-item ${item.id == event_type ? "active" : ""}`} role="presentation"
            onClick={() => this.handleChange("event_type", item)}  >{item.event}</a>
        )
      }

    });

    let offender_types = [];
    let selected_offender_name = '';
    offendertypes.forEach((item, index) => {
      if (item.id == offender_type) {
        selected_offender_name = item.name
      }
      offender_types.push(
        <a key={item.id} class={`dropdown-item ${item.id == offender_type ? "active" : ""}`} role="presentation"
          onClick={() => this.handleChange("offender_type", item)}  >{item.name}</a>
      )
    });

    return (
      <div>
        <Header />
        <section class="main_content py-5">
          <div class="container">
            <Offender_Home_Percetage urlhistory={this.props.history} />
            <div className="row align-items-center mt-5">
              <div className="col-md-3">
                <div class="x-dropdown dropdown" >
                  <div class="text-left x-drop-btn" data-toggle="dropdown" aria-expanded="false">
                    {selected_event_name} <i class="fa fa-caret-down"></i>
                  </div>
                  <div class="dropdown-menu scrollable-menu" role="menu">
                    {events_types}
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div class="x-dropdown dropdown" >
                  <div class="text-left x-drop-btn" data-toggle="dropdown" aria-expanded="false">
                    {selected_offender_name} <i class="fa fa-caret-down"></i>
                  </div>
                  <div class="dropdown-menu scrollable-menu" role="menu">
                    {offender_types}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="font-size-14">From Date</label>
                  <DatePicker
                    selected={from_date}
                    className="form-control x-drop-btn"
                    onChange={(date) => this.handleDateToChange("from_date", date)}
                    maxDate={offender_fromday_date}
                    placeholderText="From Date"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="font-size-14">To Date &nbsp;	&nbsp;	&nbsp;	</label>
                  <DatePicker
                    selected={to_date}
                    className="form-control x-drop-btn"
                    onChange={(date) => this.handleDateToChange("to_date", date)}
                    maxDate={offender_today_date}
                    placeholderText="To Date"
                  />
                </div>
              </div>

            </div>
            <div class="mb-5 mt-5">
              <Line
                data={{
                  labels: ["Dec", "week1", "week2", "week3", "week4"],
                  datasets: [{
                    // label: "# of criminal activities",
                    data: [22, 19, 33, 45, 14],

                    strokeColor: "rgba(220,180,0,1)",
                    pointColor: "orange",
                    pointBackgroundColor: "orange",
                    pointRadius: 5,
                    pointStyle: "circle",
                    pointRotation: "none",
                    fill: false,
                    pointDotRadius: 5,

                    lineTension: 0.1,
                    borderColor: "black",
                    borderWidth: 3,
                    borderJoinStyle: '',
                    pointBorderColor: 'white',
                    grid: {
                      row: {
                        colors: ['#ba3939', '#ba3939'],
                        opacity: 0.5
                      },
                    },

                  },
                  ]
                }}

                height={350}
                width={1500}

                options={{
                  legend: {
                    display: false
                  },
                  tooltips: {
                    callbacks: {
                      data: function (tooltipItem) {
                        return tooltipItem.xdata + " %";

                      }
                    }
                  },
                  grid: {
                    row: {
                      colors: ['red', 'blue'],
                      opacity: 1
                    },
                  },

                  maintainAspectRatio: true,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          callback: function (value) {
                            return value + "%";
                          },
                          beginAtZero: true,
                          min: 0,
                          max: 100
                        }
                      }
                    ],
                  },
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return tooltipItem.yLabel + '%';
                        //   <p>Here is a <Tooltip message={'Hello, I am a super cool tooltip'} position={'top'}>tooltip</Tooltip> on top.</p>
                      }
                    }
                  }
                }
                }
              />
            </div>
          </div>

        </section>

        <Footer />
      </div>
    )
  }
  componentDidMount() {
    var dataObject = {};
  }
  handleChange = (id, item) => {
    let d = { name: id, value: item.id };
    this.props.setHomePageData(d)

  }

  handleDateToChange = (id, date) => {
    if (date) {
      var data = { name: id, value: date };
      data.value = dateTost(date);
      this.props.setHomePageData(data)
    }
  };

  submitrequest = () => {
    var req = {
      event_type: "good_behaviour", offender_type: "1",// voilent, sex
      fromDate: "", toDate: "", client_id: "10"
    }
    //output {titles: [ "week1", "week2", "week3", "week4"], data: [19, 33, 45, 14]}
  }
}




const mapStateToProps = state => {
  const { eventTypes } = state.edithomescreen;
  const { offender_type, event_type, from_date, to_date, offender_fromday_date, offender_today_date } = state.homepagedata;
  return {
    eventTypes, offender_type, event_type, from_date, to_date, offender_fromday_date, offender_today_date
  };
};

const mapDispatchToProps = dispatch => {
  return {
    geteditevents: (input) => {
      dispatch(getedithomescreenEvents(input));
    }, setHomePageData: (input) => {
      dispatch(setHomePageData(input));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
