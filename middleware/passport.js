
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userController = require("../controllers/userController");

const localLogin = new LocalStrategy(
  {
    usernameField: "email", // tells passport using email instead of username
    passwordField: "password",
  },
  (email, password, done) => {
    //done is a function passed an error (on db end) and the user (null if no user)
    //done is how to tell passport ready to move forward
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user) // when call done, you jump back to pasport.authenticate on authRoute
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);



const gitHubLogin = new GitHubStrategy(
  {
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "http://localhost:3000/auth/github/callback"
}, 
(accessToken, refreshToken, profile, done) => {
  userController.findOrCreate(profile, (err, user) => {
    return done(err, user);
  });
});


// req.session.passport.user
// when call done() and pass verified user, it is sent to seralizeUser as first param
// dont wanna store all info about user, so only storing userID
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
//req.user stores ALL the info about the user

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    //reattach user to req.user with accurate and up to date info about user
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

//tell passport to use local login strategy - returns configured passport library with injected code
module.exports = passport.use(localLogin).use(gitHubLogin);

//Server Hard Drive - stores all sessions
/*
Session = {
  'slkdjfsd89s8dfsdf8sdfkdslfj8' : {    This long string is stored inside of a cookie, and cookie sent to browser
    user
  }
}
//sessions how webpage stays after refresh - server sends cookie to passport which has user data in it


*/
