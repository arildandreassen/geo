const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://bkrz3yt5p0.execute-api.us-west-1.amazonaws.com/dev/'

const getCountry = async () => {
    await fetch(API_BASE_URL)
    .then(response => response.json())
    .then(console.log)
}

export {
    getCountry
}