import * as React from 'react';
interface Country {
    country: {
        id: string,
        name: string,
        country_code: string
    }
}

function FlagImage({country}: Country){
    const s3Bucket = `https://s3.us-west-1.amazonaws.com/geobrawl.com/flags/`
    const fileExtension = 'svg'
    const flagImage = `${country.country_code}`
    return <div className='grid-item grid-item-2'><img alt='country-flag'
    style={{height:'400px', border:'1px solid black'}}
    src={`${s3Bucket}${flagImage}.${fileExtension}`} 
    /></div>
}


export default FlagImage