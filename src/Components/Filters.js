import React, { useState } from 'react';
import '../Styles.css';

const Filters = ({ onStatusFilter }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onStatusFilter(status);
  };

  return (
    <div className="filters">
      <h3>Status</h3>
      <div className="status-filters">
        {['All', ' 🟢 Registered', '🟡 Pending', '🔴 Abandoned', ' 🔵 Others'].map((status) => (
          <button
            key={status}
            className={selectedStatus === status ? 'active' : ''}
            onClick={() => handleStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
