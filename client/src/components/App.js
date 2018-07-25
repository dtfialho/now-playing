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

    const nightModeStorage = localStorage.getItem('gmtNightMode');
    const nightMode = document.querySelector('#night-mode');
    const metaThemeColor = document.querySelector("meta[name=theme-color]");

    if (nightModeStorage) {
      document.documentElement.classList.add('night-mode');
      metaThemeColor.setAttribute("content", '#2b2b2b');
      nightMode.checked = true;
    }

    nightMode.addEventListener('click', () => {
      document.documentElement.classList.toggle('night-mode');

      if (document.documentElement.classList.contains('night-mode')) {
        localStorage.setItem('gmtNightMode', true);
        metaThemeColor.setAttribute("content", '#2b2b2b');
        return;
      }
      localStorage.removeItem('gmtNightMode');
      metaThemeColor.setAttribute("content", '#005f97');
    });
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
        <input id="night-mode" className="NightModeBtn" type="checkbox" aria-label="nigth-mode" />
      </div>
    );
  }
}

export default connect(null, actions)(App);
