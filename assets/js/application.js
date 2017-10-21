require("expose-loader?$!expose-loader?jQuery!jquery");
require("bootstrap-sass/assets/javascripts/bootstrap.js");

import Vue from "vue";

/**
 *  Since we're using the runtime build of Vue, we're going to have to
 *  pass it to the window for the router to see it. Nevertheless, it 
 *  cleans up this file nicely.
 */

window.Vue = Vue;

/**
 * Pass axios to the window, that way all our .vue files can
 * see it and use it freely without having to import to each file.
 * 
 * Axios also has really really nice documentation to help you out!
 * It may look slightly difference to what I've written in the vue files,
 * because I've used ES6 syntax.
 * 
 * https://github.com/axios/axios
 */

window.axios = require('axios');

/**
 * Require our router that we've nicely sat VueRouter inside of to
 * keep our base app.js clean.
 */
require('./router.js')
