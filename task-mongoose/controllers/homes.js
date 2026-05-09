const Home = require("../models/home");
const User = require('../models/user')

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", {
    pageTitle: "Home Registration",
    editing: false,isLoggedIn: req.isLoggedIn, user:req.session.user  || {}
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.id;
  const editing = req.query.editing;
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/add-home", {
      pageTitle: "Home Editing",
      editing: editing,
      home: home,
      isLoggedIn: req.isLoggedIn,user:req.session.user  || {}
      
      
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const {
    houseName,
    pricePerNight,
    location,
    rating,
    homeImage,
    _id,
    description,
  } = req.body;
  const home = new Home({
    houseName,
    pricePerNight,
    location,
    rating,
    homeImage,
    _id,
    description,
  });
  home.save().then(() => {
    console.log("home saved");
    return res.redirect("/host/home-list");
  });
};

exports.postEditHome = (req, res, next) => {
  const {
    houseName,
    pricePerNight,
    location,
    rating,
    homeImage,
    _id,
    description,
  } = req.body;
  
  Home.findById(_id).then((home) => {
    home.houseName = houseName;
    home.pricePerNight = pricePerNight;
    home.location = location;
    home.rating = rating;
    home.homeImage = homeImage;
    home.description = description;
    home.save().then(() => res.redirect('/home-list')).catch(err => console.log(err))
  }).catch(err => console.log(err))
};

exports.getHomePage = async (req, res, next) => {

  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites')

  Home.find().then((registeredHomes) => {

    res.render("store/home", {
        registeredHomes: registeredHomes,
        pageTitle: "Airbnb",
        fav: user.favourites ,
        isLoggedIn: req.session.isLoggedIn || false,user:req.session.user  || {}
      });
  });
};

exports.getHomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home-List",
      isLoggedIn: req.isLoggedIn || false,user:req.session.user  || {}
    });
  });
};

exports.getFavourites = async (req, res, next) => {

  const userId = req.session.user._id;
 
   const user = await User.findById(userId).populate('favourites');

      res.render("store/favourites", {
        pageTitle: "Favourite Page",
        homes: user.favourites,
        isLoggedIn: req.isLoggedIn,user:req.session.user  || {}
      });
    
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", { pageTitle: "Bookings Page", isLoggedIn: req.isLoggedIn,user:req.session.user  || {}});
};

exports.getReserves = (req, res, next) => {
  res.render("store/reserve", { pageTitle: "Reserve Page" , isLoggedIn: req.isLoggedIn ,user:req.session.user  || {}});
};

exports.getHostHomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host-Home-List",isLoggedIn: req.isLoggedIn,
      user:req.session.user  || {}
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.findById(homeId).then((home) => {
    res.render("store/home-detail", {
      pageTitle: "DetailsofHome",
      home: home,
      homeId: homeId,
      isLoggedIn: req.isLoggedIn,user:req.session.user  || {}
    });
  });
};


exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.id;
  Home.findByIdAndDelete(homeId)
    // .then(() => {
    //   Favourite.deleteFromFavlist(homeId);
    // })
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => console.log("error", err));
};

exports.postRemoveFromList = async(req, res, next) => {
  const homeId = req.params.id;
  const task = req.query.task;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  

  if (task != "add") {

    user.favourites = await user.favourites.filter(fav => fav != homeId);
    await user.save()
   return res.redirect('/favourites')
} else if(!user.favourites.includes(homeId)) {

    user.favourites.push(homeId)
    await user.save();
    console.log('saved')
    res.redirect('/favourites')

   }else{
    console.log('else block')
    return res.redirect('/favourites')
   }
      
      }
    
    
