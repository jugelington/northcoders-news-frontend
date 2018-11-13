import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Footer from './components/Footer';
import { Link, Router } from '@reach/router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Router>
          <Articles path="/" />
          <Articles path="/topics/:topic_slug" />
        </Router>

        <Footer />
      </div>
    );
  }
}

export default App;
