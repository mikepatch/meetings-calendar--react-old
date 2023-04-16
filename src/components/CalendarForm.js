import React from "react";

import "./calendarForm.css";

export default class CalendarForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { onSubmit } = this.props;
        const { firstName, lastName, email, date, time } = this.state;
        const data = { firstName, lastName, email, date, time };

        onSubmit(data);
    }

    render() {
        const { firstName, lastName, email, date, time } = this.state;

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
                </div>
                <div>
                    <button type="submit">Add meeting</button>
                </div>
            </form>
        )
    }
}