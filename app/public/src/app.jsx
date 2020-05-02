/* global EventEmitter, Topics, io, Peer */
/** @jsx React.DOM */

$(function() {
  "use strict";
  $("#connect-btn").click(function() {
    initChat($("#container")[0], {
      username: $("#username-input").val(),
      host: $("#superbrain-host").val(),
      clientId: $("#superbrain-clientid").val(),
      clientSecret: $("#superbrain-clientsecret").val()
    });
  });

  function initChat(container, payload) {
    console.log("initChat", JSON.stringify(payload));
    var proxy = new ChatProxy();
    React.renderComponent(
      <ChatBox chatProxy={proxy} payload={payload} />,
      container
    );
  }

  window.onbeforeunload = function() {
    return "确定离开本页?";
  };
});
