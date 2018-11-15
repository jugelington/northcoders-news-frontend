import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';

class Profile extends Component {
  state = {
    user: {},
    articleLoading: true,
    commentLoading: true,
    articles: [],
    comments: []
  };

  render() {
    return (
      <>
        <main>
          <h1>User Profile</h1>
          <img src={this.state.user.avatar_url} alt="avatar" /> <br />
          Username: {this.state.user.username} <br />
          Name: {this.state.user.name} <br />
          {this.state.articleLoading === false ? (
            <>
              <h2>Your Articles:</h2>
              {this.state.articles.map(article => {
                return <p>{article.title}</p>;
              })}
            </>
          ) : (
            <Loading />
          )}
          {this.state.commentLoading === false ? (
            <>
              <h2>Your Comments:</h2>
              {this.state.comments.map(comment => {
                return <p>{comment.body}</p>;
              })}
            </>
          ) : (
            <Loading />
          )}
        </main>
      </>
    );
  }

  componentDidMount() {
    api
      .fetchUser(this.props.username)
      .then(user => this.setState({ user }))
      .then(() => {
        // console.log(this.state.user._id);
        api
          .fetchUserSubmissions(this.state.user._id, 'articles')
          .then(articles => this.setState({ articles, articleLoading: false }));
        api
          .fetchUserSubmissions(this.state.user._id, 'comments')
          .then(comments => this.setState({ comments, commentLoading: false }));
      });
  }
}

export default Profile;
