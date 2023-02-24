import { config } from "../env/config";

const addHighscore = async (name: string, score: number) =>
  await fetch(`${config.BASE_URL}/highscores/`, {
    method: "post",
    body: JSON.stringify({ name, score }),
  }).then(async (response) => await response.json());

const listHighscores = async (signal: any) =>
  await fetch(`${config.BASE_URL}/highscores`, { signal }).then(
    async (response) => await response.json()
  );

export { addHighscore, listHighscores };
