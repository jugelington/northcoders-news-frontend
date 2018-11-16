import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import ArticlePage from './components/ArticlePage';
import LoginBar from './components/LoginBar';
import * as api from './api';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Write from './components/Write';
import Users from './components/Users';
import Error from './components/Error';

class App extends Component {
  state = {
    user: null
  };

  render() {
    return (
      <div className="App">
        <Header />

        <LoginBar
          login={this.login}
          loggedIn={this.state.loggedIn}
          user={this.state.user ? this.state.user : null}
        />
        <Auth user={this.state.user}>
          <Nav
            user={this.state.user ? this.state.user : null}
            logout={this.logout}
          />
          <Router>
            <Articles path="/" />
            <Articles path="/topics/:topic_slug" />
            <ArticlePage
              path="/articles/:article_id"
              user={this.state.user ? this.state.user : null}
            />
            <Profile path="/users/:username" />
            <Write
              path="/write"
              user={this.state.user ? this.state.user : null}
            />
            <Users path="/users" />
            <Error path="/error" />
          </Router>
        </Auth>
        <Footer />
      </div>
    );
  }

  login = username => {
    api.fetchUser(username).then(user => this.setState({ user }));
  };

  logout = () => {
    this.setState({ user: null });
  };
}

export default App;
