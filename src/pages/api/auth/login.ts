import User from "models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { baseHandler } from "utils/apiHandler";
import connectToDB from "utils/db";
const handler = baseHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDB();
  const user = await User.find();
  res.send({ user });
});

// handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await connectToDB();
//     const user = await User.find();
//     res.send({ user });
//   } catch (err) {
//     console.log({ err });
//     res.status(500).end();
//   }
// });

export default handler;
