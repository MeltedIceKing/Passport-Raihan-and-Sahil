const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});


//req.user is passed to here which stores all the information about the user
//passport middleware added user variable to request
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

module.exports = router;
