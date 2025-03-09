import React, { useState, useEffect } from 'react';
import '../Styles.css';
import ResultCount from './ResultCount';
import Reuse from '../assets/reuse.png'

const FetchDataComponent = ({ searchQuery, selectedStatus }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedStatus, data]); // Apply filters when search query, status, or data changes

  const fetchData = async () => {
    const apiUrl = 'https://vit-tm-task.api.trademarkia.app/api/v3/us';
    const requestPayload = {
      "input_query": "check",
      "input_query_type": "",
      "sort_by": "default",
      "status": [],
      "exact_match": false,
      "date_query": false,
      "owners": [],
      "attorneys": [],
      "law_firms": [],
      "mark_description_description": [],
      "classes": [],
      "page": 1,
      "rows": 10,
      "sort_order": "desc",
      "states": [],
      "counties": []
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        const records = data.body?.hits?.hits.map(hit => hit._source) || [];
        setData(records);
        setFilteredData(records); // Initially set filteredData to all records
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const getStatus = (renewalDate) => {
    const currentDate = new Date();
    const renewalDateObj = new Date(renewalDate * 1000); // Convert timestamp to Date object

    // If renewal date is in the future or today, status is "Live / Registered"
    if (renewalDateObj >= currentDate) {
      return '• Live / Registered';
    }

    // If renewal date is in the past, status is "Expired"
    if (renewalDateObj < currentDate) {
      return '• Expired';
    }

    // Default status if renewal date is not available or pending
    return '• Pending';
  };

  const applyFilters = () => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter(record =>
        record.mark_identification.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(record => getStatus(record.renewal_date) === selectedStatus);
    }

    setFilteredData(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    <ResultCount count={filteredData.length} searchQuery={searchQuery} />
        <div className="table-container">
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
          {filteredData.length > 0 ? (
            filteredData.map((record, index) => {
              const status = getStatus(record.renewal_date); // Get the status based on renewal date
              return (
                <tr key={index}>
                  <td><img className='image' src={record.check_logo || 'https://via.placeholder.com/50'} alt="Logo" /></td>
                  <td className='detail'>
                    <strong>{record.mark_identification}</strong><br />
                    {record.current_owner}<br />
                    <br></br>
                    {record.registration_number}<br />
                    {new Date(record.filing_date * 1000).toLocaleDateString()}
                  </td>
                  <td className='status'>
                    <div id='status-live' className={status === '• Live / Registered' ? 'live' : (status === '• Expired' ? 'expired' : '• pending')}>
                    {status}
                    <br></br>
                    </div>
                    <div className='status-date'><span>on</span> {new Date(record.filing_date * 1000).toLocaleDateString()}</div>
                    <div className='status-reuse'><img className='reuse' src={Reuse}></img> {new Date(record.renewal_date * 1000).toLocaleDateString()}</div>
                    
                  </td>
                  <td>
                    <div className="description">
                    {record.mark_description_description.join(', ')}
                    </div>
                    <br />
                    {record.class_codes.map((cls, i) => (
                    <span key={i}> <st>Class </st> {cls}</span>
                  ))}
                </td>            
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default FetchDataComponent;
