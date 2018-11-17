import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import { Link } from '@reach/router';
import '../css/Profile.css';

class Profile extends Component {
  state = {
    user: {},
    articleLoading: true,
    commentLoading: true,
    articlesError: false,
    commentsError: false,
    hideArticles: true,
    hideComments: true,
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
          {this.state.articlesError === false ? (
            'No Articles Found'
          ) : this.state.articleLoading === false ? (
            <>
              <h2>Articles posted:</h2>
              <p>
                Articles Posted: {this.state.articles.length} <br />
                Total Votes:{' '}
                {this.state.articles.reduce((acc, curr) => {
                  return acc + curr.votes;
                }, 0)}
              </p>
              <button value="articles" onClick={this.show}>
                Show Articles
              </button>
              {this.state.hideArticles !== true &&
                this.state.articles.map(article => {
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
          {this.state.commentsError === false ? (
            'Comments not found'
          ) : this.state.commentLoading === false ? (
            <>
              <h2>Comments posted:</h2>
              <p>
                Comments Posted: {this.state.comments.length} <br />
                Total Votes:{' '}
                {this.state.comments.reduce((acc, curr) => {
                  return acc + curr.votes;
                }, 0)}
              </p>
              <button value="comments" onClick={this.show}>
                Show Comments
              </button>
              {this.state.hideComments !== true &&
                this.state.comments.map(comment => {
                  return (
                    <div key={comment._id} className="profile-box">
                      {comment.body}
                      <br />
                      <h5>Votes: {comment.votes}</h5>
                      <h6>
                        Article:{' '}
                        {comment.belongs_to
                          ? comment.belongs_to.title
                          : 'DELETED'}
                      </h6>
                      {comment.belongs_to && (
                        <Link to={`/articles/${comment.belongs_to._id}`}>
                          <button>Go To</button>
                        </Link>
                      )}
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
            this.setState({
              articles: articles.articles,
              articleLoading: false
            });
          })
          .catch(this.setState({ articlesError: true }));
        api
          .fetchUserSubmissions(this.state.user._id, 'comments')
          .then(comments => this.setState({ comments, commentLoading: false }))
          .catch(this.setState({ commentsError: true }));
      })
      .catch(() =>
        this.props.navigate('/error', {
          state: { status: 404, msg: 'User Not Found' }
        })
      );
  }

  show = event => {
    const { value } = event.target;
    value === 'comments'
      ? this.setState({ hideComments: !this.state.hideComments })
      : this.setState({ hideArticles: !this.state.hideArticles });
  };
}

export default Profile;
