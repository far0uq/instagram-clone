const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const followController = {
  addFollow: async (req, res) => {
    try {
      const loggedInUserToken = req.headers["authorization"].slice(7);
      let payload = jwt.decode(loggedInUserToken, "f3o2fvmdlleo");
      let emailToFind = payload.email;
      const userRequestingFollow = await User.findOne({
        email: emailToFind,
      }).exec();

      const { currentUserToken } = req.body;
      payload = jwt.decode(currentUserToken, "f3o2fvmdlleo");
      emailToFind = payload.email;
      const userToFollow = await User.findOne({
        email: emailToFind,
      }).exec();

      userToFollow.followers.push(userRequestingFollow._id);
      userRequestingFollow.following.push(userToFollow._id);

      await userToFollow.save();
      await userRequestingFollow.save();

      return res.json({
        status: 200,
        following: true,
      });
    } catch {
      return res.json({
        status: 400,
      });
    }
  },
  removeFollow: async (req, res) => {
    try {
      const loggedInUserToken = req.headers["authorization"].slice(7);
      let payload = jwt.decode(loggedInUserToken, "f3o2fvmdlleo");
      let emailToFind = payload.email;
      const userRequestingFollow = await User.findOne({
        email: emailToFind,
      }).exec();

      const { currentUserToken } = req.body;
      payload = jwt.decode(currentUserToken, "f3o2fvmdlleo");
      emailToFind = payload.email;
      const userToFollow = await User.findOne({
        email: emailToFind,
      }).exec();

      const userToFollowIndex = userToFollow.followers.indexOf(
        userRequestingFollow._id
      );
      const userRequestingFollowIndex = userRequestingFollow.following.indexOf(
        userToFollow._id
      );

      userToFollow.followers.splice(userRequestingFollowIndex, 1);
      userRequestingFollow.following.splice(userToFollowIndex, 1);

      await userToFollow.save();
      await userRequestingFollow.save();

      return res.json({
        status: 200,
        following: false,
      });
    } catch {
      return res.json({
        status: 400,
      });
    }
  },
  fetchFollowStatus: async (req, res) => {
    try {
      const rawToken = req.headers["authorization"];
      if (rawToken) {
        const loggedInUserToken = req.headers["authorization"].slice(7);
        let payload = jwt.decode(loggedInUserToken, "f3o2fvmdlleo");
        let emailToFind = payload.email;
        const userRequestingFollow = await User.findOne({
          email: emailToFind,
        }).exec();

        const { currentUserToken } = req.body;
        payload = jwt.decode(currentUserToken, "f3o2fvmdlleo");
        emailToFind = payload.email;
        const userToFollow = await User.findOne({
          email: emailToFind,
        }).exec();

        const userToFollowIndex = userToFollow.followers.indexOf(
          userRequestingFollow._id
        );

        if (userToFollowIndex === -1) {
          return res.json({
            status: 200,
            following: false,
          });
        } else {
          return res.json({
            status: 200,
            following: true,
          });
        }
      } else {
        return res.json({
          status: 404,
        });
      }
    } catch {
      return res.json({
        status: 400,
      });
    }
  },
};

module.exports = followController;
