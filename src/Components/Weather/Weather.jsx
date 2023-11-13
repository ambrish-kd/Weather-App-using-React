import React, { useState } from 'react'
import "./Weather.css"

const Weather = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherIcon, setWeatherIcon] = useState("./images/clear.png")
    
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === "") {
            return 0
        }
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        const response = await fetch(url)
        const data = await response.json()
        
        const humidity = document.getElementsByClassName("humidity-percent")
        const wind = document.getElementsByClassName("wind-rate")
        const temprature = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")
        
        humidity[0].innerHTML = `${Math.floor(data.main.humidity)}%`
        wind[0].innerHTML = `${Math.floor(data.wind.speed)} km/h`
        temprature[0].innerHTML = `${Math.floor(data.main.temp)}°c`
        location[0].innerHTML = `${data.name}`
        
        if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWeatherIcon("./images/cloud.png")
        } else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWeatherIcon("./images/drizzle.png")
        } else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n" || data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWeatherIcon("./images/rain.png")
        } else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWeatherIcon("./images/snow.png")
        } else {
            setWeatherIcon("./images/clear.png")
        }
    }
    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className='cityInput' placeholder='Search city' />
                <div className="search-icon" onClick={() => {search()}}>
                    <img src="./images/search.png" alt=" " />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherIcon} alt=" " />
            </div>
            <div className="weather-temp">0°c</div>
            <div className="weather-location">City Name</div>
            <div className="data-container">
                <div className="element">
                    <img src="./images/humidity.png" alt=" " className="icon" />
                    <div className="data">
                        <div className="humidity-percent">0%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src="./images/wind.png" alt=" " className="icon" />
                    <div className="data">
                        <div className="wind-rate">0 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather