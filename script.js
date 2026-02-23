
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feels-like");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const suggestionText = document.getElementById("suggestion-text");
const errorMessage = document.getElementById("error-message");

const apiKey = "16a7c32eeb28f51c39a45dc677008d08"; // 🔥 Replace this

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    errorMessage.textContent = "";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        updateWeatherUI(data);

    } catch (error) {
        errorMessage.textContent = "City not found. Please try again.";
    }
}

function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    feelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like)}°C`;
    condition.textContent = `Condition: ${data.weather[0].main}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;

    generateSuggestion(data.main.temp, data.weather[0].main);
}

function generateSuggestion(temp, weatherCondition) {
    if (weatherCondition.toLowerCase().includes("rain")) {
        suggestionText.textContent = "It might rain ☔ Take an umbrella!";
    } 
    else if (temp > 35) {
        suggestionText.textContent = "Very hot 🔥 Avoid going out in peak hours.";
    } 
    else if (temp >= 20 && temp <= 30) {
        suggestionText.textContent = "Weather is pleasant 😊 Great time to go out!";
    } 
    else if (temp < 15) {
        suggestionText.textContent = "It's cold ❄ Wear warm clothes.";
    } 
    else {
        suggestionText.textContent = "Check weather conditions before heading out.";
    }
}
