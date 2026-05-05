const Home = require("../models/home");
const Favourite = require("../models/favourites");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", {
    pageTitle: "Home Registration",
    editing: false,
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
  const home = new Home(
    houseName,
    pricePerNight,
    location,
    rating,
    homeImage,
    _id,
    description,
  );
  home.save();
  res.redirect("/host/home-list");
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
  const home = new Home(
    houseName,
    pricePerNight,
    location,
    rating,
    homeImage,
    _id,
    description,
  );
  home.save();
  res.redirect("/host/home-list");
};

exports.getHomePage = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    Favourite.getFavourites().then(ids => { 
      ids = ids.map(id => id.homeId)
      console.log(ids)
        res.render("store/home", {
        registeredHomes: registeredHomes,
        pageTitle: "Airbnb",
        fav: ids,
      });
    })
    })
};

exports.getHomeList = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home-List",
    });
  });
};

exports.getFavourites = (req, res, next) => {
  console.log("hit");
  Home.fetchAll().then((registeredHomes) => {
    Favourite.getFavourites().then(ids => {
      const idList = ids.map((each) => each.homeId.toString())
      const favHomes = registeredHomes.filter((home) => idList.includes(home._id.toString()))
        res.render("store/favourites", {
        pageTitle: "Favourite Page",
        homes: favHomes,
      });
    }) 
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", { pageTitle: "Bookings Page" });
};

exports.getReserves = (req, res, next) => {
  res.render("store/reserve", { pageTitle: "Reserve Page" });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host-Home-List",
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId)
  Home.findById(homeId).then((home) => {
    res.render("store/home-detail", {
      pageTitle: "DetailsofHome",
      home: home,
      homeId: homeId,
    });
  });
};

exports.postToFavourites = (req, res, next) => {
  const fav = new Favourite(req.body._id)
  Favourite.addToFavourites().then(result =>{
    console.log('added',result)
  }).catch(err =>{
    console.log('error',err)
  }).finally(()=>{
    res.redirect('/favourites')
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.id;
  Home.deleteById(homeId)
    .then(() => {
     Favourite.deleteFromFavlist(homeId)
    }).then(() => {
     res.redirect("/host/home-list");
    })
    .catch((err) => console.log("error", err));
};

exports.postRemoveFromList = (req, res, next) => {
  const homeId = req.params.id;
  const task = req.query.task;
  if (task != "add") {
     Favourite.deleteFromFavlist(homeId)
     return res.redirect('/favourites')
  } else {
    const fav = new Favourite(homeId);
    fav.addToFavourites().then(() => res.redirect("/favourites"))
   
  }
};
