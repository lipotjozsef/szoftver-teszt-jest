const { get_discount_percentage } = require('../src/DiscountCalculator.js')

describe('Koralapú Kedvezmény-rendszer tesztek', () => {
    test.each([
        [6, 100],
        [7, 50],
        [18, 50],
        [19, 0],
        [64, 0],
        [65, 30]
    ])("%s évet betöltött személy, %s%% kedvezményt kap", (age, discountValue) => {
        expect(get_discount_percentage(age)).toBe(discountValue)
    })
});