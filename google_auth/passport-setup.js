const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
done(null, user);
});

//here we will be having all req.user
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "727680756119-liihjtrk6po8ruea1q7e9bd1t0uo92tr.apps.googleusercontent.com",
      clientSecret: "O9kaibMPaEirgspPSse3w2lS",
      callbackURL: "http://127.0.0.1:3000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
