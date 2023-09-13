const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
require("dotenv").config();
const { connectToDatabase } = require("./config/connectDB");
const app = express();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = "ahnvbkxncdsgjpoetpzk";

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(404).json({ message: "All fields are required" });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ message: "User created successfully 🔥", data: userDoc });
  } catch (e) {
    return res.status(422).json({ message: e.message });
    console.error("Request failed with status code", error.response.status);
    console.error(error.response.data); // This will show the server's error message
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    return res.status(404).json({ message: "User not found" });
  }
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (!passOk) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  // TODO : delete user password from userDoc
  // await delete userDoc.password;

  jwt.sign(
    {
      email: userDoc.email,
      id: userDoc._id,
    },
    jwtSecret,
    {},
    (err, token) => {
      if (err) throw err;
      res
        .status(200)
        .cookie("token", token)
        .json({ message: "Logged in successfully 🔥✅", loggedUser: userDoc });
    }
  );
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

// Connect to MongoDB and start the server
connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(
        `Server started on port ${PORT}, visit http://localhost:${PORT} 🚀🔥`
      );
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
