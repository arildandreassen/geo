import * as React from 'react';
import { useEffect,useState, createContext } from 'react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import "./App.css";
import FlagPage from './FlagPage'
import Header from './Header';

import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import HighScores from './HighScores';
import {listCountries} from './utils/api'
// import {CountryContext} from './CountryContext'



function App() {
  // const [countryList, setCountryList] = useState(null)
  // useEffect(() =>{
  //   const getcountries = async () => {
  //     const countryList = await listCountries()
  //     setCountryList(countryList)
  //   }
  //   getcountries()

  //   // const setCountries = async () => {
  //   //   await setCountryList()
  //   //   console.log('getting list')
  //   // }
  //   // setCountries()
  // })
  const queryClient = new QueryClient()
  // const {isError, isSuccess, data} = useQuery(
  //   ['countries'],
  //   listCountries
  // )

  // if(isSuccess){
  //   console.log(data)
  // }

  return <div className="App">
    <Header />
    <QueryClientProvider client={queryClient}>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/highscores" element={<HighScores />}/>
          <Route path='/flags' element={<FlagPage />} />
      </Routes>
    </QueryClientProvider>
  </div>;
}

export default App;
