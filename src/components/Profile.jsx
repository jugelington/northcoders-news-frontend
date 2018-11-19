import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import '../css/Profile.css';
import _ from 'lodash';
import SortItems from './SortItems';
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
    const {
      user,
      articleLoading,
      commentLoading,
      articlesError,
      commentsError,
      hideArticles,
      hideComments,
      articles,
      comments
    } = this.state;

    return (
      <main>
        <h1>Profile</h1>
        <section className="avatar-holder">
          <h2>{user.name}</h2>
          <h2>({user.username})</h2>
          <img src={user.avatar_url} alt="avatar" />
        </section>
        {articlesError ? (
          'No Articles Found'
        ) : articleLoading === false ? (
          <>
            <h3>Articles posted:</h3>
            <p>
              Articles Posted: {articles.length} <br />
              Total Votes:{' '}
              {articles.reduce((acc, curr) => {
                return acc + curr.votes;
              }, 0)}
            </p>
            <button value="articles" onClick={this.show}>
              Show Articles
            </button>
            {hideArticles !== true && (
              <>
                <br />
                <SortItems alterSort={this.alterSort} category="articles" />
                {articles.map(article => (
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
        {commentsError ? (
          'Comments not found'
        ) : commentLoading === false ? (
          <>
            <h3>Comments posted:</h3>
            <p>
              Comments Posted: {comments.length} <br />
              Total Votes:{' '}
              {comments.reduce((acc, curr) => {
                return acc + curr.votes;
              }, 0)}
            </p>
            <button value="comments" onClick={this.show}>
              Show Comments
            </button>
            {hideComments !== true && (
              <>
                <br />
                <SortItems alterSort={this.alterSort} category="comments" />
                {comments.map(comment => (
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
    const { username } = this.props;
    username !== prevProps.username && this.getUserInfo();
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    const { username } = this.props;
    api
      .fetchUser(username)
      .then(foundUser => this.setState({ user: foundUser }))
      .then(() => {
        const { user } = this.state;
        api
          .fetchUserSubmissions(user._id, 'articles')
          .then(articles => {
            this.setState({
              articles: articles,
              articleLoading: false,
              articlesError: false
            });
          })
          .catch(this.setState({ articlesError: true }));
        api
          .fetchUserSubmissions(user._id, 'comments')
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

  handleDelete = ({
    event: {
      target: { value }
    }
  }) => {
    const { articles } = this.state;
    this.setState({
      articles: articles.filter(article => article._id !== value)
    });
    api.deleteItem('articles', value);
  };
}

export default Profile;
