const fs = require("fs");
const path = require("path");
const rootPath = require("../utils/pathUtil");
const homeDataPath = path.join(rootPath, "data", "homes.json");

const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(
    houseName,
    pricePerNight,
    location,
    rating,
    homeImage,
    id,
    description,
  ) {
    this.houseName = houseName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.homeImage = homeImage;
    this.id = id;
    this.description = description;
  }

  save() {
    if (this.id) {
      return db.execute(
        "UPDATE homes SET houseName=?, pricePerNight=?, location=?, rating=?, homeImage=?, description=? WHERE id=?",
        [
          this.houseName,
          this.pricePerNight,
          this.location,
          this.rating,
          this.homeImage,
          this.description,
          this.id,
        ],
      );
    } else {
      return db.execute(
        "INSERT INTO homes (  houseName,pricePerNight,location,rating,homeImage,description) VALUES (?,?,?,?,?,?)",
        [
          this.houseName,
          this.pricePerNight,
          this.location,
          this.rating,
          this.homeImage,
          this.description,
        ],
      );
    }

    //   Home.fetchAll((registeredHomes) => {

    //     console.log(this.id)
    //   if(this.id){
    //    registeredHomes = registeredHomes.map(home => {
    //     return home.id == this.id ? this : home
    //    })
    //   }else{
    //     this.id = Math.random().toString();
    //     registeredHomes.push(this);
    //   }
    //  fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),err => console.log(err))

    //   });
  }
  static fetchAll(callback) {
    return db.execute("SELECT * FROM homes");

    // fs.readFile(homeDataPath, (err, data) => {
    //   if (err) {
    //     callback([]);
    //   } else {
    //     callback(JSON.parse(data));
    //   }
    // });
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);

    // this.fetchAll((homes) => {
    //   const homeFound = homes.find((home) => home.id == homeId);
    //   callback(homeFound);
    // });
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
    // this.fetchAll(homes => {
    //  homes = homes.filter(home => home.id != homeId);
    //  fs.writeFile(homeDataPath,JSON.stringify(homes),callback)
    //   } )
    // }
  }
};
