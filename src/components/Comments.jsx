import React, { Component } from 'react';
import * as api from '../api';
import '../css/Comments.css';
import CommentForm from './CommentForm';
import Loading from './Loading';
import SortItems from './SortItems';
import _ from 'lodash';
import CommentSummary from './CommentSummary';

class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    commentsError: false
  };

  render() {
    const { user, article } = this.props;
    const { commentsError, loading, comments } = this.state;
    return (
      <section>
        <CommentForm
          user={user}
          articleId={article}
          handleCommentPost={this.handleCommentPost}
        />
        {commentsError || comments.length < 1 ? (
          <>
            <br />
            Be the first to comment!
          </>
        ) : loading === false ? (
          <>
            <h2>Comments:</h2>
            <SortItems alterSort={this.alterSort} />
            {comments.map(comment => (
              <CommentSummary
                key={comment._id}
                comment={comment}
                user={user}
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
    const { article } = this.props;
    api
      .fetchArticleComments(article)
      .then(comments => {
        this.setState({ comments, loading: false, commentsError: false });
      })
      .catch(() => this.setState({ commentsError: true }));
  };

  handleDelete = event => {
    const { comments } = this.state;
    api
      .deleteItem('comments', event.target.value)
      .catch(err => this.props.navigate('/error'));
    this.setState({
      comments: comments.filter(comment => comment._id !== event.target.value)
    });
  };

  handleCommentPost = newComment => {
    const { user } = this.props;
    const fakeComment = {
      _id: 'newComment',
      votes: 0,
      created_by: user,
      body: newComment.body
    };

    this.setState({
      comments: [fakeComment, ...this.state.comments],
      commentsError: false,
      loading: false
    });
  };

  alterSort = (sort, direction) => {
    const { comments } = this.state;
    direction === 'descending'
      ? this.setState({
          comments: _.sortBy(comments, [sort]).reverse()
        })
      : this.setState({
          comments: _.sortBy(comments, [sort])
        });
  };
}

export default Comments;
