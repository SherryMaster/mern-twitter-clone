import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * Upload an image to Cloudinary
 * @param {string} imagePath - Path to the image file
 * @param {string} folder - Cloudinary folder to store the image
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadImage = async (imagePath, folder = "twitter-clone") => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      resource_type: "image",
    });

    // Remove the temporary file
    fs.unlinkSync(imagePath);

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    // Remove the temporary file if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Cloudinary public ID of the image
 * @returns {Promise<Object>} - Cloudinary deletion result
 */
export const deleteImage = async (publicId) => {
  try {
    if (!publicId) {
      return {
        success: false,
        error: "No public ID provided",
      };
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    return {
      success: result.result === "ok",
      result: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} - Public ID or null if not found
 */
export const getPublicIdFromUrl = (url) => {
  if (!url) return null;

  try {
    // Extract the public ID from the URL
    // Format: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/public-id.jpg
    const urlParts = url.split("/");
    const filenamePart = urlParts[urlParts.length - 1];
    const publicIdParts = urlParts.slice(urlParts.length - 2, urlParts.length);

    // Remove file extension
    const publicId = publicIdParts.join("/").split(".")[0];

    return publicId;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};
