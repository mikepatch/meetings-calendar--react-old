import React from "react";

import FormInput from "./FormInput";

import "./formField.css";

export default class FormField extends React.Component {
    render() {
        const { id, label, errorMessage, ...inputProps } = this.props;
        return (
            <div className="form__field">
                <label htmlFor={id}>{label}</label>
                <FormInput
                    className={`form__input ${errorMessage ? 'form__input--error' : ''}`}
                    id={id}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    {...inputProps}
                />
                {errorMessage && <small className="form__error">{errorMessage}</small>}
            </div>
        )
    }
}