"use strict";

var path = require("path");
var _ = require("lodash");

var env = process.env.NODE_ENV || "development";
env = env.toLowerCase();

var all = {
  env: env,
  node: {
    port: 8668,
  },
  root: path.normalize(path.join(__dirname, "..", "..")),
};

try {
  all = _.merge(all, require("./" + env + ".js") || {});
} catch (e) {}

module.exports = all;
