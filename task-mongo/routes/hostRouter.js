const express = require("express");
const hostRouter = express.Router();
const path = require("path");
const rootPath = require("../utils/pathUtil");

const homesController = require("../controllers/homes");

hostRouter.use(express.static(path.join(rootPath, "public")));

hostRouter.get("/add-home", homesController.getAddHome);

hostRouter.post("/add-home", homesController.postAddHome);

hostRouter.get("/home-list",homesController.getHostHomeList);

hostRouter.get("/edit-home/:id",homesController.getEditHome);

hostRouter.post("/edit-home",homesController.postEditHome);

hostRouter.post("/delete-home/:id",homesController.postDeleteHome);

exports.hostRouter = hostRouter;
