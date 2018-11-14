import React, { Component } from 'react';
import * as api from '../api';
import './comments.css';
import CommentForm from './CommentForm';
import { Link } from '@reach/router';
import Vote from './Vote';

class Comments extends Component {
  state = {
    comments: [],
    loading: true
  };

  render() {
    return (
      <section>
        <h2>Comments:</h2>
        <CommentForm
          user={this.props.user}
          articleId={this.props.article}
          handleCommentPost={this.handleCommentPost}
        />
        {this.state.loading === false ? (
          this.state.comments.map(comment => (
            <div
              className="comment"
              key={comment._id ? comment._id : 'newComment'}
            >
              <div className="comment-votes">
                <Vote
                  id="comment"
                  votes={comment.votes}
                  _id={comment._id}
                  section={'comments'}
                />
              </div>
              <Link
                className="comment-user"
                to={`/users/${comment.created_by.username}`}
              >
                <img
                  className="avatar"
                  src={comment.created_by.avatar_url}
                  alt="avatar"
                />
                <br /> {comment.created_by.username}
              </Link>

              <p className="comment-body">{comment.body}</p>
              {this.props.user.username === comment.created_by.username && (
                <button
                  onClick={this.handleDelete}
                  value={comment._id}
                  className="comment-delete"
                >
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

  handleCommentPost = newComment => {
    newComment.votes = 0;
    newComment.created_by = this.props.user;
    console.log(newComment);
    console.log(this.state.comments[1]);
    this.setState({ comments: [newComment, ...this.state.comments] });
  };
}

export default Comments;
