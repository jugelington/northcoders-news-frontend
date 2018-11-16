import React, { Component } from 'react';

/* In order for this to work, props must be:
    user's username
    username of person that created article / comment
    article / comment id
    whether it is an article or comment
*/
class DeleteButton extends Component {
  render() {
    return (
      this.props.user.username === this.props.item.created_by.username && (
        <button
          onClick={this.props.handleDelete}
          value={this.props.item._id}
          className="delete-button"
        >
          Delete
        </button>
      )
    );
  }
}

export default DeleteButton;

// {this.props.user.username === article.created_by.username && (
//     <button
//       onClick={this.handleDelete}
//       value={article._id}
//       className="article-delete"
//     >
//       Delete
//     </button>
//   )}

// {this.props.user.username === comment.created_by.username && (
//     <button
//       onClick={this.handleDelete}
//       value={comment._id}
//       className="comment-delete"
//     >
//       Delete
//     </button>
//   )}
