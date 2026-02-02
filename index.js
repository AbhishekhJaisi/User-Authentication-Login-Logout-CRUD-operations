require('dotenv').config();
const express = require("express");
const app = express();
const main = require("./database");
// const User = require("./Models/users");
const User = require("./Models/users"); // Ensure there is ONLY ONE dot
const validateUser = require("./utils/validateUser");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userAuth = require('./middleware/userAuth');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
const redisClient = require('./config/redis');


// console.log('DB_CONNECT_KEY:', process.env.DB_CONNECT_KEY);
// console.log('PORT:', process.env.PORT);
// console.log(process.env);


app.use(express.json());
app.use(cookieParser());


// ROuting from user and auth.js from Routes
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/", commentRouter);


app.get("/info", async (req, res) => {

    try {
        const token = req.cookies.token; // ✅ Store token in variable

        if (!token) {
            return res.status(401).send("Error: No token found. Please login.");
        }

        const SECRET_KEY = process.env.SECRET_KEY;
        const payload = jwt.verify(token, SECRET_KEY);
        console.log(payload);
        const result = await User.find();

        console.log(req.cookies);
        res.send(result);

    } catch (err) {
        res.send("error" + err.message);
    }
});
//API LEVEL VALIDATION IS DONE WHEN THE USER GETS ADDED IN REQ.BODY 

// app.post("/register", async (req, res) => {

//     try {

//         // Converting password into hash value using bcrypt

//         req.body.password = await bcrypt.hash(req.body.password, 10);

//         validateUser(req.body); //I created a different file named validateUser inside the utils folder in the same project, there i imported the validateUser function and used all the validators at the ssme place and used the module.exports and use that function here

//         // also when we go on the validateUser to check the function working, there the whatever is passed in the backed is sent through (req.body), so instead of writing that we have changed that to data paramter, that means both are same just to make concise 

//         await User.create(req.body);
//         res.send("User registered successfully");
//     }
//     catch (err) {
//         res.send("error " + err.message);
//     }
// })

// app.post("/login", async (req, res) => { // Validation for login by the user using email and password
//     try {
//         //Validate karna
//         //  const people = await User.find(req.body.emailId);

//         const { emailId, password } = req.body; // Destructuring

//         const people = await User.findOne({emailId:req.body.emailId}); //Extracting all the user info using findbyID()

//         // if (!(req.body.emailId === people.emailId)) // Checking if the user who entered the email through req.body matches the one from the database which we generated using findById().qqw
//         //     throw new Error("Invalid credentials");

//         const IsAllowed = await bcrypt.compare(req.body.password, people.password);
//         // the reason to use bcrypt.compare instead of === between the user GET password and the password stored in DB is because the one that is stored in DB is in hash format and the format that the user will give when trying to login will be of character which will not match.

//         if (!IsAllowed)
//             throw new Error("Invalid credentials");


//         const token = jwt.sign({_id:people._id, emailId:people.emailId},"Virat@12341", {expiresIn: 2000});

//         res.cookie("token", token);
//         res.send("Login Successfully");

//     }

//     catch (err) {
//         res.send("error" + err.message);
//     } 
// })


const InitializeConnection =  async ()=>{
    try{
        await Promise.all([redisClient.connect(), main()]); //parallel connection
        console.log("Connected to Redis");

        console.log("Connected to DB");

        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server running at port ${process.env.PORT || 4000}`);
        });

    }
    catch(err){
        console.log("Error "+ err);
    }
}

InitializeConnection();
