import React, { Component } from 'react';

import './Tweet.css';
import badgeCheck from '../../../assets/badge_check.svg';
import twitterLogo from '../../../assets/twitter_logo.svg';

class Tweet extends Component {
  componentDidMount() {
    console.log(this.props.tweet);
  }

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

  renderTweetPostedAt(date) {
    const now = new Date().getTime();
    const postDate = new Date(date).getTime();
    const diff = (now - postDate) / 1000;
    const days = Math.floor(diff/24/60/60);
    const hours = Math.floor(diff/60/60);
    const minutes = Math.floor(diff/60);
    let text = '';

    if (days > 7) {
      let dateHour = new Date(date).getHours();
      let amPm = '';
      let dateMinutes = new Date(date).getMinutes();
      if (dateHour > 12 || dateHour === 0) {
        dateHour = `${dateHour % 12}`;
        amPm = 'pm';
      } else {
        amPm = 'am';
      }

      if (dateMinutes < 10) {
        dateMinutes = `0${dateMinutes}`;
      }

      text = `${dateHour}:${dateMinutes} ${amPm} –`;
    } else if (days > 1) {
      text = `${days} days ago`;
    } else if (days === 1) {
      text = 'A day ago';
    } else if (hours > 1) {
      text = `${hours} hours ago`;
    } else if (hours === 1) {
      text = 'An hour ago';
    } else if (minutes > 1) {
      text = `${minutes > 10 ? minutes : '0' + minutes} minutes ago`;
    } else {
      text = 'A minute ago';
    }

    return text;
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
          <h3 className="TweetText">{this.props.tweet.text}</h3>
          <span className="TweetPostedAt">
            {this.renderTweetPostedAt(this.props.tweet.created_at)}
          </span>
        </div>
      </div>
    );
  }
}

export default Tweet;
