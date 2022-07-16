import axios from "axios";
import { Collection } from "discord.js";

const uuidFromNameCache: Collection<string, string> = new Collection();

export default function getUUIDFromName(name: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const cached = uuidFromNameCache.get(name.toLowerCase());
    if (cached) resolve(cached);

    axios
      .get(`https://api.mojang.com/users/profiles/minecraft/${name}`)
      .then((res) => {
        if (res.data?.id) {
          uuidFromNameCache.set(name, res.data.id);
          setTimeout(() => uuidFromNameCache.delete(name), 1000 * 60 * 15); // 15 minute timeout

          resolve(res.data.id);
        }
        resolve(null);
      })
      .catch(reject);
  });
}

interface NameHistoryEntry {
  name: string;
  changedToAt?: number;
}

const nameHistoryFromUUIDCache: Collection<string, NameHistoryEntry[]> = new Collection();

export const getNameHistoryFromUUID = (uuid: string): Promise<NameHistoryEntry[] | null> => {
  return new Promise((resolve, reject) => {
    const cached = nameHistoryFromUUIDCache.get(uuid.toLowerCase());
    if (cached) resolve(cached);

    axios
      .get(`https://api.mojang.com/user/profiles/${uuid}/names`)
      .then((res) => {
        if (res.data !== "" && res.data) {
          nameHistoryFromUUIDCache.set(uuid, res.data);
          setTimeout(() => nameHistoryFromUUIDCache.delete(uuid), 1000 * 60 * 15); // 15 minute timeout

          resolve(res.data);
        }
        resolve(res.data === "" ? null : res.data);
      })
      .catch(reject);
  });
};
