// validations.js

function validateField(name, value) {
    let errorMessage = '';
    const textRegex = /^[A-Za-z\s]+$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  
    switch (name) {
        case 'name':
            if (!textRegex.test(value)) {
            errorMessage = 'The name must only contain letters.';
            }
        break;
        case 'lastname':
            if (!textRegex.test(value)) {
            errorMessage = 'The last name must only contain letters.';
            }
        break;
        case 'nationality':
            if (value === '' || value === 'Not select') {
            errorMessage = 'You must select a valid nationality.';
            }
        break;
        case 'birthdate':
            if (!dateRegex.test(value)) {
               errorMessage = 'You must select a valid date.'; 
            }            
            const birthdate = new Date(value);
            const currentDate = new Date();
            const ageDifferenceInMilliseconds = currentDate - birthdate;
            const ageInYears = Math.floor(ageDifferenceInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));

            if (ageInYears < 18) {
                errorMessage = 'You must be over 18 years old to register.';
            }
        break;
        case 'description':
            if (value.length === 0 ) {
                errorMessage = 'Description cannot be empty';
            };
            if (value.length > 255 ) {
                errorMessage = 'The description cannot exceed 255 characters';
            };
        break;
        case 'teamId':
            if (value.length === 0) {
                errorMessage = 'You must select at least one team.';
            }
        break;
        
      default:
        break;
    }
  
    return errorMessage;
};
export default validateField;
