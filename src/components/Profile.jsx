import React, { Component } from 'react';
import * as api from '../api';

class Profile extends Component {
  state = {
    user: {}
  };

  render() {
    return (
      <main>
        <h1>User Profile</h1>
        <img src={this.state.user.avatar_url} alt="avatar" /> <br />
        Username: {this.state.user.username} <br />
        Name: {this.state.user.name} <br />
      </main>
    );
  }

  componentDidMount() {
    api.fetchUser(this.props.username).then(user => this.setState({ user }));
  }
}

export default Profile;
