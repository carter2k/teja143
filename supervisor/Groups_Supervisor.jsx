import React, { Component } from 'react'
import { hasWhiteSpace, validateEmail, filter_country_code } from '../helpers/globalHelpers/Utils';
import { getallsupervisors, addsupervisor, page_refresh, setpopupmsg, setalphabet } from '../redux/actions/SupervisorActions';
import { connect } from 'react-redux';
import { getsupervisor, refresh_supervisor } from '../redux/actions/SupervisorDetailsActions';
import { ROLE } from '../helpers/Constans'
import { resetvalidatedata } from '../redux/actions/ValidateActions';

class Group_Supervisor extends Component {
    constructor(props) {
        super(props)
        this.props.page_refresh(true);
    }

    render() {
        const { supervisors, popup_msg, page_no, search_by_string, search_by_alphabet, pagination_total_pages, user } = this.props;

        var allalp = [];
        var supervisors_data = [];
        var alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
        allalp.push(<li onClick={() => this.searchbyalphas("")} ><a class={`${search_by_alphabet == "" ? "activeAlph" : "link"}`} >ALL</a></li>)
        alphabets.forEach((letter, sno) => {
            allalp.push(<li index={letter} onClick={() => this.searchbyalphas(letter)} ><a class={`${search_by_alphabet == letter ? "activeAlph" : "link"}`} >{letter}</a></li>)
        });

        supervisors.forEach((item, index) => {
            supervisors_data.push(
                <tr key={index}>
                    <td >
                        <a onClick={() => this.redirectTsupervisorDetails(item)} class="text_link">{item.fname}</a></td>
                    <td>{item.address}<br /></td>
                    <td>{filter_country_code(item.mobile)}<br /></td>
                    <td>{item.email}</td>
                </tr>
            )
        });
        return (
            <div class="row align-items-center">
                <div class="col-md-12 mb-2">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h4 class="text-uppercase">Supervisors</h4>
                        </div>
                        <div class="col-md-6 text-right d-flex justify-content-end">
                            {user && (user.role_id == ROLE.ADMIN) && <div class="btn-group bordered_btn_grp" role="group"><button onClick={() => this.new_supervisor()} class="btn btn-primary btn-theme" type="button" data-toggle="modal">Add Supervisor</button></div>}
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
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {supervisors_data}
                            </tbody>
                        </table>
                    </div>
                    {supervisors.length > 0 ?
                        <div class="text-center d-flex align-items-center pagination_talitrix justify-content-center">
                            <button onClick={() => this.clickpreviouspage()} class="btn btn-dark btn-sm text-dark bg-white mr-2" type="button">Previous</button>
                            <button class="btn btn-dark btn-sm text-dark bg-white mr-2" type="button">{page_no}</button>
                            <p class="mr-2 mb-0">of {pagination_total_pages}</p>
                            <button onClick={() => this.clicknextpage()} class="btn btn-dark btn-sm text-dark bg-white" type="button">Next</button>
                        </div> : <div class="text-center"> No supervisors found</div>}
                </div>
            </div>
        )
    }

    componentDidMount() {
        const { page_limit } = this.props;
        const dataObject = {
            search_by_string: "", search_by_alphabet: "",
            page_no: 1, page_limit: page_limit
        }

        this.props.getSupervisors(dataObject);
    }



    clicknextpage() {
        const { page_no, pagination_total_pages,
            search_by_string, search_by_alphabet, page_limit } = this.props;
        var next_pageno = page_no + 1;
        if (next_pageno <= pagination_total_pages) {
            var dataObject = {
                search_by_string: search_by_string, page_no: next_pageno,
                search_by_alphabet: search_by_alphabet, page_limit: page_limit
            };
            this.props.getSupervisors(dataObject);
        }
    }

    clickpreviouspage() {
        const { page_no,
            search_by_string, page_limit, search_by_alphabet } = this.props;
        var prev_pageno = page_no - 1;
        if (prev_pageno > 0) {
            var dataObject = {
                search_by_string: search_by_string, page_no: prev_pageno,
                search_by_alphabet: search_by_alphabet, page_limit: page_limit
            };
            this.props.getSupervisors(dataObject);
        }
    }


    handleChange = (e) => {
        const { search_by_string, page_limit } = this.props;
        const dataObject = {
            search_by_string: search_by_string, search_by_alphabet: "",
            page_no: 1, page_limit: page_limit
        };
        if (e.target.name == "search_by_string") {
            dataObject.search_by_string = e.target.value;
            this.props.getSupervisors(dataObject);
        }
    }

    new_supervisor() {
        this.props.parent_props.history.push("/supervisors/create");
    }


    redirectTsupervisorDetails(item) {
        if (item.id) {
            this.props.parent_props.history.push("/supervisors/" + item.id + "/details");
        }
    }

    searchbyalphas(alpha) {
        const { page_limit } = this.props;
        this.props.setalphabet(alpha);
        var dataObject = {
            search_by_string: "", search_by_alphabet: alpha,
            page_no: 1, page_limit: page_limit
        };
        this.props.getSupervisors(dataObject);
    }



}



const mapStateToProps = state => {

    const { error, loading,
        search_by_string, search_by_type, search_by_alphabet, popup_msg,
        supervisors, page_no, page_limit, pagination_total_pages } = state.groups_supervisor;
    const { user } = state.auth;
    return {
        error, loading,
        search_by_string, search_by_type, search_by_alphabet, popup_msg,
        supervisors, page_no, page_limit, pagination_total_pages, user
    }
};

const mapDispatchToProps = dispatch => {

    return {
        getSupervisors: (input) => {
            dispatch(getallsupervisors(input));
        }, getsupervisor: (d) => {
            dispatch(getsupervisor(d));
        }, refresh_supervisor: () => {
            dispatch(refresh_supervisor());
        },
        addSupervisors: (data) => {
            dispatch(addsupervisor(data));
        },
        popupmsg: (data) => {
            dispatch(setpopupmsg(data));
        },
        setalphabet: (data) => {
            dispatch(setalphabet(data));
        }, page_refresh: (data) => {
            dispatch(page_refresh(data));
        }, resetvalidatedata: () => {
            dispatch(resetvalidatedata());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Group_Supervisor);