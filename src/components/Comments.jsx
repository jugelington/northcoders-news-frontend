import React, { Component } from 'react';
import * as api from '../api';
import '../css/Comments.css';
import CommentForm from './CommentForm';
import Loading from './Loading';
import Sort from './Sort';
import _ from 'lodash';
import CommentSummary from './CommentSummary';

class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    commentsError: false
  };

  render() {
    return (
      <section>
        <CommentForm
          user={this.props.user}
          articleId={this.props.article}
          handleCommentPost={this.handleCommentPost}
        />
        {this.state.commentsError === true ? (
          <>
            <br />
            Be the first to comment!
          </>
        ) : this.state.loading === false ? (
          <>
            <h2>Comments:</h2>
            <Sort alterSort={this.alterSort} />
            {this.state.comments.map(comment => (
              <CommentSummary
                key={comment._id}
                comment={comment}
                user={this.props.user}
                handleDelete={this.handleDelete}
              />
            ))}
          </>
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
    api
      .fetchArticleComments(this.props.article)
      .then(comments => {
        this.setState({ comments, loading: false, commentsError: false });
      })
      .catch(() => this.setState({ commentsError: true }));
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

    this.setState({
      comments: [fakeComment, ...this.state.comments],
      commentsError: false,
      loading: false
    });
  };

  alterSort = (sort, direction) => {
    direction === 'descending'
      ? this.setState({
          comments: _.sortBy(this.state.comments, [sort]).reverse()
        })
      : this.setState({
          comments: _.sortBy(this.state.comments, [sort])
        });
  };
}

export default Comments;
