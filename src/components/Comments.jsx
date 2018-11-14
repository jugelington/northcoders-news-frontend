import React, { Component } from 'react';
import * as api from '../api';
import './comments.css';
import CommentForm from './CommentForm';
import Vote from './Vote';
import Loading from './Loading';
import UserDisplay from './UserDisplay';

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
              <UserDisplay
                username={comment.created_by.username}
                avatarUrl={comment.created_by.avatar_url}
              />

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
          <Loading />
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
    api.deleteComment(event.target.value);
    this.setState({
      comments: this.state.comments.filter(
        comment => comment._id !== event.target.value
      )
    });
  };

  handleCommentPost = newComment => {
    const fakeComment = {
      _id: 'newComment',
      votes: 0,
      created_by: this.props.user,
      body: newComment.body
    };

    this.setState({ comments: [fakeComment, ...this.state.comments] });
  };
}

export default Comments;
