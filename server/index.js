require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./Routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();

const multer = require("multer");
const upload = multer();
const s3 = require("./configs/awsConfing");

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/auth", authRoute);
app.post("/fileUpload", upload.single("file"), (req, res) => {
  const { originalname, buffer } = req.file;
  const key = `${req.body.name}-${originalname}`;
  let params = {
    Bucket: process.env.BUCKET,
    Body: buffer,
    Key: key,
  };
  s3.upload(params, (err, resp) => {
    err ? console.log(err) : res.json({ reesponse: resp });
  });
});
app.post("/getFiles", async (req, res) => {
  console.log(process.env.BUCKET);
  const params = {
    Bucket: process.env.BUCKET,
    Prefix: req.query.data,
  };
  const bucketObjects = await s3.listObjects(params).promise();
  console.log(bucketObjects);
  res.json({ data: bucketObjects });
});
app.post("/getPresignedUrl", async (req, res) => {
  const { key } = req.query;
  const params = {
    Bucket: process.env.BUCKET,
    Key: key,
    Expires: 60,
  };
  const presignedUrl = await s3.getSignedUrl("getObject", params);
  console.log(presignedUrl);
  res.json({ data: presignedUrl });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
