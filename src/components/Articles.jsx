import React, { Component } from 'react';
import './articles.css';
import moment from 'moment';
import * as api from '../api';

class Articles extends Component {
  state = {
    articles: [],
    loading: true
  };

  render() {
    return (
      <main>
        <h1>
          {this.props.topic_slug
            ? `Articles on ${this.props.topic_slug}`
            : 'All Articles'}
        </h1>
        {this.state.loading === false ? (
          this.state.articles.map(article => (
            <div key={article._id} className="article">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-body">{article.body}</p>
              <p className="article-foot">
                On: {moment(article.created_at).format('MMMM DD YYYY')}{' '}
                Comments: {article.comment_count}
              </p>
              <div className="article-votes">
                Up
                <h2>{article.votes}</h2>
                Down
              </div>
              <div className="article-user">
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
          <p>Loading...</p>
        )}
      </main>
    );
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    this.props.topic_slug
      ? api.fetchArticlesByTopic(this.props.topic_slug).then(articles => {
          this.setState({ articles, loading: false });
        })
      : api.fetchAllArticles().then(articles => {
          this.setState({ articles, loading: false });
        });
  };
}

export default Articles;
