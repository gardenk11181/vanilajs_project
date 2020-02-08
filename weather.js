const weather = document.querySelector(".js-weather");

const API_KEY = "fa74aceeb578d82a17dbca839fe8941c"; // API : Application Programming Interface 서버로부터 손쉽게 데이터 겟
const COORDS = 'coords';

function getWeather(lat,lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric` 
           // units=metrix : 단위 바꾸기
        ).then(function(response){ // fetch가 완료된 후에 진행하기 위함. 실행만 시키고 넘어갈 수 있는 듯 함. 
            return response.json();
        }).then( // 역시 가져온 json으로 무언갈 하려면 기다려야 함.
            function(json) {
                const temperature = json.main.temp;
                const place = json.name;
                weather.innerText = `${temperature} @ ${place}`;
            }
        );

}
//javascript는 새로고침 없이 데이터를 가져올 수 있게 해줌. like gmail

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude, // latitude,로 생략 가능
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Can't access GeoLocation");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords ==null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function weatherInit() {
    loadCoords();
}

weatherInit();