function validateField(name, value) {
    let errorMessage = '';
    const textRegex = /^[A-Za-z]+([- ][A-Za-z]+)*$/;

  
    switch (name) {
        case 'nationality':
            if (!textRegex.test(value)) {
                errorMessage = 'The nationality must only contain letters.';
            }
            if (value.length === 0) {
                errorMessage = 'Nationality cannot be empty.';
            }
        break;
        
      default:
        break;
    }
  
    return errorMessage;
};
export default validateField;
