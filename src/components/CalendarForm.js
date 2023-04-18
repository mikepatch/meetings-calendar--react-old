import React from "react";

import FormField from "./FormField";

import { DB_API as MeetingsData } from ".././services/DB_API";

import "./calendarForm.css";

export default class CalendarForm extends React.Component {
    constructor() {
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
    }


    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            errors: { ...this.state.errors, [name]: null },
            autocomplete: { ...this.state.autocomplete, [name]: null }
        });

        this.autocomplete(name, value);
    }

    autocomplete = (name, value) => {
        if (value.length !== 0) {
            this.meetingsData.filterData(name, value)
                .then(filteredItems => {
                    const result = filteredItems.map(item => {
                        return { id: item.id, result: item[name], }
                    })

                    this.setState({
                        autocomplete: { ...this.state.autocomplete, [name]: result }
                    })
                })
        }
    }

    handleAutoFill = () => {
        console.log('autofill');
    }

    handleSubmit = event => {
        event.preventDefault();
        const { onSubmit } = this.props;
        const { firstName, lastName, email, date, time } = this.state;

        const errors = this.validateInputs();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
        } else {
            onSubmit({ firstName, lastName, email, date, time });
            this.clearInputs();
        }
    }

    validateInputs = () => {
        const errors = {};
        const { firstName, lastName, email, date, time } = this.state;

        if (!firstName) {
            errors.firstName = "First name is required.";
        } else if (firstName.length < 2) {
            errors.firstName = "First name should contains at least 2 characters."
        }

        if (!lastName) {
            errors.lastName = "Last name is required.";
        } else if (lastName.length < 2) {
            errors.lastName = "Last name should contains at least 2 characters."
        }

        if (!email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid.";
        }

        if (!date) {
            errors.date = "Date is required";
        } else if (!/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/.test(date)) {
            errors.date = "Date should be in YYYY-mm-dd format.";
        }

        if (!time) {
            errors.time = "Time is required";
        } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
            errors.time = "Time should be in HH:mm format.";
        }

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
        const { firstName, lastName, email, date, time, errors, autocomplete } = this.state;
        const { title, description } = this.props;

        return (
            <form
                className="form"
                onSubmit={this.handleSubmit}
                noValidate
                autoComplete="off"
            >
                <header>
                    {title && <h2>{title}</h2>}
                    {description && <p>{description}</p>}
                </header>
                <FormField
                    id="first_name"
                    label='First name'
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleInputChange}
                    errorMessage={errors.firstName}
                    autocompleteData={autocomplete.firstName}
                    onClick={this.handleAutoFill}
                />
                <FormField
                    id="last_name"
                    label='Last name'
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleInputChange}
                    errorMessage={errors.lastName}
                    autocompleteData={autocomplete.lastName}
                />
                <FormField
                    id="email"
                    label='Email'
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                    errorMessage={errors.email}
                    autocompleteData={autocomplete.email}

                />
                <FormField
                    id="date"
                    label='Date'
                    type="date"
                    name="date"
                    value={date}
                    onChange={this.handleInputChange}
                    errorMessage={errors.date}
                />
                <FormField
                    id="time"
                    label='Time'
                    type="time"
                    name="time"
                    value={time}
                    onChange={this.handleInputChange}
                    errorMessage={errors.time}
                />

                <div>
                    <button type="submit">Add meeting</button>
                </div>
            </form>
        )
    }
}