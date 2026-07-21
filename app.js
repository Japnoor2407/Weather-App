const API_Key = "01b1e5f656cf4d628bb184345262007";

const base_url = "http://api.weatherapi.com/v1/forecast.json?";

// navbar
const userInput = document.querySelector("#user-input");
const searchbtn = document.querySelector("#serch");

// main card
// right
const city = document.querySelector("#city");
const day = document.querySelector("#day");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
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


// ------------------------------------Main JS---------------------------------------------

let cityName;

searchbtn.addEventListener("click", getWeather);
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
})

async function getWeather() {
    cityName = userInput.value.trim();

    if (cityName === "") {
        alert("Please Enter City Name");
        return;
    }

    const url = `${base_url}key=${API_Key}&q=${cityName}&days=8&aqi=yes&alerts=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        changeMainCard(data);
        changeOtherStats(data);
    }

    catch (error) {
        console.error(error);
        alert("Unable to featch Weather data")
    }

}

// ------------------------------------other functions-------------------------------------


changeMainCard = (data) => {
    // city.innerText = cityName.toUpperCase();
    city.innerText = data.location.name;
    highTemp.innerHTML = Math.round(data.forecast.forecastday[0].day.maxtemp_c) + "°C";
    lowTemp.innerHTML = Math.round(data.forecast.forecastday[0].day.mintemp_c) + "°C";
    windSpeed.innerHTML = Math.round(data.current.wind_kph) + " km/h";
    humidityContent.innerHTML = data.current.humidity + " %";
    atmPressure.innerHTML = data.current.pressure_mb + " mb";
    VisibleDistance.innerText = data.current.vis_km + " km";
}

changeOtherStats = (data) => {
    sunriseTime.innerText = data.forecast.forecastday[0].astro.sunrise;
    sunsetTime.innerText = data.forecast.forecastday[0].astro.sunset;
    uvValue.innerText = data.current.uv;

    const epaIndex = data.current.air_quality["us-epa-index"]
    const aqi = aqiLevels[epaIndex]
    aqiRange.innerText = aqi.range;
    aqiRange.style.color = aqi.color;
    
}

const aqiLevels = {
    1: {
        text: "Good",
        color: "#00E400",
        range: "0-50"
    },
    2: {
        text: "Moderate",
        color: "#FFFF00",
        range: "51-100"
    },
    3: {
        text: "Unhealthy for Sensitive Groups",
        color: "#FF7E00",
        range: "101-150"
    },
    4: {
        text: "Unhealthy",
        color: "#FF0000",
        range: "151-200"
    },
    5: {
        text: "Very Unhealthy",
        color: "#8F3F97",
        range: "201-300"
    },
    6: {
        text: "Hazardous",
        color: "#7E0023",
        range: "301-500"
    }
};










































// | us-epa-index | Air Quality                    |
// | ------------ | ------------------------------ |
// | 1            | Good                           |
// | 2            | Moderate                       |
// | 3            | Unhealthy for Sensitive Groups |
// | 4            | Unhealthy                      |
// | 5            | Very Unhealthy                 |
// | 6            | Hazardous                      |
