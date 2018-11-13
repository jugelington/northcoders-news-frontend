import React, { Component } from 'react';
import './loginbar.css';

class LoginBar extends Component {
  state = {
    username: 'jessjelly'
  };

  render() {
    return this.props.loggedIn ? (
      <div className="login-bar">
        Hi, {this.props.user.name}! How are you today?
        <button onClick={this.props.logout}>Logout</button>
      </div>
    ) : (
      <form className="login-bar" id="login-bar" onSubmit={this.handleSubmit}>
        <p>Please login to continue</p>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <button>Log in</button>
      </form>
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
