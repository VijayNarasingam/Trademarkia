import React, { useState } from "react";
import "../Styles.css"; // Ensure this CSS file is included

const DisplayToggle = () => {
  const [view, setView] = useState("grid");

  return (
    <div className="display-container">
      <p className="display-title">Display</p>
      <div className="view-buttons">
        <button
          className={view === "grid" ? "view-btn active" : "view-btn"}
          onClick={() => setView("grid")}
        >
          Grid View
        </button>
        <button
          className={view === "list" ? "view-btn active" : "view-btn"}
          onClick={() => setView("list")}
        >
          List View
        </button>
      </div>
    </div>
  );
};

export default DisplayToggle;
