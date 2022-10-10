import { Component } from 'react';
import s from './Form.module.css';
import { nanoid } from 'nanoid';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    const profile = { id: nanoid(3), ...this.state };
    this.props.onFormSubmit(profile);
    this.formReset();
  };

  formReset() {
    this.setState({
      name: '',
      number: '',
    });
  }

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleFormSubmit}>
        <label className="form_name">
          Name
          <input
            className={s.form_input}
            value={name}
            onChange={this.handleInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className="form__phone">
          Number
          <input
            className={s.form_input}
            value={number}
            onChange={this.handleInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={s.form_btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;