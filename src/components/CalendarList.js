import React from "react";

import CalendarItem from "./CalendarItem";

import "./calendarList.css"

export default class CalendarList extends React.Component {
    render() {
        const { title, meetings, onRemove } = this.props;
        const meetingsItems = meetings.map(meeting => (
            <CalendarItem
                key={meeting.id}
                meeting={meeting}
                onRemove={onRemove}
            />
        ));

        return (
            <>
                <h2>{title}</h2>
                <ul className="meetings__list">
                    {meetingsItems}
                </ul>
            </>
        )
    }
}