import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Header from '../commons/Header'
import Search from '../commons/Search'
import Footer from '../commons/Footer'
import { MENU, URL } from '../helpers/Constans';
import Offenders from '../offender/Groups_Offenders'
import { setoffenderGroupId, getalloffenders, setoffenderType } from '../redux/actions/OffendersActions';
import { connect } from 'react-redux';
import Loader from '../commons/Loading';
import OffenderEditCreateDialog from './OffenderEditCreateDialog';
import { validateOffender, getOffenderId } from '../helpers/globalHelpers/Utils';

class Offender_Home extends Component {
  constructor(props) {
    super(props)
    let off_type = 0;
    let param_offender_type = this.props.match.params.offender_type;
    if (validateOffender(param_offender_type)) {
      off_type = getOffenderId(param_offender_type);
    } else if (param_offender_type) {
      this.props.history.push("/offenders");
    }
    this.props.setoffenderType(off_type);
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        {loading && <Loader />}
        <Header menu={MENU.OFFENDERS} />
        <Search handleChange={this.handleChange} />
        <div class="breadcrumb_talitrix">
          <div class="container">
            <div class="row">
              <div class="col">
                <div style={{ fontSize: '19px' }}><i class="fa fa-home"></i><span><Link to={URL.NAV_HOME} style={{ color: 'black' }}>&nbsp; Home&nbsp;</Link></span><span><i class="fa fa-angle-double-right"></i></span><span><a style={{ color: 'black' }}>&nbsp; Offenders</a></span></div>
              </div>
            </div>
          </div>
        </div>
        <section class="main_content py-5">
          <div class="container">
            <Offenders parent_props={this.props} />
          </div>
        </section>
      {/*   <OffenderEditCreateDialog /> */}
        <Footer />
      </div>
    )
  }

  handleChange = (e) => {
    const { search_by_string, page_limit, offender_type } = this.props;
    const dataObject = {
      search_by_string: search_by_string, search_by_alphabet: "",
      page_no: 1, page_limit: page_limit, offender_type: offender_type
    };
    if (e.target.name == "search_by_string") {
      dataObject.search_by_string = e.target.value;
      this.props.getOffenders(dataObject);
    }
  }
}



const mapStateToProps = state => {

  const { error, loading,
    search_by_string, search_by_type, search_by_alphabet, popup_msg, offender_type,
    offenders, page_no, page_limit, pagination_total_pages } = state.groups_offenders;

  return {
    error, loading,
    search_by_string, search_by_type, search_by_alphabet, popup_msg, offender_type,
    offenders, page_no, page_limit, pagination_total_pages,
  }
};

const mapDispatchToProps = dispatch => {

  return {
    setoffenderGroupId: (input) => {
      dispatch(setoffenderGroupId(input));
    }, getOffenders: (input) => {
      dispatch(getalloffenders(input));
    }, setoffenderType: (input) => {
      dispatch(setoffenderType(input));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Offender_Home);