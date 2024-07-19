import { User } from '../../../DB/models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Token } from '../../../DB/models/token.model.js';

export const register = async (req, res, next) => {
    // data from request
    const { email, userName, password } = req.body;
    // check user existence
    const ifuser = await User.findOne({ email });
    if (ifuser) return next(new Error("user already exist ", { cause: 409 }));
    //   hash password
    const hashpassword = bcryptjs.hashSync(
        password,
        parseInt(process.env.SALT_ROUND)
    );
    //   generate token
    const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
    //   create user
    const user = await User.create({ ...req.body, password: hashpassword });
    // send response
    return res
        .status(201)
        .json({ success: true, message: "acount created successfully" });
};

export const login = async (req, res, next) => {
    // data from request
    const { email, password } = req.body;
    // check email
    const user = await User.findOne({ email });
    if (!user) return next(new Error('invalid email!', { cause: 404 }));
    // check passwrod
    const match = bcryptjs.compareSync(password, user.password);
    if (!match) return next(new Error('invalid password!', { cause: 404 }));
    //   create token
    const token = jwt.sign({ email, id: user._id }, process.env.TOKEN_SECRET);
    //   save token in Token model
    await Token.create({ token, user: user._id });
    //   send response
    res.json({ success: true, results: token });
  };
  