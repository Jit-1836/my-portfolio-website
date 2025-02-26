const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  user: {},
});

const Portfolio = mongoose.model("portfolio", portfolioSchema);
module.exports = Portfolio;
