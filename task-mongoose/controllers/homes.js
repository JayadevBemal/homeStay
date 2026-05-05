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

exports.getHomePage = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    Favourite.find().then((ids) => {
      ids = ids.map((id) => id.homeId.toString());
      console.log(ids);
      res.render("store/home", {
        registeredHomes: registeredHomes,
        pageTitle: "Airbnb",
        fav: ids,
      });
    });
  });
};

exports.getHomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home-List",
    });
  });
};

exports.getFavourites = (req, res, next) => {
 
    Favourite.find().populate('homeId').then((favourites) => {
      
     const favHomes = favourites.map(home => home.homeId)
      res.render("store/favourites", {
        pageTitle: "Favourite Page",
        homes: favHomes,
      });
    });
  ;
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", { pageTitle: "Bookings Page" });
};

exports.getReserves = (req, res, next) => {
  res.render("store/reserve", { pageTitle: "Reserve Page" });
};

exports.getHostHomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host-Home-List",
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
    });
  });
};

exports.postToFavourites = (req, res, next) => {
  const {homeId} = req.body._id;
  console.log(homeId)
  Favourite.find({homeId:homeId}).then((result) => {
    if(result){
      console.log('already added')
      return res.redirect('/home-list')
    }
    else{
       result = new Favourite({homeId: homeId});
       result.save().then(() => {
        console.log('successfully added');
        return res.redirect('/home-list')
       })
    }
  }).catch(err => console.log(err))
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

exports.postRemoveFromList = (req, res, next) => {
  const homeId = req.params.id;
  const task = req.query.task;
  if (task != "add") {
    Favourite.findOneAndDelete({homeId: homeId}).then(() =>  res.redirect("/favourites")).catch(err => console.log(err))
  } else {
    Favourite.findOne({homeId: homeId}).then(result => {
      if(!result){ result = new Favourite({homeId: homeId});
                  result.save();
                  return res.redirect('/favourites')}
      else{ 
        console.log('already added');
        return res.redirect('/home-list')
      }
    })
    
  }
};
