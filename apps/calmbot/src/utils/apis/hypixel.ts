import axios from "axios";
import invariant from "tiny-invariant";

export interface Player {
  uuid: string;
  playername: string;
  socialMedia?: {
    links: {
      DISCORD?: string;
    };
  };
}

export const getPlayer = (uuid: string): Promise<Player | undefined> => {
  invariant(process.env.HYPIXEL_API_KEY, "HYPIXEL_API_KEY env variable not defined");
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.hypixel.net/player?key=${process.env.HYPIXEL_API_KEY}&uuid=${uuid}`)
      .then((res) => {
        resolve(res.data?.player ?? null);
      })
      .catch(reject);
  });
};

interface Guild {
  name: string;
  members: { uuid: string; joined: number; expHistory: { [key: string]: number } }[];
}

export const getGuild = (name: string): Promise<Guild | undefined> => {
  invariant(process.env.HYPIXEL_API_KEY, "HYPIXEL_API_KEY env variable not defined");
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.hypixel.net/guild?key=${process.env.HYPIXEL_API_KEY}&name=${name}`)
      .then((res) => {
        resolve(res.data?.guild ?? undefined);
      })
      .catch(reject);
  });
};
