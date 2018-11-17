import React, { Component } from 'react';
import * as api from '../api';
import '../css/CommentForm.css';

class CommentForm extends Component {
  state = {
    body: ''
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="comment-form">
        <label htmlFor="comment">
          Tell the world what you think, {this.props.user.name}!
        </label>
        <br />
        <textarea
          id="comment"
          onChange={this.handleChange}
          value={this.state.body}
        />
        <br />
        <button>Comment!</button>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    let newComment = {
      body: this.state.body,
      created_by: this.props.user._id
    };
    api.postComment(newComment, this.props.articleId);
    this.setState({ body: '' });
    this.props.handleCommentPost(newComment);
  };

  handleChange = event => {
    this.setState({ body: event.target.value });
  };
}

export default CommentForm;
