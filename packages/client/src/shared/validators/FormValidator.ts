class FormValidator {
  constructor(private template: Record<string, any>) {}

  getValidationRules = () => {
    const validationRules: Record<string, any> = {};
    for (const [field, rules] of Object.entries(this.template)) {
      validationRules[field] = rules;
    }
    return validationRules;
  };
}

export const useFormValidator = (template: Record<string, any>) => {
  const validator = new FormValidator(template);
  return validator.getValidationRules();
};
