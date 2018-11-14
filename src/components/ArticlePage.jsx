import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import './articlepage.css';
import Comments from './Comments';
import Vote from './Vote';
import { Link } from '@reach/router';

class ArticlePage extends Component {
  state = {
    article: {},
    loading: true,
    voted: false
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
            </p>
            <Vote
              votes={article.votes}
              article_id={article._id}
              voted={this.state.voted}
              toggleVoted={this.toggleVoted}
            />
            <Link
              to={`/users/${article.created_by.username}`}
              className="article-user links"
            >
              <img
                className="avatar"
                src={article.created_by.avatar_url}
                alt="avatar"
              />
              <br />
              {article.created_by.username}
            </Link>
          </div>
        ) : (
          <p>Article Loading...</p>
        )}
        {this.state.loading === false ? (
          <Comments
            article={article._id}
            user={this.props.user}
            userId={this.props.userId}
          />
        ) : (
          <p>Comments Loading...</p>
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
    api.fetchArticleById(this.props.article_id).then(article => {
      this.setState({ article, loading: false });
    });
  };

  toggleVoted = () => {
    this.setState({ voted: true });
  };
}

export default ArticlePage;
