import React, { Component } from 'react';
import * as api from '../api';
import './articlepage.css';

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
          <>
            <h2>{article.title}</h2>
            <p>{article.created_by.name}</p>
            <img src={article.created_by.avatar_url} alt="avatar" />
            <p>{article.body}</p>
          </>
        ) : (
          <p>Article Loading...</p>
        )}
      </main>
    );
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    api.fetchArticleById(this.props.article_id).then(article => {
      this.setState({ article, loading: false });
    });
  };
}

export default ArticlePage;
