import React, { Component } from 'react';
import '../css/Error.css';

class Error extends Component {
  render() {
    return (
      <main>
        <div id="error-box">
          <h2>
            Error - {this.props.location.state.status} <br />
            {this.props.location.state.msg}
          </h2>
        </div>
      </main>
    );
  }
}

export default Error;
