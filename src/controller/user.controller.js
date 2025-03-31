import { compare, hash } from "bcrypt";
import userModel from "../model/user.model.js";

const register = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    const foundUser = await userModel.findOne({$or: [ {email}, {phoneNumber} ]})

    if(foundUser){
        return res.status(409).send({
            message: "User already exists, try another email or phone number"
        })
    }

    const passwordHash = await hash(password, 10)

    const user = await userModel.create({
        email,
        phoneNumber,
        name,
        password: passwordHash,
    });

    res.status(201).send({
        message: "Succes",
        data: user
    });
}

const login = async (req, res) => {
    const { email, password} = req.body;

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(404).send({
            message: "User not found",
        });
    }

    const isMatch = await compare(password, user.password);

     if(!isMatch){
        return res.status(401).send({
            message: "Invalid password",
        });
    }

    res.send({
        message: "Succes",
        data: user,
    });
};

const getAllUsers = async (req, res) => {
    const users = await userModel.find();

    res.send({
        message: "Succes",
        count: users.length,
        data: users,
    });
}

export default { register, getAllUsers, login }