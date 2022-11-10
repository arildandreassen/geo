// const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'
const API_BASE_URL = 'https://bkrz3yt5p0.execute-api.us-west-1.amazonaws.com/dev/'


const getCountry = async () => {
    console.log(API_BASE_URL)
    await fetch(API_BASE_URL)
    .then(response => response.json())
    .then(console.log)
}

export {
    getCountry
}