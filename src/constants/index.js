import COLOR from './colors';
import FONTS from './fonts';
import FONTSIZE from './fontSize';
import strings from './string';
import NETWORKSTATUS from './networkStatus';
import API_URL from './apiUrl';

const devUrl = 'https://ms.stagingsdei.com:9206';
const prodUrl = '';

const appVersion = '1.04';
export default {
  BASE_URL: devUrl,
  COLOR,
  FONTS,
  FONTSIZE,
  strings,
  NETWORKSTATUS,
  API_URL,
  APP_VERSION: appVersion,
};
