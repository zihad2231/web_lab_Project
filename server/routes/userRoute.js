import express from "express";

const route = express.Router();

route.get("/", (req, res) => {
  res.send("User route is working!");
});

export default route;
