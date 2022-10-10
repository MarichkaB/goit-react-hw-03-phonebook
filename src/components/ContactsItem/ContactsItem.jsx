import s from './ContactsItem.module.css';
import PropTypes from 'prop-types';

export default function ContactsItem({ name, number, id, onDelete }) {
  return (
    <li className={s.contacts_item}>
      <span>{name}:</span>
      <span>{number}</span>
      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
}

ContactsItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};