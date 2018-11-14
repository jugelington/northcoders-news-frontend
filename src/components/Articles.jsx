import React, { Component } from 'react';
import './articles.css';
import moment from 'moment';
import * as api from '../api';
import { Link } from '@reach/router';

class Articles extends Component {
  state = {
    articles: [],
    loading: true
  };

  render() {
    return (
      <main id="articles-container">
        <h1>
          {this.props.topic_slug
            ? `Articles on ${this.props.topic_slug}`
            : 'All Articles'}
        </h1>
        {this.state.loading === false ? (
          this.state.articles.map(article => (
            <div className="article" key={article._id}>
              <h3 className="article-title">{article.title}</h3>
              <p className="article-body">
                {`${article.body.substring(0, 100)}[...]`}{' '}
                <Link className="links" to={`/articles/${article._id}`}>
                  <h3>Read More</h3>
                </Link>
              </p>
              <p className="article-foot">
                On: {moment(article.created_at).format('MMMM DD YYYY')}{' '}
                Comments: {article.comment_count || 0}
              </p>
              <div className="article-votes">
                <h2>{article.votes}</h2>
              </div>
              <Link
                className="article-user links"
                to={`/users/${article.created_by.username}`}
              >
                <img
                  className="avatar"
                  src={article.created_by.avatar_url}
                  alt="avatar"
                />
                <br />
                By {article.created_by.username}
              </Link>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </main>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.topic_slug !== prevProps.topic_slug) {
      this.getArticles();
    }
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
