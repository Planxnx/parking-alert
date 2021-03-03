import { Client } from '@line/bot-sdk';

export const client = ({ lineOAConfig }) => {
  const defaultChannelAccessToken = lineOAConfig.clientConfig.channelAccessToken;
  return {
    getInstance: (channelAccessToken = defaultChannelAccessToken) => {
      return new Client({
        channelAccessToken
      });
    }
  };
};