import React, { Component } from 'react';
import './articles.css';
import moment from 'moment';
import * as api from '../api';
import { Link } from '@reach/router';
import Vote from './Vote';
import Loading from './Loading';
import UserDisplay from './UserDisplay';
import SortArticles from './SortArticles';
import _ from 'lodash';

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
        <SortArticles alterSort={this.alterSort} />
        {this.state.loading === false ? (
          this.state.articles.map(article => (
            <div className="article" key={article._id}>
              <h3 className="article-title">
                {article.title.length > 60
                  ? `${article.title.substring(0, 60)}...`
                  : article.title}
              </h3>
              <p className="article-body">
                {article.body.length > 200
                  ? `${article.body.substring(0, 200)} [...]`
                  : `${article.body}`}{' '}
                <Link className="links" to={`/articles/${article._id}`}>
                  <button>Read More</button>
                </Link>
              </p>
              <p className="article-foot">
                {moment(article.created_at).format('MMMM DD YYYY')}{' '}
                {article.comment_count || 0} comments
              </p>
              <div className="article-votes">
                <Vote
                  votes={article.votes}
                  _id={article._id}
                  section={'articles'}
                />
              </div>
              <UserDisplay
                username={article.created_by.username}
                avatarUrl={article.created_by.avatar_url}
              />
            </div>
          ))
        ) : (
          <Loading />
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

  alterSort = sort => {
    this.setState({
      articles: _.sortBy(this.state.articles, [sort]).reverse()
    });
  };
}

export default Articles;
