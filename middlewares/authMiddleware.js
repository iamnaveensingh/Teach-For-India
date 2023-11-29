import jwt from "jsonwebtoken";
import adminModel from "../model/adminModel.js";

export const auth = async (req, res, next) => {
  console.log(req.cookies.token)

  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send({
        success: false,
        message: "Not Authorised!, Please login",
      });
    }
    // verify token
    const verified = jwt.verify(token, process.env.JWT_Key);
    // get user id from token
    const user = await adminModel.findById(verified.id).select("-password");
    if (!user) {
      res.status(401).send({
        success: false,
        message: "User Not Found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    // throw new Error("Not Authorised!!!!!, Please login");
  }
};
