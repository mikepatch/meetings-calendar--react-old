import React from "react";

export default class FormField extends React.Component {
    render() {
        const { id, label, errorMessage, ...inputProps } = this.props;
        return (
            <div>
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    {...inputProps}
                />
                {errorMessage && <span>{errorMessage}</span>}
            </div>
        )
    }
}