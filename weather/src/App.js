import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const getDate = (timestamp, key) => {
  const today = new Date(timestamp*1000);
  const month = today.getMonth();
  const date = today.getDate();
  const day = today.getDay();
  const year = today.getFullYear();
  if(key === 1){
    const week = ["Sunday", " Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return week[day];
  }else if(key === 2){
    const monthAbbr = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${date}`+' '+ `${monthAbbr[month]}` + ' ' + `${year}`
  }else{
    return
  }
}

const kelvinToCelsius = (temp) => Math.round(temp - 273.15);


function App() {
  const [location, setLocation] = useState('Toronto')
  const [weather, setWeather] = useState(null);
  const [weatherFC, setweatherFC] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingFC, setLoadingFC] = useState(true);
  const [timestamp, setTimestamp] = useState(null);


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=694772cb6ff5a4c0ddf6574cdc83f8a6`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather(data);
        setTimestamp(JSON.stringify(weather.dt))
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the JSON:', error);
        setLoading(false)
      }
    };
    fetchWeather()
    const fetchWeatherFC = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=694772cb6ff5a4c0ddf6574cdc83f8a6`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setweatherFC(data);
        setLoadingFC(false);
      } catch (error) {
        console.error('Error fetching the JSON:', error);
        setLoading(false)
      }
    };
    fetchWeatherFC()
  }, [location])


    
  
  if (loading || loadingFC) {
    return <div>Loading...</div>; // Display loading while data is fetched
  }
  return (
  
    <div className='weather-container container vw-100 vh-100'>
        <h1 id="title" className='assistant-5=800 title'>Weather Forecast</h1>
        <div className='switch d-flex flex-row justify-content-center'>
          <select onChange={(e) => setLocation(e.target.value)} value={location}>
            <option value="Toronto">Toronto</option>
            <option value="London">London</option>
            <option value="New Delhi">New Delhi</option>
            <option value="Chongqing">Chongqing</option>
            <option value="Shanghai">Shanghai</option>
          </select>
        </div>
        <div className='weather-info container w-75 h-50'>
          <div className='card card-left w-25 h-50'>
            <div className="text-container">
              <h4 className='assistant-400'>{getDate(timestamp, 1)}</h4>
              <h5 className='assistant-500'>{getDate(timestamp, 2)}</h5>
              <a href={"https://www.google.com/search?q="+location} className='assistant-400'>{location}</a>
              <img className="weatherIcon"
              src={"https://openweathermap.org/img/wn/"+JSON.stringify(weather.weather[0].icon).slice(1,-1)+"@2x.png"} />
              <h4 className='assistant-400'>{kelvinToCelsius(JSON.stringify(weather.main.temp))}&#8451;</h4>
              <h5 className='assistant-500'>{JSON.stringify(weather.weather[0].main).slice(1, -1)}</h5>
            </div>
          </div>
          <div className='card card-right w-50 h-50'>
            <div className='info-container'>
                <p className="assistant-600"><strong>Humidity:</strong> {weather.main.humidity}%</p>
                <p className="assistant-600"><strong>Wind Speed:</strong> {weather.wind.speed} meter/sec</p>
                <p className="assistant-600"><strong>Feels Like:</strong> {kelvinToCelsius(weather.main.feels_like)}&#8451;</p>
                <p className="assistant-600"><strong>Highest Degree:</strong> {kelvinToCelsius(weather.main.temp_max)}&#8451;</p>
                <p className="assistant-600"><strong>Lowest Degree:</strong> {kelvinToCelsius(weather.main.temp_min)}&#8451;</p>
            </div>
            <div className="forecast-container d-flex flex-row">
              <div className='batch'>
                <h5 className='assistant-500'>{getDate(JSON.stringify(weatherFC.list[4].dt),1)}</h5>
                <img className="w-50"
                src={"https://openweathermap.org/img/wn/"+JSON.stringify(weatherFC.list[4].weather[0].icon).slice(1,-1)+"@2x.png"} />
              </div>
              <div className='batch'>
                <h5 className='assistant-500'>{getDate(JSON.stringify(weatherFC.list[12].dt),1)}</h5>
                <img className="w-50"
                src={"https://openweathermap.org/img/wn/"+JSON.stringify(weatherFC.list[12].weather[0].icon).slice(1,-1)+"@2x.png"} />
              </div>
              <div className='batch'>
                <h5 className='assistant-500'>{getDate(JSON.stringify(weatherFC.list[20].dt),1)}</h5>
                <img className="w-50"
                src={"https://openweathermap.org/img/wn/"+JSON.stringify(weatherFC.list[20].weather[0].icon).slice(1,-1)+"@2x.png"} />
              </div>
              <div className='batch'>
                <h5 className='assistant-500'>{getDate(JSON.stringify(weatherFC.list[28].dt),1)}</h5>
                <img className="w-50"
                src={"https://openweathermap.org/img/wn/"+JSON.stringify(weatherFC.list[28].weather[0].icon).slice(1,-1)+"@2x.png"} />
              </div>
              <div className='batch'>
                <h5 className='assistant-500'>{getDate(JSON.stringify(weatherFC.list[36].dt),1)}</h5>
                <img className="w-50"
                src={"https://openweathermap.org/img/wn/"+JSON.stringify(weatherFC.list[36].weather[0].icon).slice(1,-1)+"@2x.png"} />
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}

export default App;
