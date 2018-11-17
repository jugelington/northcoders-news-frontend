import React, { Component } from 'react';
import '../css/DeleteButton.css';

class DeleteButton extends Component {
  render() {
    return (
      this.props.user._id ===
        (this.props.item.created_by._id
          ? this.props.item.created_by._id
          : this.props.item.created_by) && (
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
