import React from 'react';

const App: React.FC = () => {
  return (
    <h1 style={{ textAlign: 'center' }}>
      <span
        aria-label="wave"
        role="img"
        style={{ fontSize: '80px', display: 'block', textAlign: 'center' }}
      >
        ⛰️
      </span>
      <br />
      Those at the top of the mountain did not fall there.{' '}
    </h1>
  );
};

export default App;
