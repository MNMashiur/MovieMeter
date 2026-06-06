const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.cjs");

const router = express.Router();

//
// REGISTER
//
router.post("/register", async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    // check existing user
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // create user
    const user = new User({

      firstName,
      lastName,

      email,

      password: hashedPassword
    });

    await user.save();

    res.json({
      message:
        "Registration Successful"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

//
// LOGIN
//
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // find user
    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });
    }

    // compare password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // create token
    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }
    );

    // send response
    res.json({

      token,

      user: {

        id: user._id,

        firstName:
          user.firstName,

        lastName:
          user.lastName,

        email:
          user.email
      }
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

//
// UPDATE USER
//
router.put("/update/:id", async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    const updateData = {
      firstName,
      lastName,
      email
    };

    // hash new password if entered
    if (password && password.trim() !== "") {

      const hashedPassword =
        await bcrypt.hash(password, 10);

      updateData.password =
        hashedPassword;
    }

    const updatedUser =
      await User.findByIdAndUpdate(

        req.params.id,

        updateData,

        { new: true }

      );

    res.json({

      token,

      user: {

        id: user._id,

        firstName:
          user.firstName,

        lastName:
          user.lastName,

        email:
          user.email
      }
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;