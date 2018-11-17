import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <main>
        <p>
          Error - {this.props.location.state.status} <br />
          {this.props.location.state.msg}{' '}
        </p>
      </main>
    );
  }
}

export default Error;
