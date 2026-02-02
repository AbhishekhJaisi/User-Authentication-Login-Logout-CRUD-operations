const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../Models/users");
const jwt = require('jsonwebtoken');

const userAuth = require('../middleware/userAuth');


const userRouter = express.Router(); // Code for routing

userRouter.get("/", userAuth, async (req, res) => {
    try {

        res.send(req.result);

    } catch (err) {
        res.errored("error" + err.message);
    }
});

userRouter.get("/:id", userAuth, async (req, res) => {

    try {
        const result = await User.findById(req.params.id);
        res.send(result)
    }

    catch (err) {
        res.send("error" + err.message);

    }
});

userRouter.delete("/:id", userAuth, async (req, res) => {

    try {
        const result = await User.findByIdAndDelete(req.params.id);
        res.send("Item deleted");
    }

    catch (err) {
        res.send("error" + err.message);

    }
});

userRouter.patch("/", userAuth, async (req, res) => {
    try {

        const { _id, ...update } = req.body;
        await User.findByIdAndUpdate(_id, update);
        res.send("Updated successfully");

    } catch (err) {
        res.send("error" + err.message);

    }
});

module.exports = userRouter;