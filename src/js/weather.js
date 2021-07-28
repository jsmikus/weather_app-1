let weather = {
    apiKey: "b46c8e3eefa9bb5cf960f7e25c6f23c9",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?&lang=pl&q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { pressure } = data.main;

        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src =
            "icons/" + icon + ".png";
        // "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.floor(temp) + "°C";
        document.querySelector(".humidity").innerText =
            "Wilgotność: " + humidity + "%";
        document.querySelector(".pressure").innerText =
            "Ciśnienie: " + pressure + " hPa";
        document.querySelector(".wind").innerText =
            "Szybkość wiatru: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Krakow");
