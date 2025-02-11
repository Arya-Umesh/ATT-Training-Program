const phoneValidation = (phone) => {
    const phoneRegEx = /[0-9]{10}/g;
    if(!phoneRegEx.test(phone)) {
        return 0;
    }
    return 1;

}

const emailValidation = (email) => {
    const emailRegEx = /[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if(!emailRegEx.test(email)) {
        return 0;
    }
    return 1;

}

export {phoneValidation, emailValidation}