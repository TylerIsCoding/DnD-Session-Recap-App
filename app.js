const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const app = express();

// Load config
dotenv.config({ path: "./config/config.env" });

// Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Handlebars

// Will throw error if .engine is not after exphbs
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

connectDB();

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
