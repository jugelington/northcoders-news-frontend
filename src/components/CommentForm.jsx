import React, { Component } from 'react';
import * as api from '../api';
import './comments.css';

class CommentForm extends Component {
  state = {
    body: '',
    created_by: this.props.userId
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="comment">
          Tell the world what you think, {this.props.user}!
        </label>
        <br />
        <textarea id="comment" onChange={this.handleChange} />
        <br />
        <button>Comment!</button>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    api
      .postComment(this.state, this.props.articleId)
      .then(() => this.props.handleCommentPost());
  };

  handleChange = event => {
    this.setState({ body: event.target.value });
  };
}

export default CommentForm;
