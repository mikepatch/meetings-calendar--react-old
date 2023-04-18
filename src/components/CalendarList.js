import React from "react";

import CalendarItem from "./CalendarItem";

import "./calendarList.css"

export default class CalendarList extends React.Component {
    render() {
        const { meetings } = this.props;
        const meetingsItems = meetings.map(meeting => <CalendarItem key={meeting.id} meeting={meeting} />)

        return (
            <ul className="meetings-list">
                {meetingsItems}
            </ul>
        )
    }
}