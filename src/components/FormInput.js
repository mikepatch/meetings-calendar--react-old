import React from "react";

import "./formInput.css"

export default class FormInput extends React.Component {

    render() {
        const { className, id, onFocus, onBlur, ...attributes } = this.props;

        return (
            <input
                className={className}
                id={id}
                {...attributes}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        );
    }
}