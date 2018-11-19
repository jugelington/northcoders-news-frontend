import React, { Component } from 'react';
import Loading from './Loading';
import * as api from '../api';
import { Link } from '@reach/router';
import '../css/Users.css';

class UserSummary extends Component {
  state = { articles: [], comments: [] };
  render() {
    const { articles, comments, name, username, avatar_url } = this.state;
    return !articles || !comments ? (
      <Loading />
    ) : (
      <section className="users-box">
        <h3>
          {name} <br />({username})
        </h3>
        <img src={avatar_url} alt="avatar" />
        <br />
        <Link className="links" to={`/users/${username}`}>
          <button>Profile</button>
        </Link>
        <h4>Articles</h4>
        Total Written: {articles.length} <br />
        Total Popularity:{' '}
        {articles.reduce((acc, curr) => (acc += curr.votes), 0)}
        <h4>Comments</h4>
        Total written: {comments.length} <br />
        Total Popularity:{' '}
        {comments.reduce((acc, curr) => (acc += curr.votes), 0)}
      </section>
    );
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState(user);
    this.formatUser();
  }

  formatUser = async () => {
    const { user } = this.props;
    api
      .fetchUserSubmissions(user._id, 'articles')
      .then(articles => this.setState({ articles }));
    api
      .fetchUserSubmissions(user._id, 'comments')
      .then(comments => this.setState({ comments }));
  };
}

export default UserSummary;
