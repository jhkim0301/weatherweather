const apiKey = "03524e301bd282a24ea4499bdae38d2f";
const weatherImage = document.getElementById('weather-container');

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    const output = `${name} <br> Temperature : ${temperature}°C <br> ${description}`;
    document.getElementById("weather").innerHTML = output;
    // weatherImage.src =`images/${description}.jpg`;
    if (description.includes('clear')) {
        weatherImage.src = "images/clear.png";
      } else if (description.includes('cloud')) {
        weatherImage.src = 'images/cloudy.png';
      } else if (description.includes('rain')) {
        weatherImage.src = 'images/rainy.png';
      } else if (description.includes('snow')) {
        weatherImage.src = 'images/snowy.png';
      } else if (description.includes('storm')) {
        weatherImage.src = 'images/storm.png';
      } else if (description.includes('fog')) {
        weatherImage.src = 'images/fog.png';
      }else {
        weatherImage.src = 'images/default.png';
      } 
}

function getCurrentLocationWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => displayWeather(data));
    });
}

function getCityWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => {
            const output = `Error: ${error.message}`;
            document.getElementById("weather").innerHTML = output;
        });
}

document.getElementById("search").addEventListener("click", () => {
    const city = document.getElementById("city").value;
    getCityWeather(city);
});

document.getElementById("city").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
      const city = document.getElementById("city").value;
      getCityWeather(city);
  }
});

getCurrentLocationWeather();

