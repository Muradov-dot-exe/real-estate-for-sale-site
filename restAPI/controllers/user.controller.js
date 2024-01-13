exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const cookie = require("cookie"); // Import the 'cookie' module

const Role = db.role;

exports.userInfo = async (req, res) => {
  const userId = req.session.userId;
  req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;

  try {
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email"],
      include: {
        model: Role,
        as: "roles", // Specify the alias for the association
        attributes: ["name"], // Include only the 'name' attribute of the role
        through: { attributes: [] }, // Exclude the junction table attributes from the result
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    // Extract roles from the user object and send it in the response
    const roles = user?.roles?.map((role) => role.name) || [];

    // Generate a new JWT token
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });

    // Set the token as an HttpOnly cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/",
      })
    );

    res
      .status(200)
      .send({ id: user.id, username: user.username, email: user.email, roles });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
