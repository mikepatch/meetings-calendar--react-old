import React from "react";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";

import { DB_API as MeetingsData } from ".././services/DB_API";

import fields from "../utilities/formFields.json";
import Autocomplete from "../services/Autocomplete";

import "./calendar.css";

export default class Calendar extends React.Component {
    constructor() {
        super();
        this.meetingsData = new MeetingsData();
        this.state = {
            meetings: [],
            error: '',
        };
    }

    componentDidMount() {
        this.insertMeetings();
    }

    insertMeetings() {
        this.getDataFromAPI()
            .then(meetingsArray => {
                this.setState(
                    { meetings: meetingsArray }
                );
            })
            .catch(error => {
                this.setState(
                    { error }
                );
            });
    }

    handleSubmit = data => {
        this.postDataToAPI(data)
            .then(newMeeting => {
                this.changeState('meetings', [newMeeting]);
                this.showSuccess(newMeeting);
            })
            .catch(error => alert(`An error occurred: ${error}`));
    }

    showSuccess({ firstName, lastName }) {
        return alert(`You have added a new meeting with: ${firstName} ${lastName}`);
    }

    changeState(stateName, propertiesToChange) {
        this.setState(state => {
            return {
                [stateName]: [...state[stateName], ...propertiesToChange]
            };
        });
    }

    getDataFromAPI = () => this.meetingsData.loadData();

    postDataToAPI = data => this.meetingsData.addData(data);

    removeDataFromAPI = id => (
        this.meetingsData.removeData(id)
        .then(() => this.insertMeetings())
    )

    getAutocompleteData = (inputName, value) => (
        new Autocomplete().getFilteredItems(inputName, value)
    )

    render() {
        const { meetings, error } = this.state;

        return (
            <div className="calendar">
                <section className="calendar__form-panel">
                    <CalendarForm
                        title='New meeting'
                        fields={fields}
                        onSubmit={this.handleSubmit}
                        onAutocomplete={this.getAutocompleteData}
                    />
                </section>
                <section className="calendar__meetings-panel meetings">
                    {error ?
                        <h1 className="meetings__error">An error occurred: {error.message}</h1>
                        :
                        meetings.length > 0 ?
                            < CalendarList
                                title='Meetings'
                                meetings={meetings}
                                onRemove={this.removeDataFromAPI}
                            />
                            :
                            <h2>There are no upcoming meetings.</h2>
                    }
                </section>
            </div>
        )
    }
}