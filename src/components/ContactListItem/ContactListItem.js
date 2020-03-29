import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactListItem.module.css";

export default function ContactListItem({ contact, keys, children }) {
  return (
    <li className={styles.contactItem} key={keys}>
      {contact.name}
      <div>
        <span className={styles.phone}> {contact.phone}</span>
        {children}
      </div>
    </li>
  );
}

ContactListItem.defaultProps = {
  contact: {},
  keys: ""
};

ContactListItem.propTypes = {
  contacts: PropTypes.object,
  keys: PropTypes.string
};
