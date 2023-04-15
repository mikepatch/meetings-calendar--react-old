import React from "react";

export default class CalendarItem extends React.Component {

    render() {
        const { meeting: { firstName, lastName, email, date, time } } = this.props;

        return (
            <li>
                <header>
                    <h3>{date} {time}</h3>
                </header>
                <section>
                    <p>Name: {firstName} {lastName}</p>
                    <p>E-mail: {email}</p>
                </section>
            </li>
        )
    }
}