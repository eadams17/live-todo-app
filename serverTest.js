const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io-client");
const ioServer = require("socket.io")(server);
let socket;

// Connect client socket instance
beforeEach(done => {
  socket = io("http://localhost:3003/");
  socket.on("connect", () => {
    done();
  });
});

// Disconnect client socket instance
afterEach(done => {
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

describe("socket connection", () => {
  it("should communicate", () => {
    // Test connection
    ioServer.on("connection", client => {
      console.log("client", client);
      // expect(client).toBeDefined();
    });
    // Once connected, emit "fazer um rolê"
    ioServer.emit("echo", "fazer um rolê");
    socket.on("echo", message => {
      console.log(message, message);
      // Check that the message matches
      expect(message).toEqual("fazer um rolê");
      done();
    });
  });
});
