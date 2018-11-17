import React, { Component } from 'react';
import { Link } from '@reach/router';
import '../css/UserDisplay.css';
import coding from '../images/coding.png';

class UserDisplay extends Component {
  render() {
    return (
      <Link to={`/users/${this.props.username}`} className="user links">
        <img
          className="avatar"
          src={this.props.avatarUrl !== '' ? this.props.avatarUrl : coding}
          alt="avatar"
        />
        <br />
        {this.props.username}
      </Link>
    );
  }
}

export default UserDisplay;
