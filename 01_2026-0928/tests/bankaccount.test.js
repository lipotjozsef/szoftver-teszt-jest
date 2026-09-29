const { BankAccount } = require('../src/BankAccount.js')

describe('Banki fiók kivétel kezelés', () => {
    let TestAccount
    const initalBalance = 10000

    beforeEach(() => {
        TestAccount = new BankAccount(initalBalance)
    })

    const TestWithdrawAmount = 300
    it("Érvényes összeg levételekor, a számla értéke helyesen változik", () => {
        TestAccount.withdraw(TestWithdrawAmount)
        expect(TestAccount.accountBalance).toBe(initalBalance - TestWithdrawAmount)
    })

    const TestDepositAmount = 300
    it("Érvényes összeg felvételkor, a számla értéke helyesen változik", () => {
        TestAccount.deposit(TestDepositAmount)
        expect(TestAccount.accountBalance).toBe(initalBalance + TestDepositAmount)
    })

    test.each([
        null, undefined, "1000"
    ])("Helytelen %s érték esetén, Error kell vissza adnia", (testValue) => {
        expect(() => {
            TestAccount.withdraw(testValue)
        }).toThrow('Nem szám alapú összeget nem lehet kivenni.')

        expect(() => {
            TestAccount.deposit(testValue)
        }).toThrow('Nem szám alapú összeget nem lehet feltölteni.')
    })

    it("Negatív értékes pénzfelvétekor, Error-t kell dobnia.", () => {
        expect(() => {
            TestAccount.withdraw(-Number.MAX_VALUE)
        }).toThrow("Negatív összeget nem lehet kivenni.")
    })

    it("Negatív értékes pénzfeltöltéskor, Error-t kell dobnia.", () => {
        expect(() => {
            TestAccount.deposit(-Number.MAX_VALUE)
        }).toThrow("Negatív összeget nem lehet feltölteni.")
    })

    it("Számla fedezetén túli pénzösszeg felvételekor, Error-t kell dobnia.", () => {
        expect(() => {
            TestAccount.withdraw(Number.MAX_VALUE)
        }).toThrow("Nincs elegendő fedezete a számláján ekkora pénzfelvételhez.")
    })
});