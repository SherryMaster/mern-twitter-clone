import jwt from "jsonwebtoken";

/**
 * @deprecated This file is deprecated and will be removed in a future release.
 * Please use the new location: '../utils/tokenUtils.js'
 */
export const generateTokenAndSetCookie = (userID, res) => {
  const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
};
