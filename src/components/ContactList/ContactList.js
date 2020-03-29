import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactListItem from "../ContactListItem/ContactListItem";
import ContactListButton from "../ContactListButton/ContactListButton";
import styles from "./ContactList.module.css";
import "./ContactList-item-animation.css";

export default function ContactList({ contacts, onRemove }) {
  return (
    <TransitionGroup component="ul" className={styles.contactList}>
      {contacts.map(contact => (
        <CSSTransition
          key={contact.name}
          timeout={250}
          classNames="ContactsList-item-fade"
        >
          <ContactListItem contact={contact}>
            <ContactListButton
              contact={contact}
              onRemoveContact={() => onRemove(contact.id)}
            />
          </ContactListItem>
        </CSSTransition>
      ))}
    </TransitionGroup>
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
