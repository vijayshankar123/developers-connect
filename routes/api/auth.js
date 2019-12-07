const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const User = require("../../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//
router.get("/api/auth", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send("server error");
    }
})
// login user 
router.post("/api/auth", async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "invalid credentials" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) {
                throw err
            }
            else {
                res.json({ token })
            }
        })


    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }


})


module.exports = router;