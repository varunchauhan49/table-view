import React, { Component } from 'react';
import CandidateApp from './Component/CandidateApp';
import { Provider } from "react-redux"
import store from "./Store/store";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <CandidateApp />
        </div>
      </Provider>
    );
  }
}

export default App;
