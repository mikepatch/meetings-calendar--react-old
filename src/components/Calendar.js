import React from "react";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";
import { DB_API as meetingsData } from "../DB_API";

import "./calendar.css";

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.meetingsData = new meetingsData();
        this.state = {
            meetings: [],
            error: '',
        };
    }

    componentDidMount() {
        this.meetingsData.loadData()
            .then(meetingsArray => {
                this.setState(
                    { meetings: meetingsArray }
                )
            })
            .catch(error =>
                this.setState(
                    { error }
                ));
    }

    handleSubmit = (data) => {
        this.meetingsData.addData(data)
            .then(newMeeting => {
                this.setState({
                    meetings: [...this.state.meetings, newMeeting],
                });
            })
            .catch(error => console.error('error:', error))
    }

    render() {
        const { meetings, error } = this.state;

        return (
            <div className="app">
                {error && (
                    <h1>An error occurred: {error.message}</h1>
                )}
                <CalendarForm onSubmit={this.handleSubmit} />
                <CalendarList meetings={meetings} />
            </div>
        )
    }
}