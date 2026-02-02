const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../Models/users");
const jwt = require('jsonwebtoken');
const validateUser = require('../utils/validateUser');
const redisClient = require('../config/redis');
const userAuth = require('../middleware/userAuth');



const authRouter = express.Router();
 

authRouter.post("/register", async (req, res) => {
    try {
        // ✅ Step 1: Validate user data FIRST, the user gives all his information when signing up
        validateUser(req.body); //it will check if the email,password,name everything matches as per required conditions which we gave in validateUser.

        // ✅ Step 2: Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //since we need our password to be safe when registering
        
        // ✅ Step 3: Create new object with hashed password, so after hashing the password, when the user click the signUp button with all the information, an object is created, userData which will store all info in JS object form and also include the password but override it with the hashed one. now we proceed it in saving in the database
        const userData = {
            ...req.body,              // Copy all fields from req.body
            password: hashedPassword  // Override with hashed password
        };

        // ✅ Step 4: Save to database
        await User.create(userData);

        res.send("User registered successfully");
    } catch (err) {
        res.send("error " + err.message);
    }
});

// authRouter.post("/login", async (req, res) => {
//     try {
//         // STEP 1: Extract credentials
//         // const { emailId } = req.body;

//         // STEP 2: Find user by email
//         const people = await User.findOne({ emailId: req.body.emailId });

//         if (!people) {
//             throw new Error("User not found");
//         }

//         // STEP 3: Compare passwords (bcrypt magic!)
//         const IsAllowed = await people.verifyPassword(req.body.password);

//         if (!IsAllowed) {
//             throw new Error("Invalid credentials");
//         }

//         // STEP 4: Create JWT token (Digital Signature!)
//         const token = people.getJWT();



//         // STEP 5: Send token to browser as cookie
//         res.cookie("token", token);

//         res.send("Login Successfully");

//     } catch (err) {
//         res.send("error" + err.message);
//     }
// });

authRouter.post("/login", async (req, res) => {
    try {
        console.log("Login attempt for:", req.body.emailId);
        
        // STEP 1: Find user by email
        const people = await User.findOne({ emailId: req.body.emailId });
        
        console.log("User found:", people ? "Yes" : "No");
        
        if (!people) {
            throw new Error("User not found");
        }

        console.log("Stored password hash:", people.password);
        console.log("Entered password:", req.body.password);
        
        // STEP 2: Compare passwords
        const IsAllowed = await people.verifyPassword(req.body.password);
        
        console.log("Password match:", IsAllowed);

        if (!IsAllowed) {
            throw new Error("Invalid credentials");
        }

        // STEP 3: Create JWT token
        const token = people.getJWT();
        
        res.cookie("token", token);
        res.send("Login Successfully");

    } catch (err) {
        console.log("Login error:", err.message);
        res.send("error: " + err.message);
    }
});


module.exports = authRouter;