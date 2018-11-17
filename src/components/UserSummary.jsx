import React, { Component } from 'react';
import Loading from './Loading';
import * as api from '../api';
import { Link } from '@reach/router';
import '../css/Users.css';

class UserSummary extends Component {
  state = {};
  render() {
    return !this.state.articles || !this.state.comments ? (
      <Loading />
    ) : (
      <Link className="links" to={`/users/${this.state.username}`}>
        <h3>
          {this.state.name} <br />({this.state.username})
        </h3>
        <img src={this.state.avatar_url} alt="avatar" />
        <h4>Articles</h4>
        Total Written: {this.state.articles.length} <br />
        Total Popularity:{' '}
        {this.state.articles.reduce((acc, curr) => (acc += curr.votes), 0)}
        <h4>Comments</h4>
        Total written: {this.state.comments.length} <br />
        Total Popularity:{' '}
        {this.state.comments.reduce((acc, curr) => (acc += curr.votes), 0)}
      </Link>
    );
  }

  componentDidMount() {
    this.setState(this.props.user);
    this.formatUser();
  }

  formatUser = async () => {
    api
      .fetchUserSubmissions(this.props.user._id, 'articles')
      .then(articles => this.setState({ articles: articles.articles }));
    api
      .fetchUserSubmissions(this.props.user._id, 'comments')
      .then(comments => this.setState({ comments: comments }));
  };

  //   formatUser = users => {
  //     return Promise.all(
  //       users.map(user => {
  //         Promise.all([
  //           api
  //             .fetchUserSubmissions(user._id, 'articles')
  //             .then(articles => (user.articles = articles.articles)),
  //           api
  //             .fetchUserSubmissions(user._id, 'comments')
  //             .then(comments => (user.comments = comments))
  //         ]);
  //         return user;
  //       })
  //     );
  //   };
}

export default UserSummary;

/*
<Link className="users-box links" to={`/users/${user.username}`}>
      Username: {user.username} <br />
      Real name: {user.name} <br />
      Articles written: {user.articles.length} <br />
      Total article popularity:{' '}
      {user.articles
        ? user.articles.reduce((acc, curr) => {
            return (acc += curr.votes);
          }, 0)
        : 'counting...'}
      <br />
      Comments written: {user.comments
        ? user.comments.length
        : 'counting...'}{' '}
      <br />
      Total comment popularity:{' '}
      {user.comments
        ? user.comments.reduce((acc, curr) => {
            return (acc += curr.votes);
          }, 0)
        : 'counting...'}
      <br />
      <h6>Avatar:</h6>
      <img src={user.avatar_url} alt="avatar" />
    </Link>
    */
