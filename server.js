require("dotenv").config();
const express = require("express");

const app = express();

const bukuRoutes = require("./routes/perpusdb.js");
const db = require("./database/db.js");
const port = process.env.PORT;

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/book", bukuRoutes);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main-layout",
  });
});

app.get("/buku", (req, res) => {
  res.json(buku);
});

app.get("/buku", (req, res) => {
  db.query("SELECT * FROM buku", (err, buku) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("buku", {
      buku: buku,
      layout: "layouts/main-layout",
    });
  });
});

app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});