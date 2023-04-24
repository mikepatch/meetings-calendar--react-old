export default class FormValidator {
    constructor() {
        this.errors = {};
    }
    validate(form, fields) {
        fields.forEach(field => {
            const inputValue = form[field.name].value;
            const fieldErrors = this.validateField(field, inputValue);

            this.errors[field.name] = fieldErrors;
        });
    }

    validateField(field, inputValue) {
        const errors = [];
        const { label, required, pattern, errorMessage } = field;

        if (required) {
            if (inputValue.length === 0) errors.push(`${label} is required.`);
        }

        if (inputValue.length > 0 && pattern) {
            const reg = new RegExp(pattern);
            if (!reg.test(inputValue)) errors.push(errorMessage);
        }

        return errors;
    }

    areFieldsValid() {
        const errorsArr = Object.values(this.errors).filter(error => error.length !== 0);

        return errorsArr.length !== 0 ?
            false
            :
            true;
    }
} 