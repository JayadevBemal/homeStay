const Home = require("../models/home");
const Favourite = require("../models/favourites");


exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", { pageTitle: "Home Registration",editing:false });

};


exports.getEditHome = (req,res,next) => {
  const homeId = req.params.id;
  const editing = req.query.editing;
  console.log(req.query)
           Home.findById(homeId).then(([homes]) =>{
            const home = homes[0];
            if(!home){ return res.redirect('/host/host-home-list')
            }
             res.render('host/add-home',{pageTitle:'Home Editing',editing:editing,home:home})

           })
  
}


exports.postAddHome = (req, res, next) => {
  const {houseName,pricePerNight,location,rating,homeImage,id,description} = req.body;
  const home = new Home(houseName,pricePerNight,location,rating,homeImage,id,description);
  home.save().then(() =>console.log('saved successfully'));
   res.redirect('/host/home-list');
};

exports.postEditHome = (req, res, next) => {
  const {houseName,pricePerNight,location,rating,homeImage,id,description} = req.body;
  const home = new Home(houseName,pricePerNight,location,rating,homeImage,id,description);
  home.save();
  res.redirect('/host/home-list');
};

exports.getHomePage = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
     Favourite.getFavourites(ids =>{
     res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "Airbnb",fav:ids
    });
    })
  })
  
};

exports.getHomeList = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
  res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home-List",
    });
  })
  
};

exports.getFavourites = (req, res, next) => {
  console.log(
  'hit'
  )
 Home.fetchAll().then(([registeredHomes]) => {
  Favourite.getFavourites(ids => {
    const favHomes = registeredHomes.filter(home => ids.includes(home.id))
    res.render('store/favourites',{pageTitle:'Favourite Page',homes:favHomes})
  })
 })
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", { pageTitle: "Bookings Page" });
};

exports.getReserves = (req, res, next) => {
  res.render("store/reserve", { pageTitle: "Reserve Page" });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
  res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host-Home-List",
    });
  }) 
};

exports.getHomeDetails = (req,res,next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    res.render('store/home-detail',{pageTitle:'DetailsofHome',home: home,homeId:homeId})
  })
}

exports.postToFavourites = (req,res,next) => {
  Favourite.addToFavourites(req.body.id,err => {
    if(err){console.log('error',err)}
    res.redirect('/favourites')
  })
}

exports.postDeleteHome = (req,res,next) => {
   const homeId = req.params.id;
   Home.deleteById(homeId).then(()=> {
    res.redirect('/host/home-list');
   }).catch(err => console.log('error',err));
}

exports.postRemoveFromList = (req,res,next) => {
  const homeId = req.params.id;
  const task = req.query.task;
  if(task != 'add'){
   return Favourite.deleteFromFavlist(homeId,err => res.redirect('/favourites'))
  }else{
    return Favourite.addToFavourites(homeId,err =>res.redirect('/favourites') )
  }
  
}