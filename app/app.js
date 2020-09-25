"use strict";

const debug = require("debug")("testclient:app");
const Koa = require("koa");
const config = require("./config/environment");
const serve = require("koa-static");
const Topics = require("./public/src/Topics.js");
const app = new Koa();
const path = require("path");
const figlet = require("figlet");
const port = config.node.port || 8668;
const bodyParser = require("koa-bodyparser");
const router = require("./routes");
const { Chatbot } = require("@chatopera/sdk");

app.use(serve(path.join(__dirname, "/public")));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

const httpServer = app.listen(port, function () {
  figlet("Chatopera Test Client", function (err, data) {
    console.log(`            
${data}
================= Powered by Chatopera =====================
-------- https://github.com/chatopera/efaqa-bot-demo

---------------- 心理问答机器人示例程序，心理问答 API. ---------------------

`);
    console.log(`Chatopera Test Client Listening on port ${port}`);
  });
});
const io = require("socket.io").listen(httpServer);

/**
 * Process Socket Event
 * https://nodesource.com/blog/understanding-socketio/
 */
io.on("connection", function (socket) {
  debug("socket.io connection query %j", socket.handshake.query);
  let query = socket.handshake.query;

  socket.emit(Topics.USER_CONNECTED, query.username);

  socket.on("client:server", async function (data) {
    debug("socket.io", "client:server", data);
    let { host, clientId, clientSecret, username } = data.provider || {};

    let bot = new Chatbot(clientId, clientSecret, host);
    let response = await bot.psychChat(
      "testclient",
      "efaqa-bot-demo",
      username,
      data.content
    );

    // debug("get response: \n%s", JSON.stringify(response, null, " "));

    socket.emit("server:client", {
      recipient: data.author,
      // faked response
      response: response,
    });
  });
});
