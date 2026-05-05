const fs = require("fs");
const path = require("path");
const rootPath = require("../utils/pathUtil");
const favouritesDataPath = path.join(rootPath, "data", "favourites.json");

module.exports = class Favourite {
  static addToFavourites(id, callback) {
    this.getFavourites((favourites) => {
      if (favourites.includes(id)) {
        callback("already added");
      } else {
        favourites.push(id);
        fs.writeFile(favouritesDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouritesDataPath, (err, data) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }

  static deleteFromFavlist(homeid, callback) {
    this.getFavourites((id) => {
      id = id.filter((i) => i != homeid);
      fs.writeFile(favouritesDataPath, JSON.stringify(id), callback);
    });
  }
};
