const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const auth = require("../middleware/auth");
const { 
    getEntries,
     createEntry,
      getEntryById,
       updateEntry,
        deleteEntry,
     } = require("../controllers/entries/entries");

     router.use(auth);

router.get("/", getEntries);

router.post(
    "/",
    auth,
    celebrate({
        body: Joi.object().keys({
            title: Joi.string().min(1).max(100).required(),
            body: Joi.string().min(1).max(5000).required(),
            mood: Joi.string()
            .valid("calm", "grateful", "anxious", "joyful", "sad", "angry", "neutral")
            .optional(),
            tags: Joi.array().items(Joi.string()).optional(),
        }),
    }),
    createEntry
);

router.get(
    "/:id", 
    auth, 
    celebrate({
        params: Joi.object().keys({
            id: Joi.string().hex().length(24).required(),
        }),
    }),
    getEntryById
);

router.patch(
    "/:id",
    auth,
    celebrate({
        params: Joi.object().keys({
            id: Joi.string().hex().length(24).required(),
        }),
        body: Joi.object()
        .keys({
            title: Joi.string().min(1).max(100),
            body: Joi.string().min(1).max(5000),
            mood: Joi.string().valid(
                "calm",
                "grateful", 
                "anxious",
                "joyful",
                "sad",
                "angry",
                "neutral"
            ),
            tags: Joi.array().items(Joi.string()),
        })
        .min(1),
    }),
        updateEntry
    );

    router.delete(
        "/:id",
         auth,
        celebrate({
            params: Joi.object().keys({
                id: Joi.string().hex().length(24).required(),
            }),
        }),
        deleteEntry
    );

module.exports = router;