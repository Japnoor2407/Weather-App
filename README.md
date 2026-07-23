# 🌤️ SkyCast - Weather at Your Glance

SkyCast is a modern, responsive weather application built using **HTML, CSS, and JavaScript**. It provides real-time weather information, a 7-day forecast, air quality data, sunrise/sunset timings, and a beautiful dark/light theme with animated weather icons.

---

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Current temperature and weather conditions
- 🕒 Live local date and time of the searched city
- 📅 7-Day weather forecast
- 🌅 Sunrise & Sunset timings
- 💨 Wind speed
- 💧 Humidity
- 🌫️ Visibility
- 📈 Atmospheric pressure
- ☀️ UV Index
- 🌍 Air Quality Index (AQI)
- 🌙 Light/Dark theme toggle
- 🎨 Animated SVG weather icons
- 📱 Fully responsive design

---

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6)
- WeatherAPI
- Font Awesome
- Meteocons

---

## 📂 Project Structure

```
SkyCast/
│
├── assets/
│   ├── icons/
│   ├── images/
│   ├── screenshots/
│
├── app.js
├── final.css
├── index.html
└── README.md
```

---

## ⚙️ API Used

This project uses the **WeatherAPI Forecast API**.

Website:

https://www.weatherapi.com/

Endpoint:

```
https://api.weatherapi.com/v1/forecast.json
```

Example Request

```
https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=London&days=8&aqi=yes&alerts=no
```

---

## 📊 Information Displayed

### Current Weather

- City
- Country
- Current Temperature
- Weather Condition
- Feels Like Temperature

### Weather Details

- Maximum Temperature
- Minimum Temperature
- Wind Speed
- Humidity
- Atmospheric Pressure
- Visibility

### Other Statistics

- Sunrise
- Sunset
- UV Index
- Air Quality Index

### Forecast

- Next 7 Days
- Date
- Day
- Maximum Temperature
- Minimum Temperature

---

## 🌈 Theme Support

SkyCast supports both

- 🌙 Dark Theme
- ☀️ Light Theme

The application switches themes instantly using CSS variables and JavaScript.

---

## 🎨 Weather Icons

SkyCast uses custom animated SVG weather icons instead of the default WeatherAPI icons.

Weather conditions are mapped using WeatherAPI condition codes.

Examples:

| Condition | Icon |
|-----------|------|
| Clear | ☀️ |
| Partly Cloudy | 🌤️ |
| Cloudy | ☁️ |
| Rain | 🌧️ |
| Drizzle | 🌦️ |
| Snow | ❄️ |
| Fog | 🌫️ |
| Thunderstorm | ⛈️ |
| Hail | 🧊 |
| Sleet | 🌨️ |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/skycast.git
```

### 2. Open the project

Simply open

```
index.html
```

in your browser.

---

## 🔑 API Key

Replace the API key inside **app.js**

```javascript
const API_Key = "YOUR_API_KEY";
```

You can get a free API key from

https://www.weatherapi.com/

---

## 📷 Screenshots

### Dark Theme

<p align="center">
  <img src="/assets/screenshots/dark-theme.png" width="45%">
</p>

### Light Theme

<p align="center">
  <img src="/assets/screenshots/light-theme.png" width="45%">
</p>

---

## 🔮 Future Improvements

- 📍 Current Location Weather (Geolocation API)
- 🌧️ Hourly Forecast
- 📊 Weather Charts
- ⭐ Favorite Cities
- 🌎 Multiple Unit Support (°C / °F)
- 🌦️ Weather Alerts
- 🛰️ Radar Map
- 🌍 Multi-language Support

---

## 👨‍💻 Author

**Japnoor Singh**

B.Tech Computer Science Engineering (AI & ML)

---

## ⭐ Support

If you like this project,

⭐ Star the repository

and feel free to contribute!