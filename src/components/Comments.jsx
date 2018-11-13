import React, { Component } from 'react';
import * as api from '../api';
import './comments.css';

class Comments extends Component {
  state = {
    comments: [],
    loading: true
  };

  render() {
    return (
      <section>
        <h2>Comments:</h2>
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
}

export default Comments;
