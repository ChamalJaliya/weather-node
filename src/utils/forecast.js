const request = require("request");
// make use of object destructuring
const forecast = (lat, lng, callback) => {
    const url =
        "https://api.darksky.net/forecast/d9ecd1b743e5cbf3f017d744f512f62b/" +
        lat +
        "," +
        lng +
        "?units=si";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather services", undefined);
        } else if (body.error) {
            callback("Unable to fetch the location try again", undefined);
        } else {

            callback(
                undefined,
                body.daily.data[0].summary +
                "It's currently " +
                body.currently.temperature +
                "°C degrees out ,The high today is a " +
                body.daily.data[0].temperatureHigh +
                "°C degrees with a low of " +
                body.daily.data[0].temperatureLow +
                "°C degrees with probability of " +
                body.currently.precipProbability +
                " %  chance of raining ."
            );
        }
    });
};

module.exports = forecast;