const router = require("express").Router();

router.get("/quote/today", async (req, res) => {
    try {
        const response = await fetch("https://zenquotes.io/api/today");


        if (!response.ok) {
            return res.status(502).send({
                q: "take a deep breath. You are making progress.",
                a: "Reflect",
            });
        }

        const data = await response.json();
        const quote = Array.isArray(data) ? data[0] : null;

        if (!quote || typeof quote.q !== "string" || typeof quote.a !== "string") {
            return res.status(502).send({
                q: "Small steps every day add up to big change.",
                a: "Reflect",
            });
        }

        return res.send({ q: quote.q, a: quote.a });
    } catch (err) {
        return res.status(502).send({
            q: "Even when things don't load, you can still move forward.",
            a: "Reflect",
        });
    }
});

module.exports = router;