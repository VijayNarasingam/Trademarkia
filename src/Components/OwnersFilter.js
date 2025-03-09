import React, { useState } from "react";
import "../Styles.css";

const OwnersFilter = () => {
  const [activeButton, setActiveButton] = useState('Owner');
  const [selectedOwner, setSelectedOwner] = useState("");
  const [search, setSearch] = useState("");
  const owners = ["Tesla, Inc.", "LEGALFORCE RAPC.", "SpaceX Inc.", "SpaceX Inc."];
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  return (
    <div className="owner-filter">
      <div className="tabs">
      <button
        className={`button ${activeButton === 'owner' ? 'active' : ''}`}
        onClick={() => handleButtonClick('owner')}
      >
        Owner
      </button>
      <button
        className={`button ${activeButton === 'lawfirms' ? 'active' : ''}`}
        onClick={() => handleButtonClick('lawfirms')}
      >
        Law Firms
      </button>
      <button
        className={`button ${activeButton === 'attorneys' ? 'active' : ''}`}
        onClick={() => handleButtonClick('attorneys')}
      >
        Attorneys
      </button>
      </div>
      <input
        type="text"
        placeholder=" 🔍 Search Owners"
        className="owner-box-search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="owners-list">
        {owners
          .filter((owner) => owner.toLowerCase().includes(search.toLowerCase()))
          .map((owner, index) => (
            <label key={index} className="owner-item">
              <input
                type="checkbox"
                checked={selectedOwner === owner}
                onChange={() => setSelectedOwner(owner)}
              />
              <span className={selectedOwner === owner ? "selected" : ""}>{owner}</span>
            </label>
          ))}
      </div>
    </div>
  );
};

export default OwnersFilter;
