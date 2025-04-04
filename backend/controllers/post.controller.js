import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { uploadImage, deleteImage, getPublicIdFromUrl } from "../utils/cloudinaryUtils.js";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!text && !img) {
      return res.status(400).json({
        success: false,
        message: "Text or image is required",
      });
    }

    if (img) {
      const imagePath = req.files.img[0].path;
      const uploadResult = await uploadImage(imagePath, "twitter-clone/post-images");
      
      if (!uploadResult.success) {
        return res.status(400).json({
          success: false,
          message: "Failed to upload image",
          error: uploadResult.error,
        });
      }
      
      img = uploadResult.url;
    }

    const post = await Post.create({
      user: userId,
      text,
      img,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - You can only delete your own posts",
      });
    }

    if (post.img) {
      const publicId = getPublicIdFromUrl(post.img);
      if (publicId) {
        await deleteImage(publicId);
      }
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

