const ValidationFunction = {
    notEmptyValidation(value) {
        return value.length > 0;
    },

    emailValidation(value) {
        return value.includes('@') && !value.includes(' ');
    },

    passwordValidation(value) {
        return value.length > 6;
    },

    birthdateValidation(value) {
        return new Date(value).getTime() < Date.now();
    },
};

export default ValidationFunction;
