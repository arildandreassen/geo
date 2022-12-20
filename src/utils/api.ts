import {config} from '../env/config'

const getCountry = async (id: string) => await fetch(`${config.BASE_URL}/countries/${id}`).then(async response => await response.json())

const listCountries = async () => await fetch(`${config.BASE_URL}/countries`).then(async response => await response.json())

export {
    getCountry,
    listCountries
}