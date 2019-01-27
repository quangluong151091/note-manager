import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    editItem: state.editItem
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editDataToStore: (editedObj) => {
      dispatch({
        type: "HANDLE_EDIT",
        editedObj
      })
    },
    changeEditStatus: () => {
      dispatch({
        type: "CHANGE_EDIT_STATUS"
      })
    },
    alertOn: (alertContent, alertType) => {
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

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      noteTitle : '',
      noteContent : ''
    }
  }
  componentWillMount = () => {
    if (this.props.editItem) {
      this.setState({
        id: this.props.editItem.id,
        noteTitle : this.props.editItem.noteTitle,
        noteContent : this.props.editItem.noteContent
      })
    }
  }
  
  isChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name] : value
    })
  }

  handleSave = () => {
    let editObject = {}
    const {id,noteTitle,noteContent} = this.state;

    editObject.id = id;
    editObject.noteTitle = noteTitle;
    editObject.noteContent = noteContent;

    this.props.editDataToStore(editObject);
    this.props.changeEditStatus();
    this.props.alertOn('All change on note "' + editObject.noteTitle + '" was saved', 'warning');
  }
  render() {
    return (
      <div className="col-4">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5>Edit Note</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="noteTitleEdit">Note Title</label>
                <input
                  type="text" name="noteTitle" 
                  id="noteTitle" 
                  className="form-control" 
                  onChange={(event) => this.isChange(event)}
                  defaultValue={this.props.editItem.noteTitle}
                 />
                <small id="helpIdNoteTitle" className="text-muted">Enter note title</small>
              </div>
              <div className="form-group">
                <label htmlFor="noteContent">Note Content</label>
                <textarea
                  rows='5' type="text" 
                  name="noteContent" 
                  id="noteContent" 
                  className="form-control"
                  onChange={(event) => this.isChange(event)}
                  defaultValue={this.props.editItem.noteContent} 
                />
                <small id="helpIdNoteContent" className="text-muted">Enter note content</small>
              </div>
              <button type="reset" onClick={() => this.handleSave()} className="btn btn-primary btn-block font-weight-bold">SAVE</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)
