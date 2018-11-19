import React from 'react';

const Error = ({
  location: {
    state: { status, msg }
  }
}) => {
  return (
    <main>
      <div id="error-box">
        <h2>
          Error - {status} <br />
          {msg}
        </h2>
      </div>
    </main>
  );
};

Error.propTypes = {};

export default Error;
