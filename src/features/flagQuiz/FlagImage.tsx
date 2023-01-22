import * as React from 'react';

interface Country {
    country: {
        id: string,
        name: string,
        country_code: string
    }
}

function FlagImage({country}: Country){
    const fileExtension = 'svg'
    const flagImage = `${country.country_code}`
    const flag = require(`../../assets/flags/${flagImage}.${fileExtension}`)
    return <div className='grid-item grid-item-2'><img alt='country-flag'
    style={{height:'400px', border:'1px solid black'}}
    src={`${flag}`} 
    /></div>
}


export default FlagImage