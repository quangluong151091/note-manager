import React, { Component } from 'react';
import { connect } from 'react-redux'



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeEditStatus: () => {
      dispatch({
        type: "CHANGE_EDIT_STATUS"
      })
    },
    getEditData: (editObj) => {
      dispatch({
        type: "GET_EDIT_DATA",
        editObj
      })
    },
    getDeleteData: (deleteId) => {
      dispatch({
        type: "DELETE_DATA",
        deleteId
      })
    },
    alertOn: (alertContent,alertType) => {
      dispatch({
        type: "ALERT_ON",
        alertContent,
        alertType
      })
    },
    alertOff: () => {
      dispatch({
        type: "ALERT_OFF"
      })
    }
  }
}

class Note extends Component {
  handleClickEditBtn = () => {
    this.props.changeEditStatus();
    this.props.getEditData(this.props.note);
  }
  handleClickDeleteBtn = () => {
    this.props.getDeleteData(this.props.note.id);
    this.props.alertOn('Deleted note "' + this.props.note.noteTitle + '"', 'danger')
  }
  render() {
    return (
      <div className="card">
        <div className="card-header" role="tab" id={"note" + this.props.id}>
          <h5>
            <a data-toggle="collapse" data-parent="#noteList" href={"#" + this.props.id} aria-expanded="true" aria-controls={this.props.id}>
              {this.props.noteTitle}
            </a>
            <div className='btn-group float-right'>
              <button
                className='btn btn-warning btn-sm mr-2'
                onClick={() => this.handleClickEditBtn()}
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                EDIT
              </button>
              <button
                className='btn btn-danger btn-sm mr-2'
                onClick={() => this.handleClickDeleteBtn()}
              >
                <i className="fa fa-trash-o" aria-hidden="true" />
                Delete
              </button>
            </div>
          </h5>
        </div>
        <div id={this.props.id} className="collapse in" role="tabpanel" aria-labelledby={"note" + this.props.id}>
          <div className="card-body">
            {this.props.noteContent}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Note)
