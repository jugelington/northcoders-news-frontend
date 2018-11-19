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
import PostArticle from './components/PostArticle';
import Users from './components/Users';
import Error from './components/Error';

class App extends Component {
  state = {
    user: null,
    loginError: false
  };

  render() {
    const { loggedIn, user, loginError } = this.state;
    return (
      <div className="App">
        <LoginBar
          login={this.login}
          loggedIn={loggedIn}
          user={user ? user : null}
          loginError={loginError}
        />
        <Header />

        <Auth user={user}>
          <Nav user={user} logout={this.logout} />
          <Router>
            <Articles path="/" user={user} />
            <Articles path="/topics/:topic_slug" user={user} />
            <ArticlePage path="/articles/:article_id" user={user} />
            <Profile path="/users/:username" user={user} />
            <PostArticle path="/postarticle" user={user} />
            <Users path="/users" />
            <Error path="/error" />
          </Router>
        </Auth>
        <Footer />
      </div>
    );
  }
  componentDidMount() {
    const loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo) {
      this.setState(JSON.parse(loginInfo));
    }
  }
  componentDidUpdate() {
    this.saveState();
  }

  saveState = () => {
    localStorage.setItem('loginInfo', JSON.stringify(this.state));
  };

  login = username => {
    api
      .fetchUser(username)
      .then(user => this.setState({ user, loginError: false }))
      .catch(() => {
        this.setState({ loginError: true });
      });
  };

  logout = () => {
    this.setState({ user: null });
  };
}

export default App;
