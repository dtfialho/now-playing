import React, { Component } from 'react';
import { connect } from '../../../node_modules/react-redux';

import { fetchTweets } from '../../actions';

import './Tweets.css';

class Tweets extends Component {
  componentDidMount() {
    this.props.fetchTweets();
  }

  convertVideoUrl(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match&&match[7].length===11) {
      return `//www.youtube.com/embed/${match[7]}`;
    } else {
      return '';
    }
  }

  renderTweets() {
    switch(this.props.tweets) {
      case null:
        return;
      default:
        if (!this.props.tweets.statuses || (this.props.tweets.statuses && this.props.tweets.statuses.length === 0)) {
          return <div>No tweets were found.</div>;
        }

        if (this.props.tweets.statuses) {
          return this.props.tweets.statuses
            .filter(tweet => tweet.entities.urls.length > 0)
            .map(tweet => {
              const url = this.convertVideoUrl(tweet.entities.urls[0].expanded_url);
              return (
                <div className="TweetWrapper" key={tweet.id}>
                  <iframe src={url}></iframe>
                </div>
              )
            });
        }
    }
  }

  render() {
    return (
      <section className="container Tweets">
        {this.renderTweets()}
      </section>
    );
  }
}

function mapStateToProps({ tweets }) {
  return { tweets };
}

export default connect(mapStateToProps, { fetchTweets })(Tweets);
