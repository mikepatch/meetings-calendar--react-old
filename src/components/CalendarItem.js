import React from "react";

import "./calendarItem.css";

export default class CalendarItem extends React.Component {
    handleRemove(id) {
        const { onRemove } = this.props;

        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm('Are you sure to remove meeting?');

        confirmed && onRemove(id);
    }

    render() {
        const { meeting: { id, firstName, lastName, email, date, time } } = this.props;

        return (
            <li className="meetings__item meeting">
                <header className="meeting__header">
                    <h3 className="meeting__title">{date} {time}</h3>
                </header>
                <section className="meeting__body">
                    <p>Name: {firstName} {lastName}</p>
                    <p>E-mail: {email}</p>
                </section>
                <section className="meeting__buttons">
                    <button
                        className="btn btn--danger"
                        onClick={() => this.handleRemove(id)}>Remove</button>
                </section>
            </li>
        )
    }
}