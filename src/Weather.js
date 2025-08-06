import React, { useState, useEffect } from 'react';


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


export function Weather( { city } ) {
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        const fetchWeather = async () => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=`
            );
            if (!response.ok) {
              throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
            console.log(data);
          } catch (error) {
            console.error('Error fetching the JSON:', error);
          }
        };
      
        fetchWeather();
      }, [city]);
      
      return (
        <div className='w-3/4 h-1/2 self-center flex flex-row justify-center items-center'>
            {weatherData?.list?.map((item, index) => {
                if (index === 0) {
                    return (
                        <div key={index} className='w-1/3 h-1/2 bg-blue-300 rounded mx-1 flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-center'>
                            <p className='assistant-600 text-2xl m-0 p-0'>{getDate(item.dt, 0)}</p>
                            <p className='assistant-600 text-lg m-0 p-0'>{getDate(item.dt, 2)} {getDate(item.dt, 1)}</p>
                            <p className='assistant-600 text-lg m-0 p-0'>{item.weather[0].main}</p>
                        </div>
                        <img className='w-24 h-24 bg-pink-300 rounded-full' src={getWeatherIcon(item.weather[0].icon)} /> 
                    </div>
                    
                    );
                } else if(index <= 5) {
                    return (
                        <div key={index} className='w-1/6 h-1/4 border-2 mx-1 flex justify-center items-center'>
                            <p>{getDate(item.dt, 1)}</p>
                            <p>{tempConverter(item.main.temp)}&deg;C</p>
                            <img className='w-24 h-24 bg-pink-300 rounded-full' src={getWeatherIcon(item.weather[0].icon)} />
                        </div>
                    );
                }else {
                    return
                }
            })}
        </div>
    );
    
}