const express = require("express");
const app = express(); // our app
const PORT = process.env.PORT || 3000;
// middleware for PUT and DELETE Methods
const methodOverride = require("method-override");

// ------------ DATA -----------------
// inside of fruits.js
const { fruits } = require("./models/fruits");
const { veggies } = require("./models/veggies");
const { meats } = require("./models/meats");
const { recipes } = require("./models/recipes");

// ------------ MIDDLEWARE ------------
app.use(methodOverride("_method"));
app.set("view engine", "ejs"); // come back to this
app.use("/", express.static("public"));
// app.use(express.static(__dirname + "/public/"));
//allows use to parse data through and see the data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------ ROUTES ---------------
// ******* INDEX ROUTE **********
app.get("/", (req, res) => {
  res.render("home/index");
});
app.get("/fruits", (req, res) => {
  // send array as a response
  res.render("fruits/index", {
    allFruits: fruits,
    allVeggies: veggies,
    allMeats: meats,
  });
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs", {});
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

app.get("/meats/new", (req, res) => {
  res.render("meats/new", {});
});

app.get("/recipes", (req, res) => {
  res.render("recipe/index", {
    allRecipes: recipes,
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
    res.render("fruits/show", { fruit: fruits[idx], id: idx });
  }
});
//********* GET -edit page get rout
app.get("/fruits/:id/edit", (req, res) => {
  const fruit = fruits[req.params.id];
  let id = parseInt(req.params.id);
  res.render("fruits/edit", { fruit: fruit, id: id });
});
app.get("/meats/:id/edit", (req, res) => {
  const meat = meats[req.params.id];
  let id = parseInt(req.params.id);
  res.render("meats/edit", { meat: meat, id: id });
});
// *****GET -DELETE PAGE**********
app.get("/fruits/:id/delete", (req, res) => {
  const fruit = fruits[req.params.id];
  let id = parseInt(req.params.id);
  res.render("fruits/delete", { fruit, id });
});
app.get("/meats/:id/delete", (req, res) => {
  const meat = meats[req.params.id];
  let id = parseInt(req.params.id);
  res.render("meats/delete", { meat, id });
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
// ***** POST NEW FRUIT ******
app.post("/fruits", (req, res) => {
  console.log("-------- FORM BODY \n", req.body);
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  fruits.push(req.body);
  res.redirect("/fruits");
});

app.post("/meats", (req, res) => {
  console.log("--- FORM BODY \n", req.body);
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  meats.push(req.body);
  res.redirect("/meats");
});

// ****** update fruit ***
app.put("/fruits/:id", (req, res) => {
  console.log("-----Update Fruit--------- \n", req.body);
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  fruits[parseInt(req.params.id)] = req.body;
  res.redirect("/fruits");
});

app.put("/meats/:id", (req, res) => {
  console.log("-----Update MeatSir--------- \n", req.body);
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  meats[parseInt(req.params.id)] = req.body;
  res.redirect("/meats");
});

//***DELETE- DELETE FRUIT */
app.delete("/fruits/:id", (req, res) => {
  // remove the fruit item from the fruits array
  fruits.splice(parseInt(req.params.id), 1);
  res.redirect("/fruits");
});
app.delete("/meats/:id", (req, res) => {
  // remove the fruit item from the fruits array
  meats.splice(parseInt(req.params.id), 1);
  res.redirect("/meats");
});

// ----------- LISTEN FOR SERVER ----------
app.listen(PORT, () => {
  console.log("🎧 Server is running on PORT 🎧", PORT);
});
