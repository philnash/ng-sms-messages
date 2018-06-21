"use strict";

// npm modules
const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const values = require('object.values');

// application requires
const config = require("../config");

const client = twilio(config.accountSid, config.authToken);

router.get("/inbox", function(req, res, next) {
  client.messages.list({to: config.phoneNumber}).then(function(messages) {
    messages = messages.reduce(function(accumulator, currentMessage){
      if(!accumulator[currentMessage.from]) {
        accumulator[currentMessage.from] = currentMessage;
      }
      return accumulator;
    }, {});
    messages = values(messages);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(messages));
  });
});

router.get("/outbox", function(req, res, next) {
  client.messages.list({from: config.phoneNumber}).then(function(messages) {
    messages = messages.reduce(function(accumulator, currentMessage){
      if(!accumulator[currentMessage.to]) {
        accumulator[currentMessage.to] = currentMessage;
      }
      return accumulator;
    }, {});
    messages = values(messages);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(messages));
  });
});

router.post("/messages", function(req, res, next) {
  const numbers = req.body.phoneNumber.split(',').map(function(number) { return number.trim(); });
  Promise.all(numbers.map(function(number) {
    return client.messages.create({
      from: config.phoneNumber,
      to: number,
      body: req.body.body
    });
  })).then(function(data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ result: "success" }));
  }).catch(function(err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(err.status).send(JSON.stringify(err));
  });
});

router.get("/messages/:phoneNumber", function(req, res, next) {
  let incoming = client.messages.list({
    from: req.params.phoneNumber,
    to: config.phoneNumber
  });
  let outgoing = client.messages.list({
    from: config.phoneNumber,
    to: req.params.phoneNumber
  });
  Promise.all([incoming, outgoing]).then(function(values) {
    var allMessages = values[0].concat(values[1]);
    allMessages.sort(function(a, b){
      let date1 = Date.parse(a.dateCreated);
      let date2 = Date.parse(b.dateCreated);
      if (date1 == date2) { return 0; }
      else { return date1 < date2 ? -1 : 1 }
    });
    allMessages = allMessages.map(function(message){
      message.isInbound = message.direction === "inbound";
      message.isOutbound = message.direction.startsWith("outbound");
      return message;
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      messages: allMessages,
      phoneNumber: req.params.phoneNumber
    }));
  });
});

module.exports = router;
