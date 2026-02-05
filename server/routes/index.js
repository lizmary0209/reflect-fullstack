const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { signup, signin } = require("../controllers/auth");
const auth = require("../middleware/auth");
const { getCurrentUser } = require("../controllers/users/getCurrentUser");

router.get("/health", (req, res) => {
    res.status(200).send({ status: "ok", app: "reflect-backend" });
});

router.post(
    "/signup",
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().min(2).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        }),
    }),
    signup
);

router.post(
    "/signin",
    celebrate({
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
    signin
);

router.get("/users/me", auth, getCurrentUser);

module.exports = router;