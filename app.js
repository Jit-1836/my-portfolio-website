const express = require("express");
const app = express();
const mongoose = require("mongoose");
const portfolio = require("./model/portfolio");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require("dotenv").config();

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/portfolioweb";

main()
  .then(() => {
    console.log("connect to DB");

    mongoose.connection.db
      .collection("testCollection")
      .insertOne({ message: "Hello, MongoDB!" }, (err, result) => {
        if (err) {
          console.error("Error inserting document:", err);
        } else {
          console.log("Document inserted:", result);
        }
      });
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  });
}

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.get("/", (req, res) => {
  res.send("hi,i am root");
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/portfolio", async (req, res) => {
  const allportfolios = await portfolio.find({});
  res.render("index.ejs", { allportfolios });
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
