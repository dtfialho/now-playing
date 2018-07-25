import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a className="btn btn-primary" href="/auth/twitter">Login With Twitter</a>
          </li>
        );
      default:
        return (
          <li>
            <a className="btn btn-primary" href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <Link
                className="AppTitle"
                to={ this.props.auth ? '/tweets' : '/' }>
                #nowPlaying
              </Link>
              <ul className="LoginAction">
                { this.renderContent() }
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
