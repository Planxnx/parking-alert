import { client as Client } from './line';
import config from '../config';
import firebase from './firebase';

export default {
  lineClient: Client({
    lineOAConfig: {
      clientConfig: {
        channelAccessToken: config.line.channelAccessToken,
      },
    },
  }),
  firebaseClient: firebase,
};
