const apiKey = "95d68e7c6822af7e05a81934e767280b";

const weatherData = document.querySelector(".weather-data");
const cityName = document.getElementById('city-name');
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");
const loading = document.querySelector(".loading");
const errorMessage = document.querySelector(".error-message");


formEle.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityValue = cityName.value.trim();
    if(!cityValue){
        errorMessage.textContent = "Please enter a city name";
        errorMessage.style.display = "block";
        weatherData.style.display = "none"
        return;
    }
    errorMessage.style.display = "none";
    getWeatherData(cityValue);

})

async function getWeatherData(cityValue){
    try{

        loading.style.display = "block";
        weatherData.style.display = "none";

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

        if(!response.ok){
            throw new Error("Network is not ok")
        }

        const data = await response.json();
        
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].main;
        const icon = data.weather[0].icon;

        const details =[
            `Feels Like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${Math.round(data.wind.speed)} m/s`
        ]

        weatherData.querySelector(".temp").textContent = `${temperature}°C`;
        weatherData.querySelector(".desc").textContent = `${description}`;
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;

        weatherData.querySelector(".details").innerHTML = details.map((detail)=>{
            return `<div>${detail}</div>`;
        }).join("");

        weatherData.style.display = "block";
        loading.style.display = "none";


    }
    catch(error){
        console.error("Error fetching weather data: ",error);
        weatherData.style.display = "none";
        loading.style.display = "none";

        errorMessage.textContent = "Oops! We couldn't find that city. Please check the spelling and try again.";
        errorMessage.style.display = "block";
        
    }
}