import React, { Component } from 'react';
import '../css/LoginBar.css';
import { Link } from '@reach/router';

class LoginBar extends Component {
  state = {
    username: 'jessjelly'
  };

  render() {
    return this.props.user !== null ? (
      <div className="login-bar">
        Hi, {this.props.user.name}! How are you today?
      </div>
    ) : (
      <>
        <form className="login-bar" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            onChange={this.handleChange}
            value={this.state.username}
          />
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
