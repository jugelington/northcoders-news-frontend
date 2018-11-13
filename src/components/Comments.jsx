import React, { Component } from 'react';
import * as api from '../api';
import './comments.css';
import CommentForm from './CommentForm';

class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    renderTrigger: false
  };

  render() {
    return (
      <section>
        <h2>Comments:</h2>
        <CommentForm
          user={this.props.user}
          userId={this.props.userId}
          articleId={this.props.article}
          handleCommentPost={this.handleCommentPost}
        />
        {this.state.loading === false ? (
          this.state.comments.map(comment => (
            <div className="comment" key={comment._id}>
              <h3>
                {comment.created_by.name} ({comment.created_by.username}){' '}
                <img
                  className="avatar"
                  src={comment.created_by.avatar_url}
                  alt="avatar"
                />
              </h3>
              <p>{comment.body}</p>
              {this.props.user === comment.created_by.username && (
                <button onClick={this.handleDelete} value={comment._id}>
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.renderTrigger !== this.state.renderTrigger) {
      this.getComments();
    }
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    api.fetchArticleComments(this.props.article).then(comments => {
      this.setState({ comments, loading: false });
    });
  };

  handleDelete = event => {
    api
      .deleteComment(event.target.value)
      .then(() => this.setState({ renderTrigger: !this.state.renderTrigger }));
  };

  handleCommentPost = () => {
    this.setState({ renderTrigger: !this.state.renderTrigger });
  };
}

export default Comments;
