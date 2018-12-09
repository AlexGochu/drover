import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DroverSearch from './pages/DroverSearch';
import './App.css';

class App extends Component {
  droverSearch = event => {
    this.props.history.push('/drover-search')
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={DroverSearch} />
            <Route path="/drover-search" component={DroverSearch} />
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
