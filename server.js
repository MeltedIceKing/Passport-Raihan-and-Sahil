require('dotenv').config()
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const port = process.env.port || 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport"); // stores entire passport library with all configurations we injected in passport.js
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const adminRoute = require("./routes/adminRoute") //admin route for verified admin users

// Middleware for express
app.use(express.json());
app.use(expressLayouts); //file that makes html cleaner and easier to maintain 
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize()); //starts up passport - passport funcs wont work without this
app.use(passport.session()); //allow passport to piggyback on express session

app.use((req, res, next) => {
  //To show whats going on under the hood
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
