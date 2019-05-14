import React, { Component} from 'react';
import './App.css';

import Sequencer from "./components/sequencer"

class App extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return <Sequencer />;
  }
}

export default App;
