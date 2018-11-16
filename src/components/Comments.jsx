import React, { Component } from 'react';
import * as api from '../api';
import '../css/Comments.css';
import CommentForm from './CommentForm';
import Vote from './Vote';
import Loading from './Loading';
import UserDisplay from './UserDisplay';
import DeleteButton from './DeleteButton';

class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    commentsError: false
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
        {this.state.commentsError === false ? (
          <>
            <br />
            Be the first to comment!
          </>
        ) : this.state.loading === false ? (
          this.state.comments.map(comment => (
            <div
              className="comment"
              key={comment._id ? comment._id : 'newComment'}
            >
              {' '}
              <p className="comment-body">{comment.body}</p>
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
              <DeleteButton
                handleDelete={this.handleDelete}
                user={this.props.user}
                item={comment}
              />
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
      this.setState({ comments, loading: false }).catch(() =>
        this.setState({ commentsError: true })
      );
    });
  };

  handleDelete = event => {
    api
      .deleteItem('comments', event.target.value)
      .catch(err => this.props.navigate('/error'));
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
