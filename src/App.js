import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './output.css'
import { SearchCity } from './SearchCity.js'
import { Weather } from './Weather.js';

// // main
function App() {
  const [selectedCity, setSelectedCity] = useState('');



  return (
    <div className='flex justify-center flex-col border-2 border-amber-600 h-screen w-screen'>
      <h2 className='text-center py-6 assistant-600'>Weather Forecast</h2>
      <SearchCity onCitySelect={setSelectedCity}/>
      <Weather city={selectedCity} />
    </div>
  )
}

export default App;
