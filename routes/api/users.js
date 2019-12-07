const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User")

//register user 
router.post("/api/users", async (req, res) => {
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: "user already exists" })
        }

        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

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