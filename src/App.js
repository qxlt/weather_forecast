import React, { useState, useEffect } from 'react';
import './output.css'
import { SearchCity } from './SearchCity.js'
import { Weather } from './Weather.js';
import { Navigation } from './Navigation.js';
import MockCities from './MockCities.json'
import Cloudy from "./assets/cloudy-day.mp4"
import Rainy from "./assets/rainy.mp4"
import Clear from "./assets/sunny-day.mp4"
import Other from "./assets/moon-night.mp4"


// // main
function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState("")
  console.log("Raw weather value:12", weather, "34");


  const backgroundShift = () => {
    const weatherProcessed = weather?.toLowerCase().trim();
  
    if (weatherProcessed === "clouds") {
      return Cloudy;
    } else if (weatherProcessed === "rain" || weatherProcessed === "snow") {
      return Rainy;
    } else if (weatherProcessed === "clear") {
      return Clear;
    } else {
      return Other;
    }
  };
  useEffect(() => {
    if (!selectedCity) {
      const randomIndex = Math.floor(Math.random() * MockCities.length);
      setSelectedCity(MockCities[randomIndex].name);
    }
    backgroundShift()
    
  }, [selectedCity]);
  

  return (
    <div className='h-screen w-screen flex justify-center flex-col'>
      <Navigation />
      <div className='flex justify-center flex-col gap-y-15'>
      <div className='relative w-2/3 self-center h-24 rounded-2xl overflow-hidden'>
        <video key={backgroundShift()} className='w-full h-full object-cover ' autoPlay muted loop>
          <source src={backgroundShift()} type='video/mp4' />
        </video>
        
        <h2 className='assistant-400 absolute inset-0 flex items-center justify-center text-white text-xl font-semibold bg-black/30'>
          Exploring... {selectedCity}
        </h2>
      </div>

        <SearchCity onCitySelect={setSelectedCity}/>
        <Weather city={selectedCity} weather={setWeather} />
      </div>
    </div>
    
  )
}

export default App;
