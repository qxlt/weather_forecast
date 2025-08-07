import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';



// timestamp is provided by api, key determines what the format of the time
const getDate = (timestamp, key) => {
    const today = new Date(timestamp*1000);
    const month = today.getMonth();
    const date = today.getDate();
    const day = today.getDay();
    const hours = today.getHours();
    const minutes = today.getMinutes();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const getOrdinal = (n) => {
        if (n >= 11 && n <= 13) return `${n}th`;
        switch (n % 10) {
          case 1: return `${n}st`;
          case 2: return `${n}nd`;
          case 3: return `${n}rd`;
          default: return `${n}th`;
        }
      };

      const dayNames = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
      ]

      // return month + date
      if(key === 0){
        return `${monthNames[month]}`+` `+ `${getOrdinal(date)}`
      }
      // return local time
      else if(key === 1){
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      }
      // return day
      else if(key === 2){
        return dayNames[day]
      }
      else{
        return "issue"
      }

    
  }

const getWeatherIcon = (code) => {
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
};

const tempConverter = (temp) => {
    return Math.round(temp - 273.15)
}


export function Weather( { city, weather } ) {
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        const fetchWeather = async () => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=694772cb6ff5a4c0ddf6574cdc83f8a6`
            );
            if (!response.ok) {
              throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
            weather(data.list[0].weather[0].main)
          } catch (error) {
            console.error('Error fetching the JSON:', error);
          }
        };
      
        fetchWeather();
      }, [city]);
      
      return (
        <div className='w-full h-1/2 self-center flex flex-row justify-center items-center px-24'>
            {weatherData?.list?.map((item, index) => {
                if (index === 0) {
                    return (
                        <div key={index} className='hover:scale-105 w-1/3 h-56 bg-blue-300 rounded-2xl mx-1 flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-center my-2'>
                            <p className='assistant-400 text-xl p-1 rounded-full bg-white'>{getDate(item.dt, 0)} {getDate(item.dt, 1)}</p>
                            <p className='assistant-400 text-lg my-2'> <span className='rounded-2xl bg-blue-100 p-1 '>{tempConverter(item.main.temp)}&deg;C</span> {item.weather[0].main}</p>
                            <p className='assistant-400 text-lg'><span className='text-md'>feels like</span> <span className='rounded-2xl bg-blue-100 p-1'>{tempConverter(item.main.feels_like)}&deg;C</span> | {item.main.humidity}% <FontAwesomeIcon className='text-blue-100' icon={faDroplet} /></p>
                            
                        </div>
                        <img className='w-20 h-20 bg-pink-300 rounded-full' src={getWeatherIcon(item.weather[0].icon)} /> 
                    </div>
                    
                    );
                } else if(index <= 5) {
                    return (
                        <div key={index} className='hover:scale-105 bg-blue-200 w-1/4 h-40 mx-2 rounded-2xl justify-center flex'>
                            <div className='px-5 py-2 flex justify-center items-center flex-col gap-y-1'>
                                <p className="text-lg rounded-2xl bg-white p-1 assistant-400">{getDate(item.dt, 1)} </p>
                                <p className='text-md assistant-400 my-1'><span className='p-1' ></span><span className='rounded-2xl p-1 bg-blue-300'>{tempConverter(item.main.temp_min)}&deg;C~{tempConverter(item.main.temp_max)}&deg;C</span> </p>
                                <img className='w-12 h-12 bg-pink-300 rounded-full' src={getWeatherIcon(item.weather[0].icon)} />
                            </div>     
                        </div>
                    );
                }else {
                    return
                }
            })}
        </div>
    );
    
}