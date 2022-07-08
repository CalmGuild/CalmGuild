import axios from "axios";

export default function getUUIDFromName(name: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.mojang.com/users/profiles/minecraft/${name}`)
      .then((res) => {
        resolve(res.data?.id ?? null);
      })
      .catch(reject);
  });
}

interface NameHistoryEntry {
  name: string;
  changedToAt?: number;
}

export const getNameHistoryFromUUID = (uuid: string): Promise<NameHistoryEntry[] | null> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.mojang.com/user/profiles/${uuid}/names`)
      .then((res) => {
        resolve(res.data === "" ? null : res.data);
      })
      .catch(reject);
  });
};
