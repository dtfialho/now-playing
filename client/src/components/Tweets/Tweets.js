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
                <div className="col-xs-12 col-md-10" key={tweet.id_str}>
                  <div className="TweetWrapper">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="VideoWrapper">
                          <iframe src={url} title={tweet.id_str}></iframe>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="TweetDetails">
                          <div className="UserBlock">
                            <figure>
                              <a href={`https://twitter.com/${tweet.user.screen_name}`} target="_blank">
                                <img src={tweet.user.profile_image_url_https} alt={tweet.user.name} />
                              </a>
                            </figure>
                            <div className="User">
                              <p className="Name">
                                <a href={`https://twitter.com/${tweet.user.screen_name}`} target="_blank">{tweet.user.name}</a>
                              </p>
                              <p className="ScreenName">
                                <a href={`https://twitter.com/${tweet.user.screen_name}`} target="_blank">@{tweet.user.screen_name}</a>
                              </p>
                            </div>
                            <h3>{tweet.text}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            });
        }
    }
  }

  render() {
    return (
      <section className="Tweets">
        <div className="row">
          {this.renderTweets()}
        </div>
      </section>
    );
  }
}

function mapStateToProps({ tweets }) {
  return { tweets };
}

export default connect(mapStateToProps, { fetchTweets })(Tweets);
