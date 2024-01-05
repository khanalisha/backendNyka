const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { product } = require("./routes/product.route");
const { userRouter } = require("./routes/user.route");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(product);
app.use(userRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connect now");
    console.log(`server is running port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
