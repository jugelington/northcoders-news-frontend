import React, { Component } from 'react';
import './articles.css';
import * as api from '../api';

class Articles extends Component {
  state = {
    articles: [],
    loading: true
  };

  render() {
    return (
      <main>
        <h1>Articles</h1>
        {this.state.loading === false ? (
          this.state.articles.map(article => (
            <div id="article">
              <h3 id="title">{article.title}</h3>
              <p id="body">{article.body}</p>
              <p id="foot">
                On: {article.created_at} || Comments: {article.comment_count}
              </p>
              <div id="votes">
                Up
                <h2>{article.votes}</h2>
                Down
              </div>
              <div id="user">
                <img
                  className="avatar"
                  src={article.created_by.avatar_url}
                  alt="avatar"
                />
                <br />
                {article.created_by.username}
              </div>
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}
      </main>
    );
  }

  componentDidMount() {
    this.getAllArticles();
  }

  getAllArticles = () => {
    api.fetchAllArticles().then(articles => {
      this.setState({ articles, loading: false });
    });
  };
}

export default Articles;
