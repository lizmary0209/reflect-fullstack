const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { JWT_SECRET = "dev-secret-change-me" } = process.env;

module.exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({ 
            name, 
            email, 
            password: hash,
        });

        res.status(201).send({ 
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).send({ message: "Email already exists" });
        }
        res.status(500).send({ message: "Server error" });
    }
};

module.exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).send({ message: "Incorrect email or password" });
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.status(401).send({ message: "Incorrect email or password" });
        }

        const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.send({ token });
    } catch (err) {
        res.status(500).send({ message: "Server error" });
    }
};