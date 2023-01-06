import * as React from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import {listCountries} from '../../services/countries'
import {Country} from '../../types/types'

function CountrySelection({countryIds, handleCountryClick}:any){
    const {data} = useQuery(
        ['countries'],
        listCountries
    )

    return <div className='grid-item grid-item-2'>{
        countryIds.map((countryId: number) => { 
            const {name} = data.countries.find((country: Country) => Number(country.id) === countryId)
            return  <div key={countryId}>
                        <div className='country-selection' data-country-id={countryId} onClick={handleCountryClick}>{name}</div>
                    </div> 
        })
    }</div>
}

export default CountrySelection