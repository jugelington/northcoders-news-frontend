import React, { Component } from 'react';
import tick from '../images/tick.png';
import cross from '../images/cross.png';

import '../css/Vote.css';
import * as api from '../api';

class Vote extends Component {
  state = {
    voteChange: 0
  };
  render() {
    const { voteChange } = this.state;
    const { votes } = this.props;
    return (
      <section className="votebox">
        <button onClick={() => this.vote('up')} disabled={voteChange === 1}>
          <img src={tick} alt="upvote" />
        </button>
        <h2>{votes + voteChange}</h2>
        <button onClick={() => this.vote('down')} disabled={voteChange === -1}>
          <img src={cross} alt="downvote" value={'down'} onClick={this.vote} />
        </button>
      </section>
    );
  }

  vote = direction => {
    const { section, _id } = this.props;
    const { voteChange } = this.state;
    api.patchArticleVotes(section, _id, direction);
    this.setState({
      voteChange: direction === 'up' ? voteChange + 1 : voteChange - 1
    });
  };
}

export default Vote;
