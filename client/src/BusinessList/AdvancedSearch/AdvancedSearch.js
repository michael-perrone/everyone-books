import React, { useState, useEffect } from "react";
import styles from "./AdvancedSearch.module.css";

const AdvancedSearch = props => {
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState('');

  function handleCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function handleState(event) {
    event.preventDefault();
    setState(event.target.value);
  }
  function handleZip(event) {
    event.preventDefault();
    setZip(event.target.value);
  }

  function handleTypeOfBusiness(event) {
    event.preventDefault()
    setTypeOfBusiness(event.target.value);
  }

  function handleBusinessName(event) {
    event.preventDefault();
    setBusinessName(event.target.value);
  }

  return (
    <div className={styles.searchContainer}>
      <p
        style={{
          position: "relative",
          top: "20px",
          textAlign: "center",
          fontSize: "24px",
          fontFamily: "Josefin sans, sans",
          textShadow: "1px 1px white"
        }}
      >
        Business Search
      </p>
      <form id={styles.inputContainer}>
        <div id={styles.extraSizeDiv} className={styles.sizeDiv}>
          <input
            onChange={handleCity}
            value={city}
            placeholder="Business City"
            className={styles.searchInput}
          />
          <select onChange={handleTypeOfBusiness} placeholder="cute" className={styles.searchInput}>
            <option disabeled>Type Of Business</option>
            <option>Potato</option>
          </select>
          <input
            onChange={handleZip}
            value={zip}
            placeholder="Business Zip Code"
            className={styles.searchInput}
          />
        </div>
        <div className={styles.sizeDiv}>
          <input
            onChange={handleState}
            value={state}
            placeholder="Business State"
            className={styles.searchInput}
          />
          <input
            onChange={handleBusinessName}
            value={businessName}
            placeholder="Business Name"
            className={styles.searchInput}
          />
        </div>
        <button
          onClick={props.advancedSearchFunction(city, state, zip, businessName)}
          id={styles.searchButton}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default AdvancedSearch;
