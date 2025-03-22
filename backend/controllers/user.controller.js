import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const followUnfollowUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user._id);
    const userToFollow = await User.findById(id);

    let message = "";

    // prevent user to follow himself
    if (user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.following.includes(userToFollow._id)) {
      user.following = user.following.filter(
        (followingId) => followingId.toString() !== userToFollow._id.toString()
      );
      userToFollow.followers = userToFollow.followers.filter(
        (followerId) => followerId.toString() !== user._id.toString()
      );
      message = "User unfollowed successfully";
    } else {
      user.following.push(userToFollow._id);
      userToFollow.followers.push(user._id);
      message = "User followed successfully";
    }

    await user.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
