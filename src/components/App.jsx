import React, { Component } from 'react'

import css from '../App.module.css'

import { Report } from 'notiflix/build/notiflix-report-aio';

import { Filter } from './Filter/Filter'
import { ContactList } from './ContactList/ContactList'
import { ContactForm } from './ContactForm/ContactForm'

export class App extends Component {
  state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
  }

  addContact = contact => {
    const loweredCase = contact.name.toLowerCase().trim();

    const exists = this.state.contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      Report.failure(`Failed to add!`, `${contact.name} is already in contacts!`, `Back`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, contact],
      }));
    }
  };

  addFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
  }));

  render() {
      const { filter } = this.state;

      return (
      <section className={css.content}>
        <div className={css.content__container}>
          <ContactForm addContact={this.addContact} />
          <ContactList
            contacts={this.filteredContacts()}
            deleteContact={this.deleteContact}
          >
            <Filter filter={filter} addFilter={this.addFilter} />
          </ContactList>
        </div>
      </section>
    );
  }
}