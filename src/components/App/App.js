import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import ContactList from "../ContactList/ContactList";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import Notification from "../Notification/Notification";
import styles from "./App.module.css";
import TitleFadeStyles from "./TitleFade.module.css";
import ShowContactsStyles from "./ShowContacts.module.css";
import FilterShowStyles from "./FilterShow.module.css";
import NotificationShowStyles from "./NotificationShow.module.css";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    showTitle: false,
    isNotification: false
  };
  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
        showTitle: true
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
      this.setState({ isNotification: true });
      return;
    }
    const contact = { id: name, name, phone };
    this.setState(prevState => {
      return {
        isNotification: false,
        contacts: [...prevState.contacts, contact]
      };
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
        isNotification: false,
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      };
    });
  };

  render() {
    const { contacts, filter, isNotification } = this.state;
    const visibleContacts = this.getFiltredContacts();
    return (
      <section className={styles.section}>
        <div className={styles.notification}>
          <CSSTransition
            in={true}
            appear={true}
            classNames={TitleFadeStyles}
            timeout={500}
            unmountOnExit
          >
            <h1 className={styles.title}>Phonebook</h1>
          </CSSTransition>
          <CSSTransition
            in={isNotification}
            timeout={750}
            classNames={NotificationShowStyles}
            unmountOnExit
            onEntered={() => this.setState({ isNotification: false })}
          >
            <Notification />
          </CSSTransition>
        </div>
        {ContactForm && <ContactForm onAddContact={this.addContact} />}
        <h2 className={styles.title}>Contacts</h2>
        <CSSTransition
          in={contacts.length > 1}
          classNames={FilterShowStyles}
          timeout={250}
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>
        <CSSTransition
          in={true}
          appear={true}
          classNames={ShowContactsStyles}
          timeout={500}
          unmountOnExit
        >
          <ContactList
            contacts={visibleContacts}
            onRemove={this.removeContact}
          />
        </CSSTransition>
      </section>
    );
  }
}
