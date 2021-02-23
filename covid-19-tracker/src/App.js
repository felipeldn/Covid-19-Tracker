import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select} from "@material-ui/core";
import InfoBox from "./InfoBox";
import './App.css';

// STATE = How to write a variable in React
  
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  // USE EFFECT = Runs a piece of code base on a given condition

  useEffect(() => {
    // Code in here will run once when component loads and not again
    // async -> send request, wait for it, do something with info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        setCountries(countries);
      });      
    };

    getCountriesData();
  }, []); 

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    console.log("YOOOOOOO >>>", countryCode);

    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} on value={country}>
              {/* {Loop through all countries and show a dropdown list} */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

            </Select>
          </FormControl>
      </div>

      <div className="app_stats">
        <InfoBox title="Coronavirus cases" cases={123} total={2000}/>
        <InfoBox title="Recoveries" cases={1234} total={3000}/>
        <InfoBox title="Deaths" cases={12345} total={4000}/>
        {/* InfoBox title="Coronanvirus cases" */}
        {/* InfoBox title="Coronanvirus recoveries" */}
        {/* InfoBox title="Coronanvirus deaths" */}
      </div>
      
      {/* {Table} */}      
      {/* {Graph} */}
      
      {/* {Map} */}
    </div>
  );
}

export default App;
