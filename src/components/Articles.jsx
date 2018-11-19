import React, { Component } from 'react';
import '../css/Articles.css';
import * as api from '../api';
import Loading from './Loading';
import SortItems from './SortItems';
import _ from 'lodash';
import ArticleSummary from './ArticleSummary';
import PropTypes from 'prop-types';

class Articles extends Component {
  state = {
    articles: [],
    loading: true
  };

  render() {
    const { topic_slug, user } = this.props;
    const { articles, loading } = this.state;
    return (
      <main id="articles-container">
        <h1>
          {topic_slug
            ? `Articles on ${topic_slug} (${articles.length})`
            : `All Articles (${articles.length})`}
        </h1>
        <SortItems alterSort={this.alterSort} />
        {loading === false ? (
          articles.map(article => (
            <ArticleSummary
              key={article._id}
              article={article}
              frontPage={true}
              user={user}
              handleDelete={this.handleDelete}
            />
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
    const { topic_slug } = this.props;

    topic_slug
      ? api
          .fetchArticlesByTopic(topic_slug)
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
    const { articles } = this.state;
    direction === 'descending'
      ? this.setState({
          articles: _.sortBy(articles, [sort]).reverse()
        })
      : this.setState({
          articles: _.sortBy(articles, [sort])
        });
  };

  handleDelete = event => {
    const { articles } = this.state;

    this.setState({
      articles: articles.filter(article => article._id !== event.target.value)
    });
    api.deleteItem('articles', event.target.value);
  };
}

Articles.propTypes = {
  topic_slug: PropTypes.string,
  user: PropTypes.object
};

export default Articles;
