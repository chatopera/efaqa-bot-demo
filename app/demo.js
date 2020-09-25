#!/usr/bin/env node
// -*- coding: utf-8 -*-
//===============================================================================
//
// Copyright (c) 2020 <> All Rights Reserved
//
//
// File: /Users/hain/chatopera/efaqa-bot-demo/app/demo.js
// Author: Hai Liang Wang
// Date: 2020-04-30:21:34:01
//
//===============================================================================
/**
 *
 */
require("dotenv").config();
const argv = process.argv;
const curdir = __dirname;
const debug = require("debug")("demo");
const path = require("path");
const samples = require(path.join(curdir, "..", "assets", "sample.json"));
const { Chatbot } = require("@chatopera/sdk");

const BOT_CLIENT_ID = process.env["BOT_CLIENT_ID"];
const BOT_CLIENT_SECRET = process.env["BOT_CLIENT_SECRET"];
const DEMO_FLOW_CHAT = process.env["DEMO_FLOW_CHAT"] || "on";
const DEMO_FLOW_SEARCH = process.env["DEMO_FLOW_SEARCH"] || "on";

const bot = new Chatbot(BOT_CLIENT_ID, BOT_CLIENT_SECRET);

/**
 * 调用查询接口
 */
async function search() {
  for (let x of samples.search.data) {
    let resp = await bot.psychSearch(x, samples.search.threshold);
    debug("\n\nsearch input: %s", x);
    debug("bot response: \n%s", JSON.stringify(resp, null, " "));
    debug("***********************");
  }
}

/**
 * 调用聊天接口
 */
async function chat() {
  // chat为多轮对话，每个会话有20分钟有效期，在会话期内查询上下文
  // 强制清除会话状态，发送 @SESSION_DESTROY@
  // 本程序是演示，测试，在演示前强制刷新会话，实际使用中不必调用
  await bot.psychChat(
    samples.chat.channel,
    samples.chat.channelId,
    samples.chat.userId,
    "@SESSION_DESTROY@"
  );

  // 开始对话
  for (let x of samples.chat.data) {
    let resp = await bot.psychChat(
      samples.chat.channel,
      samples.chat.channelId,
      samples.chat.userId,
      x
    );
    debug("\n\nchat input: %s", x);
    debug("bot response: \n%s", JSON.stringify(resp, null, " "));
    debug("***********************");
  }
}

// main function
async function main() {
  debug("bot: client id %s, secret ********", BOT_CLIENT_ID);
  if (DEMO_FLOW_SEARCH.toLocaleLowerCase() == "on") await search();
  if (DEMO_FLOW_CHAT.toLocaleLowerCase() == "on") await chat();
}

// on main entry
if (require.main === module) {
  (async function () {
    await main();
  })();
}
