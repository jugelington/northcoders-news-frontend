import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import '../css/ArticlePage.css';
import Comments from './Comments';
import Vote from './Vote';
import Loading from './Loading';
import UserDisplay from './UserDisplay';
import DeleteButton from './DeleteButton';

class ArticlePage extends Component {
  state = {
    article: {},
    loading: true
  };
  render() {
    const { article } = this.state;
    return (
      <main>
        {this.state.loading === false ? (
          <div key={article._id} id="articlebox">
            <h1 className="article-title">{article.title}</h1>
            <p className="article-body">{article.body}</p>
            <p className="article-foot">
              On: {moment(article.created_at).format('MMMM DD YYYY')}
            </p>{' '}
            <Vote
              votes={article.votes}
              _id={article._id}
              section={'articles'}
            />{' '}
            <UserDisplay
              username={article.created_by.username}
              avatarUrl={article.created_by.avatar_url}
            />
            <DeleteButton
              handleDelete={this.handleDelete}
              user={this.props.user}
              item={article}
            />
          </div>
        ) : (
          <Loading />
        )}
        {this.state.loading === false ? (
          <Comments article={article._id} user={this.props.user} />
        ) : (
          <Loading />
        )}
      </main>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.voted !== this.state.voted) this.getArticle();
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    api
      .fetchArticleById(this.props.article_id)
      .then(article => {
        this.setState({ article, loading: false });
      })
      .catch(() =>
        this.props.navigate('/error', {
          state: { status: 404, msg: 'Article Not Found' }
        })
      );
  };

  toggleVoted = () => {
    this.setState({ voted: true });
  };

  handleDelete = event => {
    api
      .deleteItem('articles', event.target.value)
      .then(() => this.props.navigate('/'));
  };
}

export default ArticlePage;
