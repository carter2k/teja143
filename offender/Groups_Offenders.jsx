import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { hasWhiteSpace, validateEmail, filter_country_code } from '../helpers/globalHelpers/Utils';
import { getalloffenders, addoffender, page_refresh, setpopupmsg, setalphabet, setoffenderStatus } from '../redux/actions/OffendersActions';
import { connect } from 'react-redux';
import { URL } from '../helpers/Constans';
import { ROLE } from '../helpers/Constans';
import {
    getoffender, offender_page_refresh
} from '../redux/actions/OffenderDetailsActions';
import { getallsupervisors } from '../redux/actions/SupervisorActions';
import { getallbracelets, bracelet_page_refresh } from '../redux/actions/BraceletsActions';
import { resetvalidatedata } from '../redux/actions/ValidateActions';
import { OffenderTypeSt } from '../helpers/globalHelpers/Utils';
class Group_Offenders extends Component {
    constructor(props) {
        super(props)
        this.props.page_refresh(true);
    }

    render() {
        const { offenders, offender_type, offender_status, popup_msg, page_no, search_by_string, search_by_alphabet, pagination_total_pages,
            user } = this.props;

        var allalp = [];
        var offenders_data = [];
        var alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
        allalp.push(<li onClick={() => this.searchbyalphas("")} ><a class={`${search_by_alphabet == "" ? "activeAlph" : "link"}`} >ALL</a></li>)
        alphabets.forEach((letter, sno) => {
            allalp.push(<li index={letter} onClick={() => this.searchbyalphas(letter)} ><a class={`${search_by_alphabet == letter ? "activeAlph" : "link"}`} >{letter}</a></li>)
        });


        offenders.forEach((item, index) => {
            offenders_data.push(
                <tr key={index}>


                    <td>
                        {item.image_url ? <img class="rounded-circle img-fluid mr-3 profile_pic_img" src={item.image_url} /> :
                            <img class="rounded-circle img-fluid mr-3 profile_pic_img" src="/assets/img/p_pic.png" />}
                        <a onClick={() => this.redirectToffenderDetails(item)} class="text_link">{item.fname} {item.lname}</a>
                    </td>
                    <td>{item.address}, <br /> {item.city}, {item.state}, {item.zip}</td>
                    <td>{filter_country_code(item.mobile)}<br /></td>
                    {/* <td>{item.bracelet_serial_number ? item.bracelet_serial_number : 'N/A'}</td> */}
                    <td> <a onClick={() => this.redirectToSupervisorDetails(item)} class="text_link">{item.parole_officer}</a></td>
                    {false && <td>{item.precinct_name}</td>}
                </tr>
            )
        });
        return (
            <div class="row align-items-center">
                <div class="col-md-12 mb-2">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h4 class="text-uppercase">Offenders</h4>

                     {/*            {offender_type != 0 ? <><span onClick={() => this.alloffenders()}>Offenders</span><span class="m-2"><i class="fa fa-angle-double-right"></i></span><span>{OffenderTypeSt(offender_type)}</span></> : <span>Offenders</span>}</h4>
                      */}   </div>

<div class="col-md-6 text-right d-flex justify-content-end">
                            {user && (user.role_id == ROLE.ADMIN) && <div class="btn-group bordered_btn_grp" role="group"><button onClick={() => this.new_offender()} class="btn btn-primary btn-theme" type="button" data-toggle="modal">Add Offender</button></div>}
                        </div>
                    </div>
                </div>
                <div class="col-md-12 mb-4">
                    <ul class="list-inline d-flex justify-content-between text-uppercase alpha_sort">
                        {allalp}
                    </ul>
                </div>
                <div class="col-md-12">
                    <div class="table-responsive h-75">
                        <table class="table table-striped">
                            <thead>
                                <tr class="sticky-top">
                                    <th>Offender Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    {/* <th>Band</th> */}
                                    <th>Supervisor</th>
                                    {false && <th>Precinct Name</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {offenders_data}
                            </tbody>
                        </table>
                    </div>
                    {offenders.length > 0 ?
                        <div class="text-center d-flex align-items-center pagination_talitrix justify-content-center">
                            <button onClick={() => this.clickpreviouspage()} class="btn btn-dark btn-sm text-dark bg-white mr-2" type="button">Previous</button>
                            <button class="btn btn-dark btn-sm text-dark bg-white mr-2" type="button">{page_no}</button>
                            <p class="mr-2 mb-0">of {pagination_total_pages}</p>
                            <button onClick={() => this.clicknextpage()} class="btn btn-dark btn-sm text-dark bg-white" type="button">Next</button>
                        </div> : <div class="text-center"> No offenders found</div>}
                </div>
            </div>
        )
    }

    componentDidMount() {
        const { page_limit, offender_type } = this.props;
        const dataObject = {
            search_by_string: "", search_by_alphabet: "",
            page_no: 1, page_limit: page_limit, offender_type: offender_type
        }

        this.props.getOffenders(dataObject);
    }

    alloffenders() {
        const { page_limit } = this.props;
        const dataObject = {
            search_by_string: "", search_by_alphabet: "",
            page_no: 1, page_limit: page_limit, offender_type: 0
        }

        this.props.getOffenders(dataObject);
        this.props.parent_props.history.push("/offenders");
    }

    addoffenderPage() {
        this.props.parent_props.history.push("/offenders/create");
    }
   /*  edit_offender(item) {
        var offender_id = item.offender_id;
        if (offender_id) {
            var getoffenderinfo = { offender_id: offender_id };
            this.allsupervisors_bracelets(item);
            this.props.getoffender(getoffenderinfo);
        }

    }
 */

new_offender() {
    this.props.parent_props.history.push("/offenders/create");
}

    allsupervisors_bracelets(item) {
        let dataObject = {
            search_by_string: "", search_by_alphabet: "",
            page_no: 1, page_limit: 0
        }
        this.props.getSupervisors(dataObject);

        const braceletdataObject = {
            search_by_string: "", search_by_alphabet: "",
            page_no: 1, page_limit: 100, group_id: 0
        }
        this.props.resetvalidatedata();
        this.props.bracelet_page_refresh(true);
        console.log("item", item)
        if (item && item.bracelet_id) {
            this.props.getallbracelets(braceletdataObject, item.bracelet_id);
        } else {
            this.props.getallbracelets(braceletdataObject, 'new');
        }

    }


    redirectToSupervisorDetails(item) {
        if (item.parole_officer_id) {
            this.props.parent_props.history.push("/supervisors/" + item.parole_officer_id + "/details");
        }
    }

    redirectToffenderDetails(item) {
        if (item.offender_id) {
            this.props.parent_props.history.push("/offenders/" + item.offender_id + "/details");
        }
    }
    setoffenderListType(type) {
        const { page_limit, offender_type } = this.props;
        const dataObject = {
            search_by_string: "", search_by_alphabet: "",
            page_no: 1, page_limit: page_limit, offender_type: offender_type
        };
        this.props.setoffenderStatus(type);
        this.props.getOffenders(dataObject);
    }



    clicknextpage() {
        const { page_no, pagination_total_pages,
            search_by_string, search_by_alphabet, page_limit, offender_type } = this.props;
        var next_pageno = page_no + 1;
        if (next_pageno <= pagination_total_pages) {
            var dataObject = {
                search_by_string: search_by_string, page_no: next_pageno,
                search_by_alphabet: search_by_alphabet, page_limit: page_limit, offender_type: offender_type
            };
            this.props.getOffenders(dataObject);
        }
    }

    clickpreviouspage() {
        const { page_no,
            search_by_string, page_limit, search_by_alphabet, offender_type } = this.props;
        var prev_pageno = page_no - 1;
        if (prev_pageno > 0) {
            var dataObject = {
                search_by_string: search_by_string, page_no: prev_pageno,
                search_by_alphabet: search_by_alphabet, page_limit: page_limit, offender_type: offender_type
            };
            this.props.getOffenders(dataObject);
        }
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

    searchbyalphas(alpha) {
        const { page_limit, offender_type } = this.props;
        this.props.setalphabet(alpha);

        var dataObject = {
            search_by_string: "", search_by_alphabet: alpha,
            page_no: 1, page_limit: page_limit, offender_type: offender_type
        };
        this.props.getOffenders(dataObject);
    }

}



const mapStateToProps = state => {

    const { error, loading,
        search_by_string, search_by_type, search_by_alphabet, popup_msg, offender_type, offender_status,
        offenders, page_no, page_limit, pagination_total_pages } = state.groups_offenders;
    const { user } = state.auth;
    const { bracelets } = state.groups_braceltes;
    return {
        error, loading,
        search_by_string, search_by_type, search_by_alphabet, popup_msg, offender_type, offender_status,
        offenders, page_no, page_limit, pagination_total_pages, bracelets,
        user
    }
};

const mapDispatchToProps = dispatch => {

    return {
        getOffenders: (input) => {
            dispatch(getalloffenders(input));
        },
        getoffender: (input) => {
            dispatch(getoffender(input));
        }, offender_page_refresh: () => {
            dispatch(offender_page_refresh());
        },
        addSupervisors: (data) => {
            dispatch(addoffender(data));
        },
        popupmsg: (data) => {
            dispatch(setpopupmsg(data));
        },
        setalphabet: (data) => {
            dispatch(setalphabet(data));
        }, page_refresh: (data) => {
            dispatch(page_refresh(data));
        }, setoffenderStatus: (data) => {
            dispatch(setoffenderStatus(data));
        }, getSupervisors: (input) => {
            dispatch(getallsupervisors(input));
        }, getallbracelets: (input, filter_id) => {
            dispatch(getallbracelets(input, filter_id));
        }, resetvalidatedata: () => {
            dispatch(resetvalidatedata());
        }, bracelet_page_refresh: (data) => {
            dispatch(bracelet_page_refresh(data));
        }

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Group_Offenders);