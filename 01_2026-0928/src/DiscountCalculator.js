function get_discount_percentage(age)
{
    if (typeof age !== 'number')
        throw new Error("Nem szám alapú értékre nem lehet kedvezményt kérni.")

    if (age >= 0 && age <= 6)
        return 100

    else if (age >= 7 && age <= 18)
        return 50

    else if (age >= 19 && age <= 64)
        return 0

    else if (age >= 65)
        return 30

    return 0
}

module.exports = { get_discount_percentage }