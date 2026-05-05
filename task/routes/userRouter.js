const path = require('path');
const express = require("express");
const userRouter = express.Router();
const homesController = require('../controllers/homes')


userRouter.get("/",homesController.getHomePage );
userRouter.get("/home",homesController.getHomePage);
userRouter.get("/home-list",homesController.getHomeList);
userRouter.get("/favourites",homesController.getFavourites);
userRouter.get("/bookings",homesController.getBookings);
userRouter.get("/reserves",homesController.getReserves);
userRouter.get("/home-list/:homeId",homesController.getHomeDetails);
userRouter.post("/favourites",homesController.postToFavourites)
userRouter.post("/favourites/:id",homesController.postRemoveFromList);
module.exports = userRouter;
