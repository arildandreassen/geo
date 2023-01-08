import * as React from 'react';
import {Country} from '../../types/types'

function CountrySelection({countries,countryIds, handleCountryClick}:any){


    return <div className='grid-item grid-item-3'>{
        countryIds.map((countryId: number) => { 
            const {name} = countries.find((country: Country) => Number(country.id) === countryId)
            return  <div key={countryId}>
                        <div className='country-selection' data-country-id={countryId} onClick={handleCountryClick}>{name}</div>
                    </div> 
        })
    }</div>
}

export default CountrySelection