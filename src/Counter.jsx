import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(20);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter-container">
      <div className="counter-card">
        <h1 className="counter-title">Counter</h1>
        <div className="counter-display">{count}</div>
        <div className="counter-controls">
          <button className="btn decrease" onClick={decrement}>-</button>
          <button className="btn reset" onClick={reset}>Reset</button>
          <button className="btn increase" onClick={increment}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
