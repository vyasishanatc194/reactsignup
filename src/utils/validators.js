/* eslint-disable */
const isValidPassword = (value) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return (re.test(value));
};
  
const isValidEmailAddress = (value) => {
    return null !== value.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
}

const isValidName = (value) => {
    const re = /^[a-zA-Z ]+(?:-[a-zA-Z ]+)*$/;
    return re.test(value);
}

export {isValidPassword, isValidEmailAddress, isValidName};
