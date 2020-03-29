import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

export default function Filter({ value, onChangeFilter }) {
  return (
    <div className={styles.filterContainer}>
      <label className={styles.filterName}>
        Find contacts by name
        <input
          className={styles.filter}
          type="text"
          value={value}
          onChange={e => onChangeFilter(e.target.value)}
        ></input>{" "}
      </label>
    </div>
  );
}

Filter.defaultProps = {
  value: "",
  onChangeFilter: () => {}
};

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func
};
