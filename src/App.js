import React, { useState} from 'react';
import SearchBar from './Components/SearchBar';
import Filters from './Components/Filters';
import FetchDataComponent from './Components/FetchDataComponent';
import './Styles.css';
import ResultCount from './Components/ResultCount';
import FilerIcons from './Components/FilerIcons';
import OwnersFilter from './Components/OwnersFilter';
import DisplayToggle from './Components/DisplayToggle';
const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  return (
    <div className="app-container">
      <SearchBar onSearch={setSearchQuery} />
      <ResultCount/>
      <div className='splitContainer'>
          <div className='appFetch'>
              <FetchDataComponent searchQuery={searchQuery} selectedStatus={selectedStatus} />
          </div>
          <div className='appFilter'>
              <FilerIcons/>
              <Filters onStatusFilter={setSelectedStatus} />
              <OwnersFilter/>
              <DisplayToggle/>
          </div>
      </div>
      

      
    </div>
  );
};

export default App;
