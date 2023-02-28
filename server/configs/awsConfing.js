const AWS = require("aws-sdk");
console.log(process.env.REGION);
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECERETACCESSKEY,
});

let s3 = new AWS.S3();
module.exports = s3;
