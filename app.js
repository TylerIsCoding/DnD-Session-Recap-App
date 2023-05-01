const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const app = express();

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

// Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Handlebars
// // Will throw error if .engine is not after exphbs
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Session middleware
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

connectDB();

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
