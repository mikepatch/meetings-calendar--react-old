import React from "react";

import FormInput from "./FormInput";

import "./formField.css";

export default class FormField extends React.Component {
    state = {
        showAutoComplete: false,
    }

    handleInputBlur = () => {
        this.setState({
            showAutoComplete: false,
        });
    }

    handleInputFocus = () => {
        this.setState({
            showAutoComplete: true,
        });
    }

    render() {
        const { showAutoComplete } = this.state;
        const { id, label, errorsMessages, autocompleteData, setAutocomplete, ...inputProps } = this.props;
        const errorMessage = errorsMessages && errorsMessages.map(error => (
            <li
                key={error}
                className="form__errors-item"
            >
                {error}
            </li>
        ));
        const autocompleteItems = autocompleteData && autocompleteData.map(result => (
            <li
                key={result.id}
                onMouseDown={() => setAutocomplete(result)}
            >
                {result.content}
            </li>
        ));

        return (
            <div className="form__field">
                <label htmlFor={id}>{label}</label>
                <div className="form__input-group">
                    <FormInput
                        className={`form__input ${errorsMessages ? 'form__input--error' : ''}`}
                        id={id}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputBlur}
                        {...inputProps}
                    />
                    {
                        (autocompleteItems && autocompleteItems.length !== 0 && showAutoComplete) &&
                        <ul className="form__autocomplete">{autocompleteItems}</ul>
                    }
                    {errorsMessages && <ul className="form__errors-list">{errorMessage}</ul>}
                </div>
            </div>
        )
    }
}