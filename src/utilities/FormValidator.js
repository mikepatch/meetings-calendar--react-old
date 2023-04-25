export default class FormValidator {
  validate(form, fields) {
    const errors = {};

    fields.forEach((field) => {
      const inputValue = form[field.name].value;
      const fieldErrors = this.validateField(field, inputValue);

      errors[field.name] = fieldErrors;
    });

    return errors;
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
}
