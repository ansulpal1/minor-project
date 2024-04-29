const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");


// const registerController = async (req, res) => {
//     try {
//         const { name, organisationName, hospitalName, age, country, state, city, bloodGroup, lastdonation, gender, address, email, password, phone, role, location, avatar } = req.body;

//         const exisitingUser = await userModel.findOne({ email: req.body.email });
//         //validation
//         if (exisitingUser) {
//             return res.status(200).send({
//                 success: false,
//                 message: "User ALready exists",
//             });
//         }
//         const myCloud = await cloudinary.v2.uploader.upload(avatar, {
//             folder: "avatars",
//         });
//         //hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);
//         req.body.password = hashedPassword;
//         //rest data
//         const user = await User.create({
//             name, organisationName, hospitalName, age, country, state, city, bloodGroup, lastdonation, gender, address, email, password, phone, role, location,
//             avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
//         });

//         return res.status(201).send({
//             success: true,
//             message: "User Registerd Successfully",
//             user,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error Something Went  Wrong!",
//             error,
//         });
//     }
// };
const registerController = async (req, res) => {
    try {

        const exisitingUser = await userModel.findOne({ email: req.body.email });
        //validation
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "User ALready exists",
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        //rest data
        const user = new userModel(req.body);
        await user.save();
        return res.status(201).send({
            success: true,
            message: "User Registerd Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error Something Went  Wrong!",
            error,
        });
    }
};


//login call back
const loginController = async (req, res) => {
    try {
        // console.log("data", req.body);
        const user = await userModel.findOne({ email: req.body.email });
        console.log("user", user);
        if (!user) {

            return res.status(404).send({
                success: false,
                message: "Invalid Credentials",

            });
        }
        //check role
        if (user.role != req.body.role) {

            return res.status(500).send({
                success: false,
                message: "Role Dosent Match",
            });
        }
        //compare password
        const comparePassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!comparePassword) {
            console.log("check3");
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        console.log("check4");
        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Login API",
            errorMsg: error.message,
            error,
        });
    }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        return res.status(200).send({
            success: true,
            message: "User Fetched Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "unable to get current user",
            error,
        });
    }
};




module.exports = { registerController, loginController, currentUserController, };