import React from "react";
import PropTypes from "prop-types";
import styles from "./Notification.module.css";

export default function Notification({ name }) {
  return (
    <p className={styles.NotificationMessage}>
      {name} is allready in contacts!
    </p>
  );
}

Notification.defaultProps = {
  name: ""
};

Notification.propTypes = {
  name: PropTypes.string
};
