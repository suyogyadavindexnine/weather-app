document.querySelector("#time").innerHTML = new Date().toLocaleTimeString([], { timeStyle: 'short' });

let unitselect = document.querySelector("#unitselect");
let searchbtn = document.querySelector("#searchbtn");
let phrase = document.querySelector("#phrase");
let cityselect = document.querySelector("#cityselect");
let cities = ["Pune","Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai","Nagpur","Nanded","Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"];

cities.forEach((city)=>{
    let option = document.createElement("option");
    option.innerText = option.value = city;
    cityselect.appendChild(option);
})

async function getOpenWeatherData(city, unit) {
    let featchdata = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&APPID=6031981da90e4136101f4f08bdfafcd6");
    let data = await featchdata.json()
    console.log(data);
    return data;
}

async function getimpdata(city, unit) {
    let result = await getOpenWeatherData(city, unit);

    let impdata = {
        temp: result.main.temp,
        feelsLike: result.main.feels_like,
        disc: result.weather[0].description,
        tempMin: result.main.temp_min,
        tempMax: result.main.temp_max,
        clouds: result.clouds.all,
        humidity: result.main.humidity,
        visibility: result.visibility,
        windSpeed: result.wind.speed,
        weathericon : result.weather[0].icon,
    }

    console.log(impdata);
    return impdata;
}

async function init(city, unit) {
    let data = await getimpdata(city, unit);
    if (unit == "metric") {
        document.querySelector("#temp").innerHTML = data.temp + "°c";
        document.querySelector("#feelsLike").innerHTML = "Feels Like : " + data.feelsLike + "°c";
        document.querySelector("#tempMin").innerHTML = data.tempMin + "°c";
        document.querySelector("#tempMax").innerHTML = data.tempMax + "°c";
        document.querySelector("#windSpeed").innerHTML = (data.windSpeed*3.6).toFixed(1)+"kmph";
    } else {
        document.querySelector("#temp").innerHTML = data.temp + "°F";
        document.querySelector("#feelsLike").innerHTML = "Feels Like : " + data.feelsLike + "°F";
        document.querySelector("#tempMin").innerHTML = data.tempMin + "°F";
        document.querySelector("#tempMax").innerHTML = data.tempMax + "°F";
        document.querySelector("#windSpeed").innerHTML = (data.windSpeed*1.609).toFixed(1)+"kmph";
    }
    document.querySelector("#weathericon").src = "http://openweathermap.org/img/wn/"+data.weathericon+"@2x.png";
    document.querySelector("#disc").innerHTML = data.disc;
    document.querySelector("#disc").style.textTransform = "capitalize";
    document.querySelector("#clouds").innerHTML = data.clouds+"%";
    document.querySelector("#humidity").innerHTML = data.humidity+"%";
    document.querySelector("#visibility").innerHTML = (data.visibility/1000).toFixed(1)+"km";
    
}

init('pune', 'metric');

unitselect.onchange = toggleChanged;
cityselect.onchange = toggleChanged;

function toggleChanged() {
    console.log(unitselect.value);
    console.log(cityselect.value);

    if (cityselect.value == '') {
        init('pune', unitselect.value);
    } else {
        init(cityselect.value, unitselect.value);
    }
}