import React from 'react';
import '../Styles.css';

const ResultCount = ({ count, searchQuery }) => {
  return (
    <div className="result-count">
      {searchQuery ? (
        <p>About <strong>{count}</strong> trademarks found for "<strong>{searchQuery}</strong>"</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ResultCount;
