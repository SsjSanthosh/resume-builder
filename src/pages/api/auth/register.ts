import User from "models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { baseHandler } from "utils/apiHandler";
import connectToDB from "utils/db";
const handler = baseHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();
    const user = req.body;
    console.log({ user });
    const resp = await User.create(user);
    res.send({ user: resp });
  } catch (err) {
    console.log({ err });
    res.status(500).end();
  }
});

export default handler;
