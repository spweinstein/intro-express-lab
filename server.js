const express = require("express");
const morgan = require("morgan");
const app = express();

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.use(morgan("dev"));

app.listen(3000, () => {
  console.clear();
  console.log("Listening on port 3000");
});

// Task 1 - Greet the user

app.get("/greetings/:username", (req, res) => {
  res.send(`Hello there, ${req.params.username}`);
});

// Task 2 - Rolling the Dice

app.get("/roll/:rollNumber", (req, res) => {
  const rollNum = req.params.rollNumber;
  const isNum = Number.isFinite(+rollNum);
  console.log(rollNum, isNum);
  if (!isNum) {
    res.send("You must specify a number.");
  } else {
    const resNum = Math.floor(Math.random() * rollNum);
    res.send(`You rolled a ${resNum}.`);
  }
});

// Task 3 - I want THAT One!

app.get("/collectibles/:index", (req, res) => {
  const index = +req.params.index;
  const isValid = index === 0 || index === 1 || index === 2;
  if (isValid) {
    const item = collectibles[index];
    res.send(`Want to buy a ${item.name}? It's yours for ${item.price}!`);
  } else {
    res.send("This item is not yet in stock. Check back soon!");
  }
});

// Task 4 - Filter Shoes

app.get("/shoes", (req, res) => {
  const minPrice = +req.query["min-price"];
  const maxPrice = +req.query["max-price"];
  const shoeType = req.query["type"];
  console.log(minPrice, maxPrice, shoeType);
  let filteredShoeList = [...shoes];
  if (Number.isFinite(minPrice)) {
    filteredShoeList = filteredShoeList.filter(
      (shoe) => shoe.price >= minPrice
    );
  }
  if (Number.isFinite(maxPrice)) {
    filteredShoeList = filteredShoeList.filter(
      (shoe) => shoe.price <= maxPrice
    );
  }
  if (shoeType !== undefined) {
    filteredShoeList = filteredShoeList.filter(
      (shoe) => shoe.type === shoeType
    );
  }
  res.send(filteredShoeList);
});
