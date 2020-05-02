/* global EventEmitter, Topics, io, Peer */
"use strict";

function ChatProxy() {
  EventEmitter.call(this);
  this._username = null;
  this.replies = {};
}

ChatProxy.prototype = Object.create(EventEmitter.prototype);

ChatProxy.prototype.onMessage = function (cb) {
  this.addListener(Topics.USER_MESSAGE, cb);
};

ChatProxy.prototype.getUsername = function () {
  return this._username;
};

ChatProxy.prototype.setUsername = function (username) {
  this._username = username;
};

ChatProxy.prototype.onServerResponseUpdate = function (cb) {
  this.addListener(Topics.SERVER_RESPONSE, cb);
};

ChatProxy.prototype.onUserConnected = function (cb) {
  this.addListener(Topics.USER_CONNECTED, cb);
};

ChatProxy.prototype.onUserDisconnected = function (cb) {
  this.addListener(Topics.USER_DISCONNECTED, cb);
};

/**
 * Send to server with socket.io
 */
ChatProxy.prototype.sendToServer = function (msg) {
  this.socket.emit("client:server", msg);
};

ChatProxy.prototype.connect = function (payload) {
  var self = this;
  console.log("ChatProxy connect", JSON.stringify(payload));
  this.setUsername(payload.username);
  this.socket = io("", {
    query: "username=" + payload.username,
  });
  this.socket.on("connect", function () {
    self.socket.on(Topics.USER_CONNECTED, function (userId) {
      if (userId === self.getUsername()) {
        return;
      }
      self.emit(Topics.USER_CONNECTED, userId);
      console.log("User connected", userId);
    });

    self.socket.on(Topics.USER_DISCONNECTED, function (userId) {
      if (userId === self.getUsername()) {
        return;
      }
      self.emit(Topics.USER_DISCONNECTED, userId);
      console.log("User disconnected", userId);
    });

    /** Subscribe server:client message */
    self.socket.on("server:client", function (data) {
      console.log("server:client message", data.response.createdate);
      if (!self.replies[data.response.createdate]) {
        self.replies[data.response.createdate] = data;
        self.emit(Topics.USER_MESSAGE, {
          content:
            data.response.textMessage ||
            "Oops, can not get message from bot ...",
          author: "bot",
        });

        self.emit(Topics.SERVER_RESPONSE, data);
      }
    });
  });
};
