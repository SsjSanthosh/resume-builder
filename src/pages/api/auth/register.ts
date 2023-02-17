import bcrypt from "bcryptjs";
import User from "models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { baseHandler } from "utils/apiHandler";
import connectToDB from "utils/db";
import { AVATAR_GENERATOR_API } from "utils/endpoints";
import { generateZodError } from "utils/helpers";
import { registerRouteValidator } from "utils/validators";
import z from "zod";
const handler = baseHandler();

type RegisterRouteBody = z.infer<typeof registerRouteValidator>;

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const validate = registerRouteValidator.safeParse(req.body);
    if (validate.success) {
      await connectToDB();
      const avatar = AVATAR_GENERATOR_API.replace("{email}", req.body.email);
      const salt = bcrypt.genSaltSync(12);
      const password = bcrypt.hashSync(req.body.password, salt);
      const user = { ...req.body, avatar, password };
      const resp = await User.create(user);
      delete resp.password;
      delete resp.__v;
      res.send({ user: resp });
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
