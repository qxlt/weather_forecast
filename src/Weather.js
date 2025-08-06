import React, { useState, useEffect } from 'react';


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

export function Weather( { city } ) {
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
                        <div key={index} className='w-1/2 h-1/2 bg-amber-600 mx-1'>
                            {getDate(item.dt, 2)}, {item.weather[0].main}
                            
                        </div>
                    );
                } else if((index+1) % 8 == 0) {
                    return (
                        <div key={index} className='w-1/6 h-1/4 bg-amber-900 mx-1'>
                            {getDate(item.dt, 2)}
                        </div>
                    );
                }else {
                    return
                }
            })}
        </div>
    );
    
}