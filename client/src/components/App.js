import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import './App.css';
import Header from './Header/Header';
import Landing from './Landing/Landing';
import Tweets from './Tweets/Tweets';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <main className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/tweets" component={Tweets} />
            </main>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
