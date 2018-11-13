import React from 'react';
import thumbsdown from '../images/thumbsdown.png';
import thumbsup from '../images/thumbsup.png';
import * as api from '../api';
import './vote.css';

const Vote = ({ votes, article_id, voted, toggleVoted }) => {
  const handleClick = async event => {
    await api.patchArticleVotes(event.target.value, article_id);
    toggleVoted();
  };

  return voted === false ? (
    <div>
      <button className="vote" onClick={handleClick} value="up">
        <img src={thumbsup} alt="upvote" />
      </button>
      <h2>{votes}</h2>
      <button className="vote" onClick={handleClick} value="down">
        <img src={thumbsdown} alt="downvote" />
      </button>
    </div>
  ) : (
    <h2>{votes}</h2>
  );
};

export default Vote;
