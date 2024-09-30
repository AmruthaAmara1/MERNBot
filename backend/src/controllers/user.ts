import {Request, Response, NextFunction} from "express";
import user from "../models/user.js";
import {hash, compare} from "bcrypt";

export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    //fetch all users
    try {
        const users = await user.find();
        return res.status(200).json({message:"Ok", users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error", cause: error.message});
    }
};

export const userSignup = async (req:Request, res:Response, next:NextFunction) => {
    //user signup
    try {
        const {name, email, password} = req.body;
        const existingUser = await user.findOne({email});
        if (existingUser) return res.status(401).send("User already registered");
        const hashedPassword = await hash(password, 10);
        const _user = new user({name, email, password:hashedPassword});
        await _user.save();
        return res.status(201).json({message:"Ok", id:_user._id.toString()});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error", cause: error.message});
    }
};

export const userLogin = async (req:Request, res:Response, next:NextFunction) => {
    //user login
    try {
        const {email, password} = req.body;
        const _user = await user.findOne({email});
        if (!user){
            return res.status(401).send("User is not registered");
        } 

        const isPwdCorrect = await compare(password, _user.password);
        if (!isPwdCorrect){
            return res.status(403).send("Incorrect Password");
        }

        return res.status(201).json({message: "Ok", id: _user._id.toString()});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error", cause: error.message});
    }
};