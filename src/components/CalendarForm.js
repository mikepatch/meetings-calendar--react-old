import React from "react";

import "./calendarForm.css";

export default class CalendarForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
        errors: {},
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            errors: { ...this.state.errors, [name]: null },
        });
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
            errors.firstName = "Last name should contains at least 2 characters."
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
        const { firstName, lastName, email, date, time, errors } = this.state;

        return (
            <form
                className="form"
                onSubmit={this.handleSubmit}
                noValidate
            >
                <header>
                    <h2>Meetings form</h2>
                    <p>Enter your meeting details</p>
                </header>
                <div>
                    <label htmlFor="first_name">First name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="firstName"
                        value={firstName}
                        onChange={this.handleInputChange}
                    />
                    {errors.firstName && <span>{errors.firstName}</span>}
                </div>
                <div>
                    <label htmlFor="last_name">Last name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="lastName"
                        value={lastName}
                        onChange={this.handleInputChange}
                    />
                    {errors.lastName && <span>{errors.lastName}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                    />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={date}
                        onChange={this.handleInputChange}
                    />
                    {errors.date && <span>{errors.date}</span>}
                </div>
                <div>
                    <label htmlFor="time">Time</label>
                    <input
                        type="text"
                        id="time"
                        name="time"
                        value={time}
                        onChange={this.handleInputChange}
                    />
                    {errors.time && <span>{errors.time}</span>}
                </div>
                <div>
                    <button type="submit">Add meeting</button>
                </div>
            </form>
        )
    }
}