import React from "react";

export default class Calendar extends React.Component {
    state = { meetings: [], }

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
            .then(response => console.log(response))
    }


    render() {
        return <h1>Test</h1>
    }
}