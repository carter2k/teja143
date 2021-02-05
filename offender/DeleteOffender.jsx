import React, { Component } from 'react'
import usa_states from '../DUMMY_DATA/usa_states.json'
import { deleteoffender } from '../redux/actions/OffenderDetailsActions';
import { connect } from 'react-redux';

class DeleteOffender extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { first_name } = this.props;

        return (
            <>
                <div class="modal fade talitrix_modal" role="dialog" tabindex="-1" id="delete_item">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title font-weight-bold">Confirm</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                            <div class="modal-body">
                                <h5 class="font-weight-bold">Are you sure you want to delete   {first_name} </h5>
                            </div>
                            <div class="modal-body">
                                <div class="text-right"><button onClick={() => this.deleteitem()} class="btn btn-primary btn-theme btn-sm" type="button">Proceed</button></div>
                            </div>
                        </div>
                    </div>
                </div></>
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
        const { id, offender_id } = this.props;

        let dataObject = {
            status: '2',
            id: id,
            offender_id: offender_id,
        };
        this.props.deleteoffender(dataObject);
    }

}

const mapStateToProps = state => {
    const { first_name, id, item_deleted, group_id, offender_id
    } = state.offender_details;

    return {
        first_name, id, item_deleted, group_id, offender_id
    }
};

const mapDispatchToProps = dispatch => {

    return {
        deleteoffender: (input) => {
            dispatch(deleteoffender(input));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteOffender);