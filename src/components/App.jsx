import React, { Component } from 'react';
import Form from './Form';
import ContactsList from './ContactsList';
import Filter from './Filter';

const CONTACTS_LOCALSTORAGE_KEY = 'contacts';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

   componentDidMount() {
    const parsedContacts = JSON.parse(
      localStorage.getItem(CONTACTS_LOCALSTORAGE_KEY)
    );
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem(CONTACTS_LOCALSTORAGE_KEY, JSON.stringify(contacts));
    }
  }

  handleFormSubmit = profile => {
    const { contacts } = this.state;
    const nameToCheck = profile.name.toLocaleLowerCase();
    const isIncludeName = contacts.some(
      contact => contact.name.toLocaleLowerCase() === nameToCheck
    );
    if (isIncludeName) {
      alert(`${profile.name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => {
      return {
        contacts: [profile, ...contacts],
      };
    });
  };

  handleFilterChange = evt => {
    const { value } = evt.currentTarget;
    this.setState({ filter: value });
  };

  handleDeleteContact = id => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: updatedContacts });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedContacts = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizedContacts)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 30,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <Form onFormSubmit={this.handleFormSubmit} />
        <h2 className="contacts__title">Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactsList
          contacts={filteredContacts}
          onDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}
