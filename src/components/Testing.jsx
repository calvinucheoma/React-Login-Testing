import React from 'react';

const Testing = () => {
  const a = 3;
  const b = 6;

  return (
    <div>
      <h1>Testing</h1>
      <ul>
        <li>Apple</li>
        <li>Cat</li>
        <li>Dog</li>
      </ul>
      <h5 data-testid="myname">Chuks</h5>
      <span title="sum">{a + b}</span>
      <input type="text" placeholder="username" />
    </div>
  );
};

export default Testing;
