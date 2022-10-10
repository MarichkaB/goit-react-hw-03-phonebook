import PropTypes from 'prop-types';
import s from './ContactsList.module.css';
import ContactsItem from '../ContactsItem/ContactsItem';

export default function ContactsList({ contacts, onDelete }) {
  if (!contacts.length) {
    return <p>User not found</p>;
  }

  return (
    <ul className={s.contacts_list}>
      {contacts.map(({ name, number, id }) => {
        return (
          <ContactsItem
            key={id}
            name={name}
            number={number}
            id={id}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
}

ContactsList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};