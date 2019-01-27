import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

var config = {
  apiKey: "AIzaSyApTbA60_IFZEJGq5PcItxvAYl6DwAwsYI",
  authDomain: "note-react-ql.firebaseapp.com",
  databaseURL: "https://note-react-ql.firebaseio.com",
  projectId: "note-react-ql",
  storageBucket: "note-react-ql.appspot.com",
  messagingSenderId: "351321461473"
};
firebase.initializeApp(config)

export const noteData = firebase.database().ref('dataForNote/');;
