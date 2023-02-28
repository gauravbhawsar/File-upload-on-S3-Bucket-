const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    console.log(req.user, "line 6");
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});
module.exports = router;
