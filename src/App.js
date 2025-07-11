import { Oval } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faSun, faMoon, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function GfGWeatherApp() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    });

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const toDateFunction = () => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        const WeekDays = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        ];
        const currentDate = new Date();
        return `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    };

    const search = async (event) => {
        if (event.key === 'Enter') {
            await fetchWeatherByCity(input);
        }
    };

    const fetchWeatherByCity = async (city) => {
        setWeather({ ...weather, loading: true });
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

        try {
            const res = await axios.get(url, {
                params: {
                    q: city,
                    units: 'metric',
                    appid: api_key,
                },
            });
            setWeather({ data: res.data, loading: false, error: false });
        } catch (error) {
            setWeather({ ...weather, data: {}, error: true, loading: false });
            setInput('');
        }
    };

    const fetchWeatherByLocation = () => {
        if (navigator.geolocation) {
            setWeather({ ...weather, loading: true });

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = 'https://api.openweathermap.org/data/2.5/weather';
                    const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

                    try {
                        const res = await axios.get(url, {
                            params: {
                                lat: latitude,
                                lon: longitude,
                                units: 'metric',
                                appid: api_key,
                            },
                        });
                        setWeather({ data: res.data, loading: false, error: false });
                    } catch (error) {
                        console.log("API error:", error);
                        setWeather({ ...weather, data: {}, error: true, loading: false });
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error.code, error.message);
                    let message = "Unable to fetch your location.";
                    if (error.code === 1) {
                        message = "Permission denied. Please allow location access in your browser settings.";
                    } else if (error.code === 2) {
                        message = "Location information is unavailable.";
                    } else if (error.code === 3) {
                        message = "Location request timed out.";
                    }
                    alert(`${message} (${error.message})`);
                    setWeather({ ...weather, data: {}, error: true, loading: false });
                },
                { timeout: 10000 }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
            setWeather({ ...weather, loading: false });
        }
    };

    return (
        <div className="App">
            <h1 className="app-name">SkyCast Weather App</h1>

            {/* Theme & Location Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <button onClick={toggleTheme}>
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} /> {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button onClick={fetchWeatherByLocation} disabled={weather.loading}>
                    <FontAwesomeIcon icon={faLocationArrow} /> {weather.loading ? 'Fetching...' : 'Use Current Location'}
                </button>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Enter City Name..."
                    name="query"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={search}
                />
            </div>

            {weather.loading && (
                <>
                    <br />
                    <br />
                    <Oval type="Oval" color="black" height={100} width={100} />
                </>
            )}

            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                        <FontAwesomeIcon icon={faFrown} /> <span style={{ fontSize: '20px' }}>City not found or location error</span>
                    </span>
                </>
            )}

            {weather && weather.data && weather.data.main && (
                <div>
                    <div className="city-name">
                        <h2>{weather.data.name}, <span>{weather.data.sys.country}</span></h2>
                    </div>
                    <div className="date"><span>{toDateFunction()}</span></div>
                    <div className="icon-temp">
                        <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt={weather.data.weather[0].description} />
                        {Math.round(weather.data.main.temp)}<sup className="deg">°C</sup>
                    </div>
                    <div className="des-wind">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {weather.data.wind.speed} m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GfGWeatherApp;
