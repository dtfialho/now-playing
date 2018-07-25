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

    if (match && match[7].length === 11) {
      return `//www.youtube.com/embed/${match[7]}?enablejsapi=1`;
    } else {
      return '';
    }
  }

  _setVideosEventListener() {
    window.setTimeout(() => {
      const iframes = document.querySelectorAll('.VideoWrapper iframe');
      const pauseAllVideos = () => {
        iframes.forEach(iframe => {
          iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
        });
      };

      window.addEventListener('blur', () => {
        window.setTimeout(() => {
          if (document.activeElement instanceof HTMLIFrameElement && (window.lastClickedVideoElement !== document.activeElement || window.lastClickedVideoElement === undefined)) {
            window.lastClickedVideoElement = document.activeElement;
            pauseAllVideos();
          }
        }, 0);
      });

      iframes.forEach(iframe => {
        iframe.addEventListener('mouseout', () => {
          window.focus();
        });
      })
    }, 2000);
  }

  renderTweets() {
    switch (this.props.tweets) {
      case null:
        return;
      default:
        if (!this.props.tweets.statuses || (this.props.tweets.statuses && this.props.tweets.statuses.length === 0)) {
          return (
            <div className="col-xs-12 NoTweets">
              <div className="Text">
                <h1>Unfortunately no tweets were found nearby.</h1>
              </div>
            </div>
          );
        }

        if (this.props.tweets.statuses) {
          this._setVideosEventListener();
          return this.props.tweets.statuses
            .filter(tweet => tweet.entities.urls.length > 0)
            .map(tweet => {
              const url = this.convertVideoUrl(tweet.entities.urls[0].expanded_url);
              return (
                <div className="col-xs-12 col-md-offset-2 col-md-8" key={tweet.id_str}>
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
