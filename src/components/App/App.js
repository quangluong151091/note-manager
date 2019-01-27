import React, { Component } from 'react';
// import {noteData} from '../../firebaseDB/ConnectDB' //for react
import Nav from '../Nav/Nav';
import NoteList from '../NoteList/NoteList';
import AddNew from '../Forms/AddNew';
import EditNote from '../Forms/EditNote';
import { connect } from 'react-redux'
import AlertInfo from '../Alert/AlertInfo';


const mapStateToProps = (state, ownProps) => {
  return {
    isAdd: state.isAdd,
    isEdit: state.isEdit
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeAddStatus: () => {
      dispatch({
        type: "CHANGE_ADD_STATUS"
      })
    }
  }
}

class App extends Component {
// for react
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // }
  // addData = (item) => {
  //   noteData.push(item);
  // }

  showAddForm = () => {
    if(this.props.isAdd) {
      return <AddNew />
    }
  }
  showEditForm = () => {
    if(this.props.isEdit) {
      return <EditNote />
    }
  }
  render() {
    return (
      <div className="App">
        <Nav />

        <AlertInfo />

        <div className="container">
          <div className="row">
            <div className="col-8">
              <button 
                onClick={() => this.props.changeAddStatus()}
                className={(this.props.isAdd ? "btn-danger " : "btn-success ") + "btn btn-block font-weight-bold mb-3"}
              >
                <i className={this.props.isAdd ? "fa fa-times mr-2" : "fa fa-plus mr-2"} aria-hidden="true"></i>
                {this.props.isAdd ? 'CANCEL' : 'ADD'}
              </button>
            <NoteList />
            </div>
            
            { this.showAddForm() }
            { this.showEditForm() }

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)