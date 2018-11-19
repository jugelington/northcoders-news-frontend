import React, { Component } from 'react';
import * as api from '../api';
import '../css/CommentForm.css';
import PropTypes from 'prop-types';

class CommentForm extends Component {
  state = {
    body: '',
    error: false
  };

  render() {
    const { user } = this.props;
    const { body, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} id="comment-form">
        <label htmlFor="comment">
          Tell the world what you think, {user.name}!
        </label>
        <br />
        <textarea id="comment" onChange={this.handleChange} value={body} />
        <br />
        <button>Comment!</button>
        {error && (
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
    const { body } = this.state;
    const { user, articleId, handleCommentPost } = this.props;

    event.preventDefault();
    let newComment = {
      body: body,
      created_by: user._id
    };
    api.postComment(newComment, articleId).catch(() => {
      this.setState({ error: true });
    });
    body !== '' && handleCommentPost(newComment);
    this.setState({ body: '', error: false });
  };

  handleChange = event => {
    this.setState({ body: event.target.value });
  };
}

CommentForm.propTypes = {
  user: PropTypes.object,
  articleId: PropTypes.string,
  handleCommentPost: PropTypes.func
};
export default CommentForm;
