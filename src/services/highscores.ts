import {config} from '../env/config'

const addHighscore = async (name: string, score:number) => await fetch(`${config.BASE_URL}/highscores/`, {method: 'post', body: JSON.stringify({name,score})}).then(async response => await response.json())

const listHighscores = async () => await fetch(`${config.BASE_URL}/highscores`).then(async response => await response.json())

export {
    addHighscore,
    listHighscores
}