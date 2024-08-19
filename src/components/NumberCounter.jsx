import React, { useState, useEffect } from 'react';

function NumberCounter({ initialValue }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count < initialValue) {
        setCount(count + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 10); // Adjust the interval time as needed

    return () => clearInterval(intervalId);
  }, [initialValue]);

  return <div>{count}</div>;
}

export default NumberCounter;
