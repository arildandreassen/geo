import {config} from '../env/config'

const getCountry = async () => {
    await fetch(config.BASE_URL)
    .then(response => response.json())
    .then(console.log)
}

export {
    getCountry
}