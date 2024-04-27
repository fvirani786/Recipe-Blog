const express = require("express");
const app = express(); // our app
const PORT = process.env.PORT || 3000;

// ------------ DATA -----------------
// inside of fruits.js
const { fruits } = require("./models/fruits");
const { veggies } = require("./models/veggies");
const { meats } = require("./models/meats");

// ------------ MIDDLEWARE ------------
app.set("view engine", "ejs"); // come back to this
app.use("/", express.static("public"));
// app.use(express.static(__dirname + "/public/"));

// ------------ ROUTES ---------------
// ******* INDEX ROUTE **********
app.get("/fruits", (req, res) => {
  // send array as a response
  res.render("fruits/index", {
    allFruits: fruits,
    allVeggies: veggies,
    allMeats: meats,
  });
});
app.get("/veggies", (req, res) => {
  // send array as a response
  res.render("veggies/index", {
    allVeggies: veggies,
    allFruits: fruits,
    allMeats: meats,
  });
});
app.get("/meats", (req, res) => {
  // send array as a response
  res.render("meats/index", {
    allMeats: meats,
    allFruits: fruits,
    allVeggies: veggies,
  });
});

// ******* SHOW ROUTE **********
app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  let idx = parseInt(req.params.indexOfFruitsArray);
  if (idx >= fruits.length) {
    // res.send('There is no fruit at that index.'); // one solution
    // res.send(fruits);
    res.render("404", {});
  } else {
    // res.send(fruits[idx]);
    res.render("fruits/show", { fruit: fruits[idx] });
  }
});
app.get("/veggies/:indexOfVeggiesArray", (req, res) => {
  let idx = parseInt(req.params.indexOfVeggiesArray);
  if (idx >= veggies.length) {
    // res.send('There is no fruit at that index.'); // one solution
    // res.send(fruits);
    res.render("404", {});
  } else {
    // res.send(fruits[idx]);
    res.render("veggies/show", { veggie: veggies[idx] });
  }
});
app.get("/meats/:indexOfMeatsArray", (req, res) => {
  let idx = parseInt(req.params.indexOfMeatsArray);
  if (idx >= meats.length) {
    // res.send('There is no fruit at that index.'); // one solution
    // res.send(fruits);
    res.render("404", {});
  } else {
    // res.send(fruits[idx]);
    res.render("meats/show", { meat: meats[idx] });
  }
});

// ----------- LISTEN FOR SERVER ----------
app.listen(PORT, () => {
  console.log("🎧 Server is running on PORT 🎧", PORT);
});
