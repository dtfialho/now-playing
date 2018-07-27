import React, { Component } from 'react';

import './Tweet.css';
import badgeCheck from '../../../assets/badge_check.svg';
import twitterLogo from '../../../assets/twitter_logo.svg';


class Tweet extends Component {
  renderFollowBtn(id) {
    if (id && this.props.friends) {
      if (this.props.friends.ids.includes(id)) {
        return (
          <button className="follow btn btn-primary">
            <img src={twitterLogo} alt="Twitter logo" />
            Unfollow
          </button>
        );
      } else {
        return (
          <button className="follow btn btn-primary">
            <img src={twitterLogo} alt="Twitter logo" />
            Follow
          </button>
        );
      }
    }

    return null;
  }

  render() {
    return (
      <div className="TweetDetails">
        <div className="UserBlock">
          <figure>
            <a href={`https://twitter.com/${this.props.tweet.user.screen_name}`} target="_blank">
              <img src={this.props.tweet.user.profile_image_url_https} alt={this.props.tweet.user.name} />
            </a>
          </figure>
          <div className="User">
            <div className="NameWrapper">
              <p className="Name">
                <a href={`https://twitter.com/${this.props.tweet.user.screen_name}`} target="_blank">{this.props.tweet.user.name}</a>
                <img src={badgeCheck} alt="badge" />
                {this.renderFollowBtn(this.props.tweet.user.id)}
              </p>
              <p className="ScreenName">
                <a href={`https://twitter.com/${this.props.tweet.user.screen_name}`} target="_blank">@{this.props.tweet.user.screen_name}</a>
              </p>
            </div>
          </div>
          <h3>{this.props.tweet.text}</h3>
        </div>
      </div>
    );
  }
}

export default Tweet;
