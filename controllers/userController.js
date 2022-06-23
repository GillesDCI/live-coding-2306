import bcrypt from 'bcrypt';
import User from './../models/User.js';
import authenticationHelper from './../helpers/authenticationHelper.js';

/**
 * Controller method to get all users
 * @param {*} req 
 * @param {*} res 
 */
export const getAllUsers = async(req, res) => {
    const users = await User.find({}).select('firstname lastname'); //.select (select only the firstname and lastname fields)
    return res.status(200).json(users);
}

/**
 * Controller method to login the user.
 * @param {*} req 
 * @param {*} res 
 */
export const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        //check if there's a password
        if(!password){
            return res.status(400).json({message:'No password supplied'});
        }

        const user = await User.findOne({email:email});

        if(user === null){
            return res.status(400).json({message:"No user found"});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(checkPassword){
            console.log("yaaay authenticated");
            const token = await authenticationHelper.generateToken(user);
            //return res.status(200).json({message:'You are authenticated!', token:token});

            const userToReturn = {
                username:user.username
            }

            return res.status(200).cookie("jwt",token,{
                httpOnly:true,
                secure:false,
                sameSite:"lax"
            })
            .json({
                message:'Login succesful',
                user:userToReturn
            });


        } else {
            return res.status(400).json({message:'Passwords not matching'});
        }

    } catch (error) {
        return res.status(400).json({message:'General error upon signing in.'})
    }
}

export const logout = async(req, res) => {
    //remove the httponly cookie
    res.clearCookie("jwt",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })
    .json({message:'You are logged out.'})
}

/**
 * Controller method to register the user
 * @param {*} req 
 * @param {*} res 
 */
export const register = async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    try {
        const userToAdd = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        

        //roles: "ADMIN,SALES,ACCOUNTANT"
        const roles = req.body.roles.split(',');

        roles.forEach((role) => {
            userToAdd.roles.push(role);
        });

        //alternative way of creating a user.
        const resultUser = await userToAdd.save();

        return res.status(200).json({message:'User was created', createdUser:resultUser})
    } catch (error) {
        return res.status(400).json({message:'Error happened', error:error})
    }
}

/**
 * Controller method to get the user profile
 * @param {*} req 
 * @param {*} res 
 */
export const getProfile = async(req, res) => {
    return res.status(200).json({profile:req.user});
}