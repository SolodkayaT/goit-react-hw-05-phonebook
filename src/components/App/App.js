import React, { Component } from "react";
import ContactList from "../ContactList/ContactList";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import styles from "./App.module.css";
import { uuid } from "uuidv4";

export default class App extends Component {
  state = {
    contacts: [],
    filter: ""
  };
  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    console.log(persistedContacts);
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = filter => {
    this.setState({ filter });
  };

  addContact = (name, phone) => {
    const { contacts } = this.state;
    const isExist = contacts.some(contact => contact.name === name);
    if (isExist) {
      alert(`${name} is already in cntacts!`);
      return;
    }
    const contact = { id: uuid(), name, phone };
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  getFiltredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getFiltredContacts();
    return (
      <section className={styles.section}>
        <h1 className={styles.title}>Phonebook</h1>
        {ContactForm && <ContactForm onAddContact={this.addContact} />}
        <h2 className={styles.title}>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemove={this.removeContact}
          />
        )}
      </section>
    );
  }
}
