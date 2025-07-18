
// import { Oval } from 'react-loader-spinner';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFrown, faSun, faMoon, faLocationArrow, faSearch } from '@fortawesome/free-solid-svg-icons';
// import './App.css';

// function WeatherApp() {
//     const [input, setInput] = useState('');
//     const [weather, setWeather] = useState({ loading: false, data: {}, error: false });
//     const [darkMode, setDarkMode] = useState(false);
//     const [bgClass, setBgClass] = useState('default-bg');

//     useEffect(() => {
//         document.body.className = `${darkMode ? 'dark' : ''} full-background ${bgClass}`.trim();
//     }, [darkMode, bgClass]);

//     const toggleTheme = () => setDarkMode(!darkMode);

//     const toDateFunction = () => {
//         const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//         const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//         const currentDate = new Date();
//         return `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
//     };

//     const getWeatherClass = (main) => {
//         switch (main.toLowerCase()) {
//             case 'clear': return 'clear-bg';
//             case 'clouds': return 'cloudy-bg';
//             case 'rain':
//             case 'drizzle': return 'rainy-bg';
//             case 'thunderstorm': return 'thunder-bg';
//             case 'snow': return 'snow-bg';
//             case 'mist':
//             case 'haze':
//             case 'fog': return 'mist-bg';
//             default: return 'default-bg';
//         }
//     };

//     const fetchWeatherByCity = async (city) => {
//         setWeather({ ...weather, loading: true });
//         const url = 'https://api.openweathermap.org/data/2.5/weather';
//         const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

//         try {
//             const res = await axios.get(url, {
//                 params: {
//                     q: city,
//                     units: 'metric',
//                     appid: api_key,
//                 },
//             });
//             const mainWeather = res.data.weather[0].main;
//             setBgClass(getWeatherClass(mainWeather));
//             setWeather({ data: res.data, loading: false, error: false });
//         } catch (error) {
//             setWeather({ ...weather, data: {}, error: true, loading: false });
//             setInput('');
//         }
//     };

//     const fetchWeatherByLocation = () => {
//         if (navigator.geolocation) {
//             setWeather({ ...weather, loading: true });

//             navigator.geolocation.getCurrentPosition(
//                 async (position) => {
//                     const { latitude, longitude } = position.coords;
//                     const url = 'https://api.openweathermap.org/data/2.5/weather';
//                     const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

//                     try {
//                         const res = await axios.get(url, {
//                             params: {
//                                 lat: latitude,
//                                 lon: longitude,
//                                 units: 'metric',
//                                 appid: api_key,
//                             },
//                         });
//                         const mainWeather = res.data.weather[0].main;
//                         setBgClass(getWeatherClass(mainWeather));
//                         setWeather({ data: res.data, loading: false, error: false });
//                     } catch (error) {
//                         setWeather({ ...weather, data: {}, error: true, loading: false });
//                     }
//                 },
//                 (error) => {
//                     let message = "Unable to fetch your location.";
//                     if (error.code === 1) message = "Permission denied. Please allow location access.";
//                     else if (error.code === 2) message = "Location unavailable.";
//                     else if (error.code === 3) message = "Location request timed out.";
//                     alert(`${message} (${error.message})`);
//                     setWeather({ ...weather, data: {}, error: true, loading: false });
//                 },
//                 { timeout: 10000 }
//             );
//         } else {
//             alert("Geolocation is not supported by your browser.");
//             setWeather({ ...weather, loading: false });
//         }
//     };

//     return (
//         <div className="App">
//             <h1 className="app-name">SkyCast Weather App</h1>

//             <div className="top-buttons">
//                 <button onClick={toggleTheme}>
//                     <FontAwesomeIcon icon={darkMode ? faSun : faMoon} /> {darkMode ? 'Light Mode' : 'Dark Mode'}
//                 </button>
//                 <button onClick={fetchWeatherByLocation} disabled={weather.loading}>
//                     <FontAwesomeIcon icon={faLocationArrow} /> {weather.loading ? 'Fetching...' : 'Use Current Location'}
//                 </button>
//             </div>

//             <div className="search-bar">
//                 <input
//                     type="text"
//                     className="city-search"
//                     placeholder="Enter City Name..."
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                 />
//                 <button className="search-button" onClick={() => fetchWeatherByCity(input)}>
//                     <FontAwesomeIcon icon={faSearch} />
//                 </button>
//             </div>

//             {weather.loading && (
//                 <div className="Loader"><Oval color="black" height={80} width={80} /></div>
//             )}

//             {weather.error && (
//                 <div className="error-message">
//                     <FontAwesomeIcon icon={faFrown} /> City not found or location error
//                 </div>
//             )}

//             {weather?.data?.main && (
//                 <div className="weather-info">
//                     <div className="city-name">
//                         <h2>{weather.data.name}, <span>{weather.data.sys.country}</span></h2>
//                     </div>
//                     <div className="date"><span>{toDateFunction()}</span></div>
//                     <div className="icon-temp">
//                         <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="weather" />
//                         {Math.round(weather.data.main.temp)}<sup className="deg">°C</sup>
//                     </div>
//                     <div className="des-wind">
//                         <p>{weather.data.weather[0].description.toUpperCase()}</p>
//                         <p>Wind Speed: {weather.data.wind.speed} m/s</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default WeatherApp;



import { Oval } from 'react-loader-spinner';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faSun, faMoon, faLocationArrow, faSearch, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
// const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';
const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';
function WeatherApp() {
    const [input, setInput] = useState('');
    const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
    const [weather, setWeather] = useState({ loading: false, data: {}, error: false });
    const [darkMode, setDarkMode] = useState(false);
    const [bgClass, setBgClass] = useState('default-bg');

    // Apply theme and background class to body
    useEffect(() => {
        document.body.className = `${darkMode ? 'dark' : ''} full-background ${bgClass}`.trim();
    }, [darkMode, bgClass]);

    const toggleTheme = () => setDarkMode(!darkMode);
    const toggleUnit = () => setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));

    const today = useMemo(() => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date();
        return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
    }, []);

    const getWeatherClass = (main) => {
        switch (main.toLowerCase()) {
            case 'clear': return 'clear-bg';
            case 'clouds': return 'cloudy-bg';
            case 'rain':
            case 'drizzle': return 'rainy-bg';
            case 'thunderstorm': return 'thunder-bg';
            case 'snow': return 'snow-bg';
            case 'mist':
            case 'haze':
            case 'fog': return 'mist-bg';
            default: return 'default-bg';
        }
    };

    const fetchWeather = async (params) => {
        setWeather({ ...weather, loading: true, error: false });
        try {
            const res = await axios.get(API_URL, {
                params: {
                    ...params,
                    units: unit,
                    appid: API_KEY
                }
            });
            const mainWeather = res.data.weather[0].main;
            setBgClass(getWeatherClass(mainWeather));
            setWeather({ data: res.data, loading: false, error: false });
        } catch (error) {
            setWeather({ data: {}, loading: false, error: true });
        }
    };

    const fetchWeatherByCity = () => {
        if (!input.trim()) {
            alert("Please enter a valid city name.");
            return;
        }
        fetchWeather({ q: input.trim() });
        setInput('');
    };

    const fetchWeatherByLocation = () => {
        if (navigator.geolocation) {
            setWeather({ ...weather, loading: true, error: false });
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather({ lat: latitude, lon: longitude });
                },
                (error) => {
                    let message = "Unable to fetch your location.";
                    if (error.code === 1) message = "Permission denied. Please allow location access.";
                    else if (error.code === 2) message = "Location unavailable.";
                    else if (error.code === 3) message = "Location request timed out.";
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

            <div className="top-buttons">
                <button onClick={toggleTheme}>
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} /> {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button onClick={toggleUnit}>
                    <FontAwesomeIcon icon={faTemperatureHigh} /> {unit === 'metric' ? '°C' : '°F'}
                </button>
                <button onClick={fetchWeatherByLocation} disabled={weather.loading}>
                    <FontAwesomeIcon icon={faLocationArrow} /> {weather.loading ? 'Fetching...' : 'Use Current Location'}
                </button>
            </div>

            <div className="search-bar">
                <input
                    aria-label="City name"
                    type="text"
                    className="city-search"
                    placeholder="Enter City Name..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="search-button" onClick={fetchWeatherByCity} disabled={weather.loading}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            {weather.loading && (
                <div className="Loader"><Oval color="black" height={80} width={80} /></div>
            )}

            {weather.error && (
                <div className="error-message">
                    <FontAwesomeIcon icon={faFrown} /> City not found or location error
                </div>
            )}

            {weather?.data?.main && (
                <div className="weather-info">
                    <div className="city-name">
                        <h2>{weather.data.name}, <span>{weather.data.sys.country}</span></h2>
                    </div>
                    <div className="date"><span>{today}</span></div>
                    <div className="icon-temp">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                            alt="weather"
                        />
                        {Math.round(weather.data.main.temp)}<sup className="deg">°{unit === 'metric' ? 'C' : 'F'}</sup>
                    </div>
                    <div className="des-wind">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {weather.data.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
