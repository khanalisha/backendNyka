require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    jwt.verify(token, process.env.secretkey, function (err, decoded) {
      if (decoded) {
        {
          req.body.userId = decoded.userId;
        }
        next();
      } else {
        res.send({ err: "something wrong login again" });
      }
    });
  } catch (error) {
    res.send({ err: "something wrong login again" });
  }
};

module.exports = {
  auth,
};
