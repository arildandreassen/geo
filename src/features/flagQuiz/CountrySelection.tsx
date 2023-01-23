import * as React from 'react';
import {Country} from '../../types/types'
import countries from '../../assets/countries/countries.json'

function CountrySelection({countryIds, handleCountryClick}:any){


    return <div className='grid-item grid-item-3'>{
        countryIds.map((countryId: string) => { 
            const {name} = countries.find((country: Country) => country.id === countryId)
            return  <div key={countryId}>
                        <div className='country-selection' data-country-id={countryId} onClick={handleCountryClick}>{name}</div>
                    </div> 
        })
    }</div>
}

export default CountrySelection