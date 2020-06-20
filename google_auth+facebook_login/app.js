const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
require("./passport-setup");
const bodyParser = require("body-parser");
const usercontroller = require("./usercontroller");
app.use(cors());

app.use(bodyParser.json());
const DB =
  "mongodb+srv://amit:anurag@440@cluster0-jnyrj.mongodb.net/gdata?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected!!");
  });

app.use(
  cookieSession({
    name: "tuto-session",
    maxAge: 60 * 60 * 8 * 1000,
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const isloggedin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/google");
  }
};
app.get("/failure", (req, res) => {
  res.send("failed");
});
app.get("/", isloggedin, usercontroller.savedata, (req, res) => {
  res.send(`login as ${req.user.displayName}`);
  console.log(req.user);
});
app.get("/success", (req, res) => {
  res.redirect("/");
});
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);
app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get(
  "/facebook",
  passport.authenticate("facebook", { scope: [ "email"] })
);

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/failure" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);
app.listen(3000, () => console.log("app is running on port 3000"));
