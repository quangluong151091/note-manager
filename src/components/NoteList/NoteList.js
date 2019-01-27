import React, { Component } from 'react';
import Note from './Note';
import { noteData } from '../../firebaseDB/ConnectDB';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFirebase: []
    }
  }
  componentWillMount = () => {
    noteData.on('value', (notes) => {
      var arrayData = [];
      notes.forEach((element) => {
        const key = element.key;
        const noteTitle = element.val().noteTitle;
        const noteContent = element.val().noteContent;
        arrayData.push({
          id: key,
          noteTitle: noteTitle,
          noteContent: noteContent
        })
        this.setState({
          dataFirebase: arrayData
        })
      })
      console.log("Data Fetched from database: ");
      console.log(this.state.dataFirebase);
      
    })
  }

  getData = () => {
    if (this.state.dataFirebase) {
      return (
        this.state.dataFirebase.map((value, key) => {
          return (
            <Note
              key={key}
              note={value}
              id={value.id}
              noteTitle={value.noteTitle}
              noteContent={value.noteContent}
            />
          )
        })
      )
    }
  }
  render() {
    return (
      <div id="noteList" role="tablist" aria-multiselectable="true">

        {this.getData()}

      </div>
    )
  }
}
export default NoteList;
