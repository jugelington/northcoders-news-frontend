import React, { Component } from 'react';

class Write extends Component {
  render() {
    return (
      <main>
        <h1>What do you want to say?</h1>
        <form>
          Title: <input type="text" />
          <br />
          Topic:
          <select>
            <option>Football</option>
            <option>Coding</option>
            <option>Cooking</option>
          </select>
          <br />
          Body: <textarea />
          <br />
          <button>Submit</button>
        </form>
      </main>
    );
  }
}

export default Write;
