console.log("Client Side Js");

// js representation of an element

const weatherForm = document.querySelector("form");
const searchEl = document.querySelector("input");
const messegeOne = document.querySelector("#messege-1");
const messegeTwo = document.querySelector("#messege-2");
// messegeOne.textContent = " From js"
// add event listner
weatherForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const location = searchEl.value;

    messegeOne.textContent = "Loading...";
    messegeTwo.textContent = "";
    // getting data at client-side : fetch the forecast
    // to make http req from the client side js we can use "Fetch API" :- Browser based API
    fetch("http://localhost:3000/weather?address=" + location).then(res => {
        res.json().then(data => {
            if (data.error) {
                messegeOne.textContent = data.error;
            } else {
                messegeOne.textContent = data.location;
                messegeTwo.textContent = data.forecast;
            }
        });
    });
});