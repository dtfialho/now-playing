import React, { Component } from 'react';
import { connect } from '../../../node_modules/react-redux';

import { fetchTweets } from '../../actions';

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
      case false:
        return <div>No tweets found</div>;
      default:
        if (this.props.tweets.statuses) {
          return this.props.tweets.statuses
            .filter(tweet => tweet.entities.urls.length > 0)
            .map(tweet => {
              const url = this.convertVideoUrl(tweet.entities.urls[0].expanded_url);
              return (
                <div key={tweet.id}>
                  <iframe src={url}></iframe>
                </div>
              )
            });
        }
    }
  }

  render() {
    return <div>{this.renderTweets()}</div>;
  }
}

function mapStateToProps({ tweets }) {
  return { tweets };
}

export default connect(mapStateToProps, { fetchTweets })(Tweets);
