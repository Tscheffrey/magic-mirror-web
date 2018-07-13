import React, { Component } from 'react'
import logo from './logo.svg'
import storageHandler from './StorageHandler'

import { Provider } from 'react-redux'
import { store } from './redux'

import MagicMirror from './MagicMirror'

// storageHandler.setProperty('Marius', 'Snitch')
//storageHandler.setProperty('test2', {test:'boom', foo:'bar'})
//console.log(storageHandler.getProperty('test2'))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MagicMirror />
      </Provider>
    );
  }
}

export default App
