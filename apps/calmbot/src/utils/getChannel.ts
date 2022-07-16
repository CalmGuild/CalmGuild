import database from "@calmguild/database";
import { ChannelType } from "@calmguild/database";
import { Channel, Guild } from "discord.js";

export default (channelType: ChannelType, guild: Guild): Promise<Channel | undefined> => {
  return new Promise(async (resolve) => {
    const channelData = await database.channel.findFirst({
      where: {
        channelType: channelType,
      },
      select: {
        channelId: true,
      },
    });

    if (!channelData) return resolve(undefined);
    const channel = guild.channels.cache.get(channelData?.channelId);
    resolve(channel);
  });
};
