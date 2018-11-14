import React, { Component } from 'react';
import { Link } from '@reach/router';
import './userdisplay.css';

class UserDisplay extends Component {
  render() {
    return (
      <Link to={`/users/${this.props.username}`} className="user links">
        <img className="avatar" src={this.props.avatarUrl} alt="avatar" />
        <br />
        {this.props.username}
      </Link>
    );
  }
}

export default UserDisplay;
