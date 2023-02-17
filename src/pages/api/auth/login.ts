import User from "models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDB from "utils/db";
import { generateZodError } from "utils/helpers";
import { loginRouteValidator } from "utils/validators";
import baseHandler from "utils/apiHandler";
const handler = baseHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const validate = loginRouteValidator.safeParse(req.body);
    if (validate.success) {
      try {
        await connectToDB();
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          res.status(404).send({ message: "User not found" });
        } else {
          const passwordCheck = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (passwordCheck) {
            const token = jwt.sign(
              {
                user_id: user.id,
              },
              process.env.JWT_SECRET as string
            );
            res.send({ token });
          } else res.status(422).end();
        }
      } catch (err) {
        console.log({ err });
        res.status(500).end();
      }
    } else {
      const errors = generateZodError(validate.error);
      res.status(400).send({ message: "Invalid request parameters.", errors });
    }
  } catch (err) {
    console.log({ err });
    res.status(500).end();
  }
});

export default handler;
