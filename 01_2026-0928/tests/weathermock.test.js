const { WeatherReporter } = require('../src/WeatherReporter.js')

describe('Időjárás api mockkolás', () => {
    const mockFunction = jest.fn(() => 13)
    const testReporter = new WeatherReporter({
        getTemperature: mockFunction
    })

    it("Mockkolt adat teszt", () => {
        expect(testReporter.should_wear_coat()).toBe(true)

        expect(mockFunction).toHaveBeenCalledTimes(1)
    })
});