import React, { Component } from 'react'
import usa_states from '../DUMMY_DATA/usa_states.json'
import { reassign_supervisorService } from '../redux/actions/SupervisorDetailsActions';
import { connect } from 'react-redux';

class ReAssignSupervisorConfirm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { reassign_offender, id, page_reload, reassign_supervisor_name, reassign_supervisor_id } = this.props;

        return (
            <>
                <div class="modal fade talitrix_modal" role="dialog" tabindex="-1" id="re_assign_msg">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title font-weight-bold">Confirm</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                            <div class="modal-body">
                                <h5 class="font-weight-bold">Are you sure you want to assign offender {reassign_offender.fname} to {reassign_supervisor_name} </h5>
                            </div>
                            <div class="modal-body">
                                <div class="text-right"><button onClick={() => this.reassign()} class="btn btn-primary btn-theme btn-sm" type="button">Proceed</button></div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        // check whether client has 
        const { group_id, page_reload } = this.props;
        if (page_reload) {
            setTimeout(() => {

            }, 1000);
        }
    }


    reassign() {
        const { reassign_supervisor_id, reassign_offender } = this.props;

        let dataObject = {
            offender_id: reassign_offender.offender_id,
            parole_officer_id: reassign_supervisor_id
        };
        this.props.reassign_supervisorService(dataObject);
    }

    closepopupbox() {
        window.$('#re_assign_msg').modal('hide');
    }

}

const mapStateToProps = state => {
    const { reassign_offender, id, page_reload, reassign_supervisor_id, reassign_supervisor_name,
    } = state.supervisor_details;

    return {
        reassign_offender, id, page_reload, reassign_supervisor_id, reassign_supervisor_name
    }
};

const mapDispatchToProps = dispatch => {

    return {
        reassign_supervisorService: (input) => {
            dispatch(reassign_supervisorService(input));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReAssignSupervisorConfirm);