import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECTRET_KEY, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECTRET_KEY);
  } catch (err) {
    return null;
  }
};
