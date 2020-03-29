import React from "react";
import PropTypes from "prop-types";
import ContactListItem from "../ContactListItem/ContactListItem";
import { uuid } from "uuidv4";
import ContactListButton from "../ContactListButton/ContactListButton";
import styles from "./ContactList.module.css";

export default function ContactList({ contacts, onRemove }) {
  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <ContactListItem contact={contact} key={uuid()}>
          <ContactListButton
            contact={contact}
            onRemoveContact={() => onRemove(contact.id)}
          />
        </ContactListItem>
      ))}
    </ul>
  );
}

ContactList.defaultProps = {
  contacts: [],
  onRemove: () => {}
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  onRemove: PropTypes.func
};
