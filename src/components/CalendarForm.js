import React from "react";

import FormField from "./FormField";

import { DB_API as MeetingsData } from ".././services/DB_API";

import "./calendarForm.css";
import Autocomplete from "../services/Autocomplete";

export default class CalendarForm extends React.Component {
    constructor(props) {
        super();
        this.meetingsData = new MeetingsData();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            date: '',
            time: '',
            errors: {},
            autocomplete: {},
        }
        this.fields = props.fields;
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            errors: { ...this.state.errors, [name]: null },
        });

        const currentField = this.fields.find(field => field.name === name);
        const fieldErrors = this.validateField(currentField, value);

        if (value.length > 2) {
            this.setState({
                errors: { ...this.state.errors, [name]: fieldErrors },
            });
        }

        this.autocomplete(name, value);
    }

    autocomplete = (inputName, value) => {
        new Autocomplete().getItems(inputName, value)
            .then(result => {
                this.setState({
                    autocomplete: { ...this.state.autocomplete, [inputName]: result, }
                });
            })
            .catch(error => console.error('An error occurred', error))
    }

    handleAutocomplete = ({ inputName, content: value }) => {
        this.setState(() => {
            return {
                [inputName]: value,
            };
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { onSubmit } = this.props;
        const { firstName, lastName, email, date, time } = this.state;

        const errors = this.validateFields();
        const areErrorsEmpty = () => {
            const errorsArr = Object.values(errors).filter(error => error.length !== 0)

            if (errorsArr.length !== 0) return true;
            else return false;
        }

        if (areErrorsEmpty()) {
            this.setState({ errors });
        } else {
            onSubmit({ firstName, lastName, email, date, time });
            this.clearInputs();
        }
    }

    validateField(field, inputValue) {
        const errors = [];
        const { label, required, pattern, errorMessage } = field;

        if (required) {
            if (inputValue.length === 0) errors.push(`${label} is required.`);
        }

        if (inputValue.length > 0 && pattern) {
            const reg = new RegExp(pattern);
            if (!reg.test(inputValue)) errors.push(errorMessage);
        }

        return errors;
    }

    validateFields = () => {
        const errors = {};

        this.fields.forEach(field => {
            const inputValue = this.state[field.name]
            const fieldErrors = this.validateField(field, inputValue);

            errors[field.name] = fieldErrors;
        });

        return errors;
    };

    clearInputs() {
        this.setState(() => {
            return {
                firstName: '',
                lastName: '',
                email: '',
                date: '',
                time: '',
            }
        });
    }

    render() {
        const { errors, autocomplete } = this.state;
        const { title, description } = this.props;
        const formFields = this.fields.map(({ id, label, type, name, }) => (
            <FormField
                key={id}
                id={id}
                label={label}
                type={type}
                name={name}
                value={this.state[name]}
                onChange={this.handleInputChange}
                errorsMessages={(errors[name] && errors[name].length !== 0) && errors[name]}
                autocompleteData={autocomplete[name]}
                onMouseDown={this.handleAutocomplete}
            />
        ));

        return (
            <form
                className="form"
                onSubmit={this.handleSubmit}
                noValidate
                autoComplete="off"
            >
                <header className="form__header">
                    {title && <h2 className="form__title">{title}</h2>}
                    {description && <p className="form__description">{description}</p>}
                </header>
                {formFields}
                <div className="form__button">
                    <button type="submit">Add meeting</button>
                </div>
            </form>
        )
    }
}