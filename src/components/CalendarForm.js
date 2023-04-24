import React from "react";

import FormField from "./FormField";

import "./calendarForm.css";
import FormValidator from "../utilities/FormValidator";

export default class CalendarForm extends React.Component {
    constructor(props) {
        super();
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
        this.formValidator = new FormValidator();
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState(state => {
            return {
                [name]: value,
                errors: { ...state.errors, [name]: null },
            }
        });

        this.checkInputs(name, value);
        this.autocomplete(name, value);
    }

    checkInputs(name, value) {
        const currentField = this.fields.find(field => field.name === name);
        const fieldErrors = this.formValidator.validateField(currentField, value);

        if (value.length > 2) {
            this.setState(state => {
                return {
                    errors: { ...state.errors, [name]: fieldErrors },
                }
            });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { onSubmit } = this.props;
        const form = event.target;

        this.formValidator.validate(form, this.fields);
        const errors = this.formValidator.errors;

        if (this.formValidator.areFieldsValid()) {
            onSubmit(this.getFormData());
            this.clearInputs();
        } else {
            this.setState({ errors });
        }
    }

    getFormData = () => {
        const formData = {};
        
        this.fields.forEach(({ name: fieldName }) => {
            formData[fieldName] = this.state[fieldName];
        });

        return formData;
    }

    clearInputs() {
        this.fields.forEach(({ name }) => {
            this.setState({
                [name]: '',
            });
        });
    }

    autocomplete = (inputName, value) => {
        const { onAutocomplete } = this.props;

        onAutocomplete(inputName, value)
            .then(response => {
                this.setState(state => {
                    return {
                        autocomplete: { ...state.autocomplete, [inputName]: response, }
                    }
                });
            })
            .catch(error => console.error('An error occurred', error));
    }

    setAutocomplete = ({ inputName, content: value }) => {
        this.setState(state => {
            return {
                [inputName]: value,
                errors: { ...state.errors, [inputName]: null },
                autocomplete: { ...state.autocomplete, [inputName]: null }
            };
        });
    }

    render() {
        const { errors, autocomplete } = this.state;
        const { title } = this.props;
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
                setAutocomplete={this.setAutocomplete}
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
                </header>
                {formFields}
                <div className="form__button-field">
                    <button
                        className="btn btn--primary"
                        type="submit"
                    >
                        Add meeting
                    </button>
                </div>
            </form>
        )
    }
}