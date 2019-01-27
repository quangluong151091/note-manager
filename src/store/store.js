import { noteData } from '../firebaseDB/ConnectDB';

var redux = require('redux');
const noteInitialState = {
  isAdd: false,
  isEdit: false,
  editItem: {},
  isAlert: false,
  alertContent : '',
  alertType : ''
}
const allReducer = (state = noteInitialState, action) => {
  switch (action.type) {
    case "CHANGE_EDIT_STATUS":
      return {
        ...state,
        isEdit: !state.isEdit,
        isAdd: false
      }
    case "CHANGE_ADD_STATUS":
      return {
        ...state,
        isAdd: !state.isAdd,
        isEdit: false
      }
    case "ALERT_ON":
      return { 
        ...state, 
        isAlert: true,
        alertContent : action.alertContent,
        alertType : action.alertType
      }
    case "ALERT_OFF":
      return { ...state, isAlert: false }
    case "ADD_DATA":
      noteData.push(action.getItem)
      return state
    case "GET_EDIT_DATA":
      return { ...state, editItem: action.editObj }
    case "HANDLE_EDIT":
      noteData.child(action.editedObj.id).update({
        noteTitle: action.editedObj.noteTitle,
        noteContent: action.editedObj.noteContent
      })
      return { ...state, editItem: {} }
    case "DELETE_DATA":
      noteData.child(action.deleteId).remove()
      return state
    default:
      return state
  }
}
var store = redux.createStore(allReducer);

store.subscribe(() => {
  //console.log(JSON.stringify(store.getState()));
})

export default store;

