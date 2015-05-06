import config from '../config';

let Parse = require('Parse').Parse;
Parse.initialize(config.Parse.APP_ID, config.Parse.JS_KEY);

export default Parse;
