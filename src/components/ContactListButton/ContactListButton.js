import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactListButton.module.css";

export default function ContactListButton({ contact, onRemoveContact }) {
  return (
    <button
      className={styles.contactButton}
      type="button"
      onClick={() => onRemoveContact(contact.id)}
    ></button>
  );
}

ContactListButton.defaultProps = {
  contact: {},
  onRemoveContact: () => {}
};

ContactListButton.propTypes = {
  contact: PropTypes.object,
  onRemoveContact: PropTypes.func
};
