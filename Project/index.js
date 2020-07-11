const port = 3000;
let createError = require("http-errors");
let express = require("express");
let path = require("path");

let logger = require("morgan");

let indexRouter = require("./routes/index");


const hbs = require("express-handlebars");
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(
    "hbs",
    hbs({
        helpers: multihelpers,
        partialsDir: ["views/partials"],
        extname: ".hbs",
        layoutsDir: "views",
        defaultLayout: "layout"
    })
);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running... on port " + port || process.env.PORT));
module.exports = app;