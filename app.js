const API_Key = "01b1e5f656cf4d628bb184345262007";

const base_url = "https://api.weatherapi.com/v1/forecast.json?";

// navbar
const userInput = document.querySelector("#user-input");
const searchBtn = document.querySelector("#serch-btn");
const themeToggle = document.querySelector(".theme-toggle");

// main card
// right
const city = document.querySelector("#city");
const day = document.querySelector("#day");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const currTemp = document.querySelector("#current-temp");
const currText = document.querySelector("#current-text");
const feelsLike = document.querySelector("#feels-like");
const weatherIconContainer = document.querySelector("#weather-icon-container");
// left
const highTemp = document.querySelector("#high-temp");
const lowTemp = document.querySelector("#low-temp");
const windSpeed = document.querySelector("#wind-speed");
const humidityContent = document.querySelector("#humidity-content");
const atmPressure = document.querySelector("#atm-pressure");
const VisibleDistance = document.querySelector("#visible-distance");

// other-stats stip
const sunriseTime = document.querySelector("#sunrise-time");
const sunsetTime = document.querySelector("#sunset-time");
const uvValue = document.querySelector("#UV-value");
const aqiRange = document.querySelector("#aqi-range");
const aqiText = document.querySelector("#aqi-text");

// Forecast
const forecastDays = [];
const forecastDates = [];
const forecastMaxTemps = [];
const forecastMinTemps = [];

for (let i = 1; i <= 7; i++) {
    forecastDays.push(document.querySelector(`#day${i}`));
    forecastDates.push(document.querySelector(`#date${i}`));
    forecastMaxTemps.push(document.querySelector(`#max${i}`));
    forecastMinTemps.push(document.querySelector(`#min${i}`));
}

//------------------------------------------Initial Page------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
    getWeather("Chandigarh");
});

window.addEventListener("load", () => {
    setTimeout(() => {
        userInput.focus();
    }, 1000);
});

//--------------------------------------------Theme---------------------------------------------

themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    const switchingToLight = html.getAttribute("data-theme") !== "light";

    if (switchingToLight) {
        html.setAttribute("data-theme", "light");
    } else {
        html.removeAttribute("data-theme");
    }
});

//--------------------------------------------Main JS---------------------------------------------

searchBtn.addEventListener("click", () => getWeather());
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();

    }
})

async function getWeather(cityName = userInput.value.trim()) {

    if (!cityName) {
        alert("Please Enter City Name");
        return;
    }

    const url = `${base_url}key=${API_Key}&q=${cityName}&days=8&aqi=yes&alerts=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.error) {
            alert(data.error.message);
            return;
        }

        changeMainCardDetails(data);
        changeOtherStats(data);
        updateClock(data);
        updateCurrWeather(data);
        updateWeatherIcon(data);

        userInput.value = "";

        for (let i = 1; i <= 7; i++) {
            updateForecastDay(data, i);
        }
    }

    catch (error) {
        console.error(error);
        alert("Unable to featch Weather data.")
    }

}

//----------------------------------------Main Card Right----------------------------------------

changeMainCardDetails = (data) => {
    city.innerText = `${data.location.name}, ${data.location.country}`;
    highTemp.innerHTML = Math.round(data.forecast.forecastday[0].day.maxtemp_c) + "°C";
    lowTemp.innerHTML = Math.round(data.forecast.forecastday[0].day.mintemp_c) + "°C";
    windSpeed.innerHTML = Math.round(data.current.wind_kph) + " km/h";
    humidityContent.innerHTML = data.current.humidity + " %";
    atmPressure.innerHTML = data.current.pressure_mb + " mb";
    VisibleDistance.innerText = data.current.vis_km + " km";
}

//----------------------------------------Main Card Left----------------------------------------


updateClock = (data) => {
    const cityTime = new Date(data.location.localtime); //Built in Date Object of JS

    day.innerText = cityTime.toLocaleDateString("en-US", {
        weekday: "long",
    }) + ",";

    date.innerText = cityTime.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    time.innerText = cityTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

updateCurrWeather = (data) => {
    const currentHour = new Date(data.location.localtime).getHours();
    const hourlyData = data.forecast.forecastday[0].hour[currentHour];
    const hourlyTemp = hourlyData.temp_c;
    currTemp.innerText = Math.round(hourlyTemp) + "°C"

    currText.innerText = hourlyData.condition.text;
    feelsLike.innerText = `Feels like ${Math.round(data.current.feelslike_c)}`;
}

function getWeatherIcon(code, isDay) {

    if (weatherIcons.clear.includes(code)) {
        return isDay ? "assets/icons/clear-day.svg" : "assets/icons/clear-night.svg";
    }

    if (weatherIcons.partlyCloudy.includes(code)) {
        return isDay ? "assets/icons/partly-cloudy-day.svg" : "assets/icons/partly-cloudy-night.svg";
    }

    if (weatherIcons.cloudy.includes(code))
        return "assets/icons/cloudy.svg";

    if (weatherIcons.fog.includes(code))
        return "assets/icons/fog.svg";

    if (weatherIcons.haze.includes(code))
        return "assets/icons/haze.svg";

    if (weatherIcons.drizzle.includes(code))
        return "assets/icons/drizzle.svg";

    if (weatherIcons.rain.includes(code))
        return "assets/icons/rain.svg";

    if (weatherIcons.snow.includes(code))
        return "assets/icons/snow.svg";

    if (weatherIcons.sleet.includes(code))
        return "assets/icons/sleet.svg";

    if (weatherIcons.hail.includes(code))
        return "assets/icons/hail.svg";

    if (weatherIcons.thunderstorm.includes(code))
        return "assets/icons/thunderstorm.svg";

    return "assets/icons/unknown.svg";
}

async function updateWeatherIcon(data) {
    const code = data.current.condition.code;
    const isDay = data.current.is_day;

    const iconPath = getWeatherIcon(code, isDay);

    const response = await fetch(iconPath);
    const svg = await response.text();

    weatherIconContainer.innerHTML = svg;
}




//-------------------------------------other-stats Stip------------------------------------


changeOtherStats = (data) => {
    sunriseTime.innerText = data.forecast.forecastday[0].astro.sunrise;
    sunsetTime.innerText = data.forecast.forecastday[0].astro.sunset;
    uvValue.innerText = data.current.uv;

    const epaIndex = data.current.air_quality["us-epa-index"]
    const aqi = aqiLevels[epaIndex]
    aqiRange.innerText = aqi.range;
    aqiText.innerText = aqi.text;
    aqiText.style.color = aqi.color;
    // aqiRange.style.color = aqi.color;

}

//---------------------------------------Forecast---------------------------------------

function updateForecastDay(data, index) {
    const forecast = data.forecast.forecastday[index];
    const forecastDateObject = new Date(forecast.date);

    forecastDays[index - 1].innerText = forecastDateObject.toLocaleDateString("en-US", {
        weekday: "short",
    });

    forecastDates[index - 1].innerText = forecastDateObject.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
    });

    forecastMaxTemps[index - 1].innerText = Math.round(forecast.day.maxtemp_c) + "°C";
    forecastMinTemps[index - 1].innerText = Math.round(forecast.day.mintemp_c) + "°C";
}

//--------------------------------------Miscleanenous--------------------------------------

const aqiLevels = {
    1: {
        text: "Good",
        color: "#00E400",
        range: "0 - 50"
    },
    2: {
        text: "Moderate",
        color: "#d6d62c",
        range: "51 - 100"
    },
    3: {
        text: "Unhealthy for Sensitive Groups",
        color: "#FF7E00",
        range: "101 - 150"
    },
    4: {
        text: "Unhealthy",
        color: "#FF0000",
        range: "151 - 200"
    },
    5: {
        text: "Very Unhealthy",
        color: "#8F3F97",
        range: "201 - 300"
    },
    6: {
        text: "Hazardous",
        color: "#7E0023",
        range: "301 - 500"
    }
};


const weatherIcons = {
    clear: [1000],

    partlyCloudy: [1003],

    cloudy: [1006, 1009],

    fog: [1030, 1135, 1147],

    haze: [1012, 1036, 1015],

    drizzle: [1072, 1150, 1153, 1168, 1171],

    rain: [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246],

    snow: [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258],

    sleet: [1069, 1204, 1207, 1249, 1252],

    hail: [1237, 1261, 1264],

    thunderstrom: [1087, 1273, 1276, 1279, 1282],

};
