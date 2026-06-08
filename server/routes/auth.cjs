const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User =
  require("../models/User.cjs");

const router =
  express.Router();

//
// REGISTER
//
router.post(
  "/register",

  async (req, res) => {

    try {

      const {

        firstName,

        lastName,

        email,

        password

      } = req.body;

      // check existing user
      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400).json({

          message:
            "User already exists"
        });
      }

      // hash password
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // create user
      const newUser =
        new User({

          firstName,

          lastName,

          email,

          password:
            hashedPassword
        });

      await newUser.save();

      // create token
      const token =
        jwt.sign(

          {
            id: newUser._id
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d"
          }
        );

      // response
      res.json({

        message:
          "Registration Successful",

        token,

        user: {

          _id:
            newUser._id,

          firstName:
            newUser.firstName,

          lastName:
            newUser.lastName,

          email:
            newUser.email
        }
      });

    } catch (err) {

      res.status(500).json({

        error:
          err.message
      });
    }
});

//
// LOGIN
//
router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // find user
      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(400).json({

          message:
            "User not found"
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

          message:
            "Invalid credentials"
        });
      }

      // create token
      const token =
        jwt.sign(

          {
            id: user._id
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d"
          }
        );

      // response
      res.json({

        token,

        user: {

          _id:
            user._id,

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

        error:
          err.message
      });
    }
});

//
// UPDATE USER
//
router.put(
  "/update/:id",

  async (req, res) => {

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

      // hash new password
      if (
        password &&
        password.trim() !== ""
      ) {

        const hashedPassword =
          await bcrypt.hash(
            password,
            10
          );

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

        message:
          "Profile updated",

        user: {

          _id:
            updatedUser._id,

          firstName:
            updatedUser.firstName,

          lastName:
            updatedUser.lastName,

          email:
            updatedUser.email
        }
      });

    } catch (err) {

      res.status(500).json({

        error:
          err.message
      });
    }
});

module.exports = router;