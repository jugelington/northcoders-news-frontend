import React, { Component } from 'react';
import * as api from '../api';
import '../css/CommentForm.css';

class CommentForm extends Component {
  state = {
    body: '',
    error: false
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
        {this.state.error && (
          <>
            <br />
            <p>
              Sorry, that didn't work! <br />
              You can't submit an empty comment!
            </p>
          </>
        )}
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    let newComment = {
      body: this.state.body,
      created_by: this.props.user._id
    };
    api.postComment(newComment, this.props.articleId).catch(() => {
      this.setState({ error: true });
    });
    this.state.body !== '' && this.props.handleCommentPost(newComment);
    this.setState({ body: '', error: false });
  };

  handleChange = event => {
    this.setState({ body: event.target.value });
  };
}

export default CommentForm;
