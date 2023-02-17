import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export const baseHandler = () => {
  return nc({
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) =>
      res.status(404).send({
        message: `API route not found: ${req.url}`,
      }),
  });
};
