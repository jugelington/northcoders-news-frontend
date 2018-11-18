import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import '../css/Profile.css';
import _ from 'lodash';
import Sort from './Sort';
import ArticleSummary from './ArticleSummary';
import CommentSummary from './CommentSummary';

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
      <main>
        <h1>Profile</h1>
        <section className="avatar-holder">
          <h2>{this.state.user.name}</h2>
          <h2>({this.state.user.username})</h2>
          <img src={this.state.user.avatar_url} alt="avatar" />
        </section>
        {this.state.articlesError ? (
          'No Articles Found'
        ) : this.state.articleLoading === false ? (
          <>
            <h3>Articles posted:</h3>
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
            {this.state.hideArticles !== true && (
              <>
                <br />
                <Sort alterSort={this.alterSort} category="articles" />
                {this.state.articles.map(article => (
                  <ArticleSummary
                    key={article._id}
                    article={article}
                    frontPage={true}
                    profilePage={true}
                    user={this.props.user}
                    handleDelete={this.handleDelete}
                  />
                ))}{' '}
              </>
            )}
          </>
        ) : (
          <Loading />
        )}
        {this.state.commentsError ? (
          'Comments not found'
        ) : this.state.commentLoading === false ? (
          <>
            <h3>Comments posted:</h3>
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
            {this.state.hideComments !== true && (
              <>
                <br />
                <Sort alterSort={this.alterSort} category="comments" />
                {this.state.comments.map(comment => (
                  <CommentSummary
                    key={comment._id}
                    comment={comment}
                    user={this.props.user}
                    handleDelete={this.handleDelete}
                    profilePage={true}
                  />
                ))}{' '}
              </>
            )}
          </>
        ) : (
          <Loading />
        )}
      </main>
    );
  }

  componentDidUpdate(prevProps) {
    this.props.username !== prevProps.username && this.getUserInfo();
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    api
      .fetchUser(this.props.username)
      .then(user => this.setState({ user }))
      .then(() => {
        api
          .fetchUserSubmissions(this.state.user._id, 'articles')
          .then(articles => {
            this.setState({
              articles: articles,
              articleLoading: false,
              articlesError: false
            });
          })
          .catch(this.setState({ articlesError: true }));
        api
          .fetchUserSubmissions(this.state.user._id, 'comments')
          .then(comments =>
            this.setState({
              comments,
              commentLoading: false,
              commentsError: false
            })
          )
          .catch(this.setState({ commentsError: true }));
      })
      .catch(() =>
        this.props.navigate('/error', {
          state: { status: 404, msg: 'User Not Found' }
        })
      );
  };

  show = event => {
    const { value } = event.target;
    value === 'comments'
      ? this.setState({ hideComments: !this.state.hideComments })
      : this.setState({ hideArticles: !this.state.hideArticles });
  };

  alterSort = (sort, direction, category) => {
    direction === 'descending'
      ? this.setState({
          [category]: _.sortBy(this.state[category], [sort]).reverse()
        })
      : this.setState({
          [category]: _.sortBy(this.state[category], [sort])
        });
  };

  handleDelete = event => {
    this.setState({
      articles: this.state.articles.filter(
        article => article._id !== event.target.value
      )
    });
    api.deleteItem('articles', event.target.value);
  };
}

export default Profile;
