// Absolute path is a must
const path = require("path");
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");
// Using of partials -> works together with handlebars (both of .hbs)
const hbs = require("hbs");

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Handle Bar - > template engine : allows rendering dynamic docs
// : Easily create code which can be reuse setup hbs
app.set("view engine", "hbs");
app.set("views", viewsPath);
//Register partials
hbs.registerPartials(partialsPath);

// It'sa way to customerize the server , static takes the path
// serup static dir to serve
app.use(express.static(publicDirPath));

// set up route
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Lena"
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Lena"
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        messege: "This is the help messege",
        name: "Lena"
    });
});

// // configure what the server should do when someone try to get the resourse
// app.get("", (req, res) => {
//     // send something back to the requester
//     res.send(" Hello express");
// }); no longer necessary after introding path agree with both about and help too

// Creating a weather endpoint
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address field"
        });
    }
    geocode(req.query.address, (error, { lat, lng, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(lat, lng, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

// Using QueryString to set up end-points example (not part of app)
app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Lena",
        errorMessege: "Help Page Not Found"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: 404,
        name: "Lena",
        errorMessege: "Page Not Found"
    });
});
// start the server up

app.listen(port, () => {
    console.log("Server Started @ Port" + port);
});