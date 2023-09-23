let day1 = document.getElementById("day-1")
let day2 = document.getElementById("day-2")
let day3 = document.getElementById("day-3")
let day4 = document.getElementById("day-4")
let day5 = document.getElementById("day-5")
let city = document.getElementsByTagName('input')[0]
let historyButtons = document.getElementById('history-buttons')
let searchButton = document.getElementById('search-button')
let currentWeather = {}
let weatherData = []
let pastSearches = localStorage.getItem('past-searches')?.split(',') || []

let searchElements = ''
for(let city of pastSearches){
    if (city.length){
        searchElements+='<button class=pastButton>'+city+'</button>'
        }
}
historyButtons.innerHTML=searchElements

function fillForecast(data){
    let icon = data.weather[0].icon
    let url = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        return `<div>
        <h3>${data.dt_txt.substring(0,10)}</h3>
            <img src=${url} alt= 'weatherIcon'/>
            <div>${Math.round((data.main.temp-273.15)*1.8+32)} &degF</div>
            <div>${data.wind.speed} MPH</div>
            <div>${data.main.humidity} %</div>
        </div>`
    }
function pastSearchClick(){
    console.log('ran', document.getElementsByClassName('pastButton'))
    if (pastSearches.length){
        for (let i=0; i<document.getElementsByClassName('pastButton').length; i++){
            document.getElementsByClassName('pastButton')[i].addEventListener('click',
            function(e){
                searchCity(e.target.innerText)
            }
            )
        }

    }
}

function searchCity(cityName) {
    pastSearches = localStorage.getItem('past-searches')?.split(',') || []
    if (pastSearches.length){
        if (!pastSearches.includes(cityName)){
            let updatedSearches = pastSearches.join(',')+','+cityName
            console.log(updatedSearches)
            localStorage.setItem('past-searches', updatedSearches)
            
        }

    }
    else localStorage.setItem('past-searches', cityName)
    searchElements = ''
    for(let city of pastSearches){
        if (city.length){
            searchElements+='<button class=pastButton>'+city+'</button>'
            }
    }
    historyButtons.innerHTML=searchElements
    pastSearchClick()

fetch("http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=374824bc713ef290f4643302b1e9424a")
    .then(response => response.json())
    .then(data => {
        
        currentWeather = (data.list[0]);
        weatherData = (data.list.filter((_,i)=>(i-4)%8===0));
        day1.innerHTML = fillForecast(weatherData[0])
        day2.innerHTML = fillForecast(weatherData[1])
        day3.innerHTML = fillForecast(weatherData[2])
        day4.innerHTML = fillForecast(weatherData[3])
        day5.innerHTML = fillForecast(weatherData[4])
        topCity.innerText = cityName
        topTemp.innerHTML = `Temp: ${Math.round((currentWeather.main.temp-273.15)*1.8+32)} &#8457;`
        // let topWind = document.getElementById("topWind")
        topWind.innerHTML = `Wind: ${currentWeather.wind.speed} MPH`
        topHumidity.innerText = `Humidity: ${currentWeather.main.humidity}%` 
       
    })
}
searchButton.addEventListener('click', ()=>{
    searchCity(city.value)
})
if (document.getElementsByClassName('pastButton').length){pastSearchClick()}
console.log(document.getElementsByClassName('pastButton'))