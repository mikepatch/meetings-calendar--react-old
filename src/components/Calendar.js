import React from "react";
import CalendarList from "./CalendarList";

export default class Calendar extends React.Component {
    state = {
        meetings: [],
        error: '',
    }

    componentDidMount() {
        this.loadMeetings()
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

    loadMeetings() {
        const options = { method: 'GET' };

        return this._fetch(options);
    }

    addMeeting(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }

        return this._fetch(options)
    }

    _fetch(options, additionalPath = '') {
        const API_URL = 'http://localhost:3005/meetings';
        const url = API_URL + additionalPath;

        return fetch(url, options)
            .then(response => {
                if (response.ok) return response.json();

                throw new Error('Network error!');
            })
        // .then(response => console.log(response))
    }

    render() {
        const { meetings } = this.state;

        return (
            <>
                <CalendarList meetings={meetings} />
            </>
        )
    }
}