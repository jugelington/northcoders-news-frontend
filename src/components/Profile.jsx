import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import { Link } from '@reach/router';
import './profile.css';

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
          <section className="avatar-holder">
            <h1>{this.props.username}</h1> <br />
            <img src={this.state.user.avatar_url} alt="avatar" /> <br />
          </section>

          {this.state.articleLoading === false ? (
            <>
              <h2>Articles posted:</h2>
              <p>
                Total Votes:{' '}
                {this.state.articles.reduce((acc, curr) => {
                  return acc + curr.votes;
                }, 0)}
              </p>
              {this.state.articles.map(article => {
                return (
                  <div key={article._id} className="profile-box">
                    <h3>{article.title}</h3>
                    <Link to={`/articles/${article._id}`}>
                      <button>Go To</button>
                    </Link>{' '}
                    <br />
                    Votes: {article.votes} <br />
                    Comments: {article.comment_count || 0}
                  </div>
                );
              })}
            </>
          ) : (
            <Loading />
          )}
          {this.state.commentLoading === false ? (
            <>
              <h2>Comments posted:</h2>
              <p>
                Total Votes:{' '}
                {this.state.comments.reduce((acc, curr) => {
                  return acc + curr.votes;
                }, 0)}
              </p>
              {this.state.comments.map(comment => {
                return (
                  <div key={comment._id} className="profile-box">
                    {comment.body}
                    <br />
                    <h5>Votes: {comment.votes}</h5>
                    <h6>Article: {comment.belongs_to.title}</h6>
                    <Link to={`/articles/${comment.belongs_to._id}`}>
                      <button>Go To</button>
                    </Link>
                  </div>
                );
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
        api
          .fetchUserSubmissions(this.state.user._id, 'articles')
          .then(articles => {
            console.log(articles);
            this.setState({
              articles: articles.articles,
              articleLoading: false
            });
          });
        api
          .fetchUserSubmissions(this.state.user._id, 'comments')
          .then(comments => this.setState({ comments, commentLoading: false }));
      });
  }
}

export default Profile;
