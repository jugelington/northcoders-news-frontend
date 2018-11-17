import React, { Component } from 'react';
import { Link } from '@reach/router';
import '../css/LoginBar.css';

class LoginBar extends Component {
  state = {
    username: 'jessjelly'
  };
  render() {
    return this.props.user !== null ? (
      <div className="user-bar">
        <Link to={`/users/${this.props.user.username}`}>
          <img
            src={this.props.user.avatar_url}
            alt="my profile"
            className="login-avatar"
          />
          <br />
          <p>{this.props.user.name}</p>
        </Link>
      </div>
    ) : (
      <>
        <form className="login-bar" onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            Hi there!
            <br /> Who are you?
          </label>
          <br />
          <input
            id="username"
            type="text"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <br />
          <button>Log in</button>
        </form>
        <main />
      </>
    );
  }

  handleChange = event => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.username);
  };
}

export default LoginBar;
