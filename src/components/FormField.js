import React from "react";

import FormInput from "./FormInput";

import "./formField.css";

export default class FormField extends React.Component {
    state = {
        inputFocus: false,
    }

    handleInputBlur = () => {
        this.setState({
            inputFocus: false,
        })
    }

    handleInputFocus = () => {
        this.setState({
            inputFocus: true,
        })
    }

    render() {
        const { inputFocus } = this.state;
        const { id, label, errorMessage, autocompleteData, onClick, ...inputProps } = this.props;
        const autocompleteItems = autocompleteData &&
            autocompleteData.map(item =>
                <li
                    key={item.id}
                    onClick={onClick}
                >
                    {item.result}
                </li>
            )

        return (
            <div className="form__field">
                <label htmlFor={id}>{label}</label>
                <div className="form__input-group">
                    <FormInput
                        className={`form__input ${errorMessage ? 'form__input--error' : ''}`}
                        id={id}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputBlur}
                        {...inputProps}
                    />
                    {
                        (autocompleteItems && inputFocus) &&
                        <ul className="form__autocomplete">{autocompleteItems}</ul>
                    }
                </div>
                {errorMessage && <small className="form__error">{errorMessage}</small>}
            </div>
        )
    }
}