import React, { Component } from 'react';
import '../css/Articles.css';
import * as api from '../api';
import Loading from './Loading';
import Sort from './Sort';
import _ from 'lodash';
import ArticleSummary from './ArticleSummary';

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
            ? `Articles on ${this.props.topic_slug} (${
                this.state.articles.length
              })`
            : `All Articles (${this.state.articles.length})`}
        </h1>
        <Sort alterSort={this.alterSort} />
        {this.state.loading === false ? (
          this.state.articles.map(article => (
            <ArticleSummary article={article} frontPage={true} />
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
      ? api
          .fetchArticlesByTopic(this.props.topic_slug)
          .then(articles => {
            this.setState({ articles, loading: false });
          })
          .catch(() =>
            this.props.navigate('/error', {
              state: {
                status: 404,
                msg: `We can't find any articles on this topic, sorry!`
              }
            })
          )
      : api
          .fetchAllArticles()
          .then(articles => {
            this.setState({ articles, loading: false });
          })
          .catch(() =>
            this.props.navigate('/error', {
              state: {
                status: 404,
                msg: `We can't find any articles on this topic, sorry!`
              }
            })
          );
  };

  alterSort = (sort, direction) => {
    direction === 'descending'
      ? this.setState({
          articles: _.sortBy(this.state.articles, [sort]).reverse()
        })
      : this.setState({
          articles: _.sortBy(this.state.articles, [sort])
        });
  };
}

export default Articles;
