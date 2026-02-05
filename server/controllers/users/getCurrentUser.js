const User = require("../../models/User");

module.exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send({ 
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        res.status(500).send({ message: "Server error" });
    }
};