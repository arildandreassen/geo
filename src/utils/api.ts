import {config} from '../env/config'

const getCountry = async () => {
    console.log(config.BASE_URL)
    console.log(process.env.NODE_ENV)
    // await fetch(API_BASE_URL)
    // .then(response => response.json())
    // .then(console.log)
}

export {
    getCountry
}