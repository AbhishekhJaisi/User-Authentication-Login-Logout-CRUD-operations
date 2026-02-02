const jwt = require('jsonwebtoken');
const User = require("../Models/users");
// const userAuth = require("../middleware/userAuth");
const redisClient = require("../config/redis");

const userAuth = async (req, res, next) => {
    try {
        // 1st- Check if the token exist
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid token");
        }

        //2nd, REDIS validation- Check if the token is blocked and stored in redis, if yes the session will result invalid token and the user will not be able to login after this step.
        const IsBlocked = await redisClient.exists(`token:${token}`);
        if (IsBlocked) {
            throw new Error("Invalid token");
        }

        // 3rd- Verify JWT
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const { _id } = payload;
        if (!_id) {
            throw new Error("Id is missing");
        }

        // 4th- Find user
        const result = await User.findById(_id);
        if (!result) {
            throw new Error("User does not");
        }

        req.result = result;
        next();

    } catch (err) {
        res.send("Error: " + err.message);
    }
}

module.exports = userAuth;