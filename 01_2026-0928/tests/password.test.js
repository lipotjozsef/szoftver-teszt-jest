/*

isStringPassword function: boolean unit test-je

*/


const { isStrongPassword } = require('../src/password.js');

describe('Jelszóerrőség-ellenőrző tesztelése', () => {
    it("Érvényes jelszó esetében, 'true' értéket kell vissza adnia!", () => {
        const StrongPassword = 'Titkos123';

        expect(isStrongPassword(StrongPassword)).toBe(true)
    })

    describe('Érvénytelen típusok tesztelése', () => {
        test.each([
            null, undefined
        ])("Érvénytelen %s típusnál, 'false' értéket kell vissza adnia", (testValue) => {
            expect(isStrongPassword(testValue)).toBe(false)
        })
    })

    it("Túl rövid, 8 karakternél rövidebb, jelszónál 'false' értéket kell vissza adnia!", () => {
        const shortPassword = 'Ab1';
        
        expect(isStrongPassword(shortPassword)).toBe(false)
    })

    it("Kötelező szám kihagyásával, 'false' értéket kell vissza adnia!", () => {
        const withoutNumberPassword = 'Titkossss';

        expect(isStrongPassword(withoutNumberPassword)).toBe(false)
    })

    it("Hiányzó nagybetű kihagyásával, 'false' értéket kell vissza adnia!", () => {
        const withoutCapitalLetterPassword = 'titkos123';

        expect(isStrongPassword(withoutCapitalLetterPassword)).toBe(false)
    })

    test.each([
        '', ""
    ])("Üresen hagyott jelszó esetén, 'false' értéket kell vissza adnia!", (emptyStringValue) => {
        expect(isStrongPassword(emptyStringValue)).toBe(false)
    })
})