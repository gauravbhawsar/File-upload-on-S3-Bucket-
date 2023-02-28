const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

// console.log(process.env.CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, callback) => {
      console.log(profile, "line 14");

      callback(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
