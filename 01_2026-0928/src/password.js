const PasswordMinimumLength = 8;

function isStrongPassword(passwordAsString)
{
    // null or undefined
    if (typeof passwordAsString !== 'string')
        return false

    const regexContainsCapital = /[A-Z]/;
    if (regexContainsCapital.test(passwordAsString) === false)
        return false

    const regexContainsNumber = /[0-9]/;
    if (regexContainsNumber.test(passwordAsString) === false)
        return false

    if (passwordAsString.length < PasswordMinimumLength)
        return false

    return true
}

module.exports = { isStrongPassword };