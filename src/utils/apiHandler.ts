import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextConnect, NextHandler } from "next-connect";
import jwt, { JwtPayload } from "jsonwebtoken";
import Cors from "cors";
import connectToDB from "./db";
import User from "models/user";
import { CustomApiRequest } from "./types";

const baseHandler = () => {
  return nc({
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) =>
      res.status(404).send({
        message: `API route not found: ${req.url}`,
      }),
  });
};

baseHandler().use(async (req, res, next) => {
  await Cors({ methods: ["POST", "GET", "DELETE", "PUT", "PATCH"] });
  next();
});

export default baseHandler;

export const authMiddleware = async (
  req: CustomApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const token = req.headers["authorization"]?.split("Bearer ")[1];
  console.log(req.headers);
  if (!token) {
    res
      .status(401)
      .send({ message: "Unauthorized access, please login and try again." });
    return;
  }
  try {
    const userToken = jwt.verify(token, process.env.JWT_SECRET as string);
    await connectToDB();
    const user = await User.findOne({ id: (userToken as JwtPayload).id });
    if (!user) {
      res.status(401).send({
        message: "Unauthorized access, please login and try again.",
      });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({
      message: "Unauthorized access, please login and try again.",
    });
  }

  // const user = await User.findOne({id:})
};
