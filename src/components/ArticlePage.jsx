import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import '../css/ArticlePage.css';
import Comments from './Comments';
import Vote from './Vote';
import Loading from './Loading';
import ArticleSummary from './ArticleSummary';

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
          <ArticleSummary article={article} />
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
