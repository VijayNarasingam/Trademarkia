import React from 'react';
import '../Styles.css';

const TrademarkList = ({ data, displayMode }) => {
  return (
    <div className={displayMode === 'grid' ? 'grid-container' : 'table-container'}>
      {displayMode === 'grid' ? (
        <div className="grid-view">
          {data.map((item, index) => (
            <div key={index} className="grid-item">
              <img src={item.logo_url || 'https://via.placeholder.com/50'} alt="Logo" />
              <p>{item.mark_identification}</p>
              <p className={item.status_type === 'Live / Registered' ? 'live' : 'expired'}>
                {item.status_type}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Mark</th>
              <th>Details</th>
              <th>Status</th>
              <th>Class/Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr key={index}>
                <td><img src={record.logo_url || 'https://via.placeholder.com/50'} alt="Logo" /></td>
                <td>
                  <strong>{record.mark_identification}</strong><br />
                  {record.current_owner}<br />
                  {record.registration_number}<br />
                  {new Date(record.filing_date * 1000).toLocaleDateString()}
                </td>
                <td className={record.status_type === 'Live / Registered' ? 'live' : 'expired'}>
                  {record.status_type}
                </td>
                <td>{record.mark_description_description.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TrademarkList;
