import { config } from "../env/config";

const addHighscore = async (displayName: string, score: number) => {
  const body = { displayName, score };
  await fetch(`${config.BASE_URL}/highscores/`, {
    method: "post",
    body: JSON.stringify(body),
  }).then(async (response) => await response.json());
};

const listHighscores = async (signal: any) =>
  await fetch(`${config.BASE_URL}/highscores`, { signal }).then(
    async (response) => await response.json()
  );

export { addHighscore, listHighscores };
