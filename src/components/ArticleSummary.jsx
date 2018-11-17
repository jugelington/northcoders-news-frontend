import React from 'react';
import { Link } from '@reach/router';
import Vote from './Vote';
import moment from 'moment';
import UserDisplay from './UserDisplay';

const ArticleSummary = ({ article, frontPage }) => {
  return (
    <div className="article" key={article._id}>
      <h3 className="article-title">{article.title}</h3>
      <p className="article-body">
        {article.body} <br />
        {frontPage && (
          <Link className="links" to={`/articles/${article._id}`}>
            <button>Read More</button>
          </Link>
        )}
      </p>
      <p className="article-foot">
        {moment(article.created_at).format('MMMM DD YYYY')}
        <br />
        {!frontPage
          ? null
          : article.comment_count
          ? `${article.comment_count} comments`
          : `0 Comments`}
      </p>
      <div className="article-votes">
        <Vote votes={article.votes} _id={article._id} section={'articles'} />
      </div>
      <UserDisplay
        username={article.created_by.username}
        avatarUrl={article.created_by.avatar_url}
      />
    </div>
  );
};

ArticleSummary.propTypes = {};

export default ArticleSummary;
