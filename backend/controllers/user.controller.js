import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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

      // Create notification only when following a user
      const newNotification = new Notification({
        from: user._id, // id of the current user
        to: userToFollow._id, // id of the user to send notification to
        type: "follow", // type of notification
      });

      await newNotification.save();
    }

    await user.save();
    await userToFollow.save();

    // TODO: return the id of user as response
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

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId);

    const suggestedUsers = await User.aggregate([
      {
        $match: {
          $and: [
            { _id: { $ne: userId } }, // Exclude the current user
            { _id: { $nin: currentUser.following } }, // Exclude users already followed
          ],
        },
      }, // Sample 4 random users from the remaining users
      { $sample: { size: 4 } }, // Project the fields to exclude password
      { $project: { password: 0 } },
    ]);

    res.status(200).json({
      success: true,
      message:
        suggestedUsers.length > 0
          ? "Suggested users retrieved successfully"
          : "No users available to follow",
      data: suggestedUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      firstName,
      lastName,
      username,
      email,
      currentPassword,
      newPassword,
      bio,
      profileImg,
      coverImg,
    } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create an updates object to track changes
    const updates = {};
    const updatedFields = [];

    // Handle username update
    if (username !== undefined && username !== user.username) {
      // Check if username is empty
      if (username === "") {
        return res.status(400).json({
          success: false,
          message: "Username cannot be empty",
        });
      }

      // Check if username is already taken
      const existingUsername = await User.findOne({
        username,
        _id: { $ne: userId },
      });

      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }

      updates.username = username;
      updatedFields.push("username");
    }

    // Handle email update
    if (email !== undefined && email !== user.email) {
      // Check if email is empty
      if (email === "") {
        return res.status(400).json({
          success: false,
          message: "Email cannot be empty",
        });
      }

      // Validate email format
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
        });
      }

      // Check if email is already taken
      const existingEmail = await User.findOne({
        email,
        _id: { $ne: userId },
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already taken",
        });
      }

      updates.email = email;
      updatedFields.push("email");
    }

    // Handle name updates
    if (firstName !== undefined && firstName !== user.firstName) {
      if (firstName === "") {
        return res.status(400).json({
          success: false,
          message: "First name cannot be empty",
        });
      }
      updates.firstName = firstName;
      updatedFields.push("firstName");
    }

    if (lastName !== undefined && lastName !== user.lastName) {
      if (lastName === "") {
        return res.status(400).json({
          success: false,
          message: "Last name cannot be empty",
        });
      }
      updates.lastName = lastName;
      updatedFields.push("lastName");
    }

    // Handle optional fields
    if (bio !== undefined && bio !== user.bio) {
      updates.bio = bio;
      updatedFields.push("bio");
    }

    if (profileImg !== undefined && profileImg !== user.profileImg) {
      updates.profileImg = profileImg;
      updatedFields.push("profileImg");
    }

    if (coverImg !== undefined && coverImg !== user.coverImg) {
      updates.coverImg = coverImg;
      updatedFields.push("coverImg");
    }

    // Handle password update with verification
    let passwordUpdated = false;
    if (newPassword !== undefined) {
      // If new password is provided, current password is required
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password is required to update password",
        });
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Validate new password
      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 8 characters long",
        });
      }

      // Update password
      user.password = await bcrypt.hash(newPassword, 10);
      passwordUpdated = true;
      updatedFields.push("password");
    }

    // Apply non-password updates if there are any
    if (Object.keys(updates).length > 0) {
      Object.assign(user, updates);
    }

    // Save the user if there were any updates
    if (Object.keys(updates).length > 0 || passwordUpdated) {
      await user.save();
    }

    // Return the updated user without password
    const updatedUser = await User.findById(userId).select("-password");

    // Prepare response message
    let message = "No changes were made";
    if (updatedFields.length > 0) {
      message = `User updated successfully. Updated fields: ${updatedFields.join(
        ", "
      )}`;
    }

    res.status(200).json({
      success: true,
      message: message,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
