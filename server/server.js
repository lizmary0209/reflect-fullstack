require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const { PORT = 3001, MONGO_URI } = process.env;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

if (!MONGO_URI) {
    console.error("Mongo connection error: MONGO_URI is missing");
} else {
mongoose
.connect(MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Mongo connection error:", err.message);
});
}


   