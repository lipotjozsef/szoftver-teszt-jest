class BankAccount {
    accountBalance

    constructor(startingBalance)
    {
        this.accountBalance = startingBalance
    }

    deposit(amount)
    {
        if (typeof amount !== 'number' )
            throw new Error("Nem szám alapú összeget nem lehet feltölteni.")

        if (amount < 0)
            throw new Error("Negatív összeget nem lehet feltölteni.")

        this.accountBalance += Math.max(amount, 0)

        return this.accountBalance
    }

    withdraw(amount)
    {

        if (typeof amount !== 'number' )
            throw new Error("Nem szám alapú összeget nem lehet kivenni.")

        if (amount < 0)
            throw new Error("Negatív összeget nem lehet kivenni.")

        if (amount > this.accountBalance)
            throw new Error("Nincs elegendő fedezete a számláján ekkora pénzfelvételhez.")


        this.accountBalance -= Math.max(amount, 0)

        return this.accountBalance
    }
}

module.exports = { BankAccount }