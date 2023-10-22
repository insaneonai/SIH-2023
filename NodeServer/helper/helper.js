import { randomUUID } from "crypto";
import { hash } from "bcrypt";
import { UserModel } from "../models/Usermodel.js";
const saltRounds = 10;

const generateToken = async () => {
    const token = randomUUID();
    const hashedToken = await hash(token, saltRounds);
    console.log(hashedToken);
}

generateToken()