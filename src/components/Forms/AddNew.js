import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    test: state.test
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addDataToStore: (getItem) => {
      dispatch({type:"ADD_DATA",getItem})
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

class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteTitle : '',
      noteContent : '',
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

  handleAdd = (title, content) => {
    let item = {};
    item.noteTitle = title;
    item.noteContent = content;

    // this.props.getData(item); //for react
    this.props.addDataToStore(item); //for redux
    this.props.alertOn('Added "' + item.noteTitle + '" successfully!', 'success');
  }

  render() {
    return (
      <div className="col-4">
        <div className="card">
          <div className="card-header bg-success text-white">
            <h5>Add New Note</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="noteTitleEdit">Note Title</label>
                <input onChange={(event) => this.isChange(event)} type="text" name="noteTitle" id="noteTitle" className="form-control" placeholder="Note title here" aria-describedby="helpIdNoteTitle" />
                <small id="helpIdNoteTitle" className="text-muted">Enter note title</small>
              </div>
              <div className="form-group">
                <label htmlFor="noteContent">Note Content</label>
                <textarea onChange={(event) => this.isChange(event)} rows='5' type="text" name="noteContent" id="noteContent" className="form-control" placeholder="Note content here" aria-describedby="helpIdNoteContent" defaultValue={""} />
                <small id="helpIdNoteContent" className="text-muted">Enter note content</small>
              </div>
              <button type="reset" onClick={() => this.handleAdd(this.state.noteTitle, this.state.noteContent)} className="btn btn-success btn-block font-weight-bold">ADD</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNew);
