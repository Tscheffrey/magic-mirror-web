import React, { Component } from 'react'
import logo from './logo.svg'
import storageHandler from './StorageHandler'
//import './App.css';

import MagicMirror from './MagicMirror'

// storageHandler.setProperty('Marius', 'Snitch')
//storageHandler.setProperty('test2', {test:'boom', foo:'bar'})
//console.log(storageHandler.getProperty('test2'))

class App extends Component {
  render() {
    return (
      <div className="App">
        <MagicMirror />
      </div>
    );
  }
}

export default App;
