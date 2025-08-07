import React, { useState, useEffect } from 'react';
import MockCities from './MockCities.json'



export function SearchCity( { onCitySelect } ) { 

    const [value, setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    }
    
    const onSearch = (searchTerm) => {
        setValue(searchTerm)
        onCitySelect(searchTerm)
        setValue("")
    }

    return(
        <div className='flex justify-center flex-col w-full'>
            {/* search bar */}
            <div className="w-full flex justify-center gap-2 mt-4 mb-1">
                <input
                type="search"
                className="w-1/2 border-2 border-gray-300 px-4 py-2 rounded bg-white assistant-400"
                placeholder="Enter city to check..."
                value={value}
                onChange={onChange}
                />
                <button onClick={()=> onSearch(value)} className="bg-pink-300 assistant-600 text-white text-lg px-4 py-2 rounded hover:bg-blue-400">
                Search
                </button>
            </div>
            {/* dropdown suggestions */}
            { value.length > 0 ? 
                 (<div className='w-full flex flex-rol justify-center gap-2'>
                 <div className='w-1/2 h-auto dropdown overflow-y-scroll flex flex-col bg-white rounded'>
                 {MockCities.filter((city) => {
                     const searchTerm = value.toLowerCase()
                     const city_name = city.name.toLowerCase()
 
                     return city_name.startsWith(searchTerm) && searchTerm
                 }).map((city) => (
                     <div key={city.name} onClick={()=> onSearch(city.name)} className='dropdown-row text-black text-start px-4 hover:bg-blue-500'>{city.name}</div>
                 ))}
                 </div>
                 <button className='px-4 py-2 invisible'>Search</button>
             </div>) : null }

           
      </div>
      
)}

