import { createUser } from "@/firebase/CRUD/addUser";
import * as uuid from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import { ExtendedNewsLetter, NewsLetter } from "@/types/newsLetterType";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, name }: NewsLetter = req.body;
    const payload: ExtendedNewsLetter = {
      uuid: uuid.v4(),
      email: email,
      name: name,
    };
    try {
      await createUser("userData", payload);
      return res.status(200).send({ email: email, name: name });
    } catch (err) {
       
      return res.status(403).send({err: `User with email ${email} already exists`});
    }
  }
}
export default handler;
