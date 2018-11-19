import React, { Component } from 'react';
import * as api from '../api';
import '../css/PostArticle.css';
import PropTypes from 'prop-types';

class PostArticle extends Component {
  state = {
    title: '',
    body: '',
    belongs_to: '',
    error: false
  };

  render() {
    const { title, body, error } = this.state;

    return (
      <main>
        <h1>Write Article</h1>
        <form onSubmit={this.handleSubmit} id="post-article-area">
          <h2>What do you want to say?</h2>
          Title:{' '}
          <input
            id="title"
            type="text"
            value={title}
            onChange={this.handleChange}
          />
          <br />
          Topic:
          <select id="belongs_to" onChange={this.handleChange}>
            <option value="">Select a Topic</option>
            <option value="football">Football</option>
            <option value="coding">Coding</option>
            <option value="cooking">Cooking</option>
          </select>
          <br />
          Body: <textarea value={body} onChange={this.handleChange} id="body" />
          <br />
          <button>Submit</button>
          {error && (
            <>
              <br />
              <p>
                Sorry, that didn't work! <br />
                Please enter a Title, Topic and Body for your article, then try
                again!
              </p>
            </>
          )}
        </form>
      </main>
    );
  }

  handleChange = event => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    const { title, body, belongs_to } = this.state;
    const { user } = this.props;
    event.preventDefault();
    const article = {
      title: title,
      body: body,
      belongs_to: belongs_to,
      created_by: user._id
    };

    api
      .postArticle(article, belongs_to)
      .then(
        res =>
          this.props.navigate(`/articles/${res.newArticle._id}`) &&
          this.setState({ error: false })
      )
      .catch(err => this.setState({ error: true }));
  };
}

PostArticle.propTypes = { user: PropTypes.object };

export default PostArticle;
