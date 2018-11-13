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

class App extends Component {
  state = {
    user: null,
    loggedIn: false
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <LoginBar
          login={this.login}
          logout={this.logout}
          loggedIn={this.state.loggedIn}
          user={this.state.user}
        />
        <Auth user={this.state.user}>
          <Router>
            <Articles path="/" />
            <Articles path="/topics/:topic_slug" />
            <ArticlePage path="/articles/:article_id" />
          </Router>
        </Auth>
        <Footer />
      </div>
    );
  }

  login = username => {
    api.login(username).then(user => this.setState({ user, loggedIn: true }));
  };

  logout = () => {
    this.setState({ user: null, loggedIn: false });
  };
}

export default App;
