import React, { Component } from 'react';
import * as api from '../api';
import '../css/ArticlePage.css';
import Comments from './Comments';
import Loading from './Loading';
import ArticleSummary from './ArticleSummary';
import PropTypes from 'prop-types';

class ArticlePage extends Component {
  state = {
    article: {},
    loading: true
  };
  render() {
    const { article, loading } = this.state;
    const { user } = this.props;
    return (
      <main>
        {loading === false ? (
          <ArticleSummary
            key={article._id}
            article={article}
            user={this.props.user}
            handleDelete={this.handleDelete}
            articlePage={true}
          />
        ) : (
          <Loading />
        )}
        {loading === false ? (
          <Comments article={article._id} user={user} />
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
    const { article_id } = this.props;
    api
      .fetchArticleById(article_id)
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

ArticlePage.propTypes = {
  user: PropTypes.object,
  article_id: PropTypes.string
};

export default ArticlePage;
