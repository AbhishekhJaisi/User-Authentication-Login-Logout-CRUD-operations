const validator = require("validator"); // A library of string validators and sanitizers.

function validateUser(data) {
    const mandatoryField = ["firstName", "emailId", "age", "password"]

    const IsAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));

    if (!IsAllowed)
        throw new Error("Fields Missing");

    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid Email");

    if(!validator.isStrongPassword(data.password))
        throw new Error("Weak password");

    if(data.firstName.length<3 && data.firstName.length>25)
        throw new Error("Name should be between 3- 25 character"); 
}

module.exports = validateUser;