const connection = require("../config/dataBase");

const getHomepage = (req, res) => {
  return res.render("home.ejs");
};

const getABC = (req, res) => {
  res.send("check ABC");
};

const getHoiDanIT = (req, res) => {
  // res.send('<h1>hoi dan it voi Eric </h1>')
  res.render("sample.ejs");
};

module.exports = {
  getHomepage,
  getABC,
  getHoiDanIT,
};
