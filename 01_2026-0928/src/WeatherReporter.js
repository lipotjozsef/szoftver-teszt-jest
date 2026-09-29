class WeatherReporter {
    weatherApi

    constructor(apiObject) {
        this.weatherApi = apiObject
    }

    should_wear_coat() {
        const temperature = this.weatherApi.getTemperature()
        if (temperature < 15)
            return true

        return false
    }
}

module.exports = { WeatherReporter }