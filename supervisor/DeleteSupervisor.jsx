import React, { Component } from 'react'
import usa_states from '../DUMMY_DATA/usa_states.json'
import { deletesupervisor } from '../redux/actions/SupervisorDetailsActions';
import { connect } from 'react-redux';

class DeleteSupervisor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { first_name, popup_msg } = this.props;

        return (
            <>
                <div class="modal fade talitrix_modal" role="dialog" tabindex="-1" id="delete_item">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title font-weight-bold">Confirm</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                            <div class="modal-body">
                                <h5 class="font-weight-bold">Are you sure you want to delete {first_name} </h5>
                            </div>
                            <div class="modal-body">
                                <div class="text-right"><button onClick={() => this.deleteitem()} class="btn btn-primary btn-theme btn-sm" type="button">Proceed</button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade talitrix_modal" role="dialog" tabindex="-1" data-backdrop="static" id="info_msg">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title font-weight-bold">Info</h4></div>
                            <div class="modal-body">
                                <h5 class="font-weight-bold">{popup_msg}</h5>
                            </div>
                            <div class="modal-body">
                                <div onClick={() => this.closepopupbox()} class="text-right"><button class="btn btn-primary btn-theme btn-sm" type="button">OK</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        // check whether client has 
        const { group_id, item_deleted } = this.props;
        if (item_deleted) {
            setTimeout(() => {
                this.props.parentProps.history.push("/groups/" + group_id + "/details");
            }, 1000);
        }
    }


    deleteitem() {
        const { id, officer_id } = this.props;

        let dataObject = {
            status: '2',
            id: id,
            officer_id: officer_id
        };
        console.log('deleted object', dataObject);
        this.props.deletesupervisor(dataObject);
    }

    closepopupbox() {
        window.$('#info_msg').modal('hide');
    }

}

const mapStateToProps = state => {
    const { first_name, id, item_deleted, group_id, officer_id, popup_msg
    } = state.supervisor_details;

    return {
        first_name, id, item_deleted, group_id, officer_id, popup_msg
    }
};

const mapDispatchToProps = dispatch => {

    return {
        deletesupervisor: (input) => {
            dispatch(deletesupervisor(input));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteSupervisor);