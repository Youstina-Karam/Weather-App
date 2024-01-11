async function getData(search) {
  let data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=3f4cf6eaff084d678cd22444241001&q=${search}&days=3`
  );
  let res = await data.json();
  displayToday(res.current, res.location);
  displayAnotherDays(res.forecast.forecastday);
}
getData("cairo");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayToday(current, location) {
  const d = new Date(current.last_updated);
  let data = `
 <div class="card">
 <div
   class="card-header px-4 d-flex justify-content-between align-items-center">
   <p>Today</p>
   <p>${d.getDate()}${months[d.getMonth()]}</p>
 </div>
 <div class="card-body text-start mx-3">
   <h3 class="card-title">${location.name}</h3>
   <p class="card-text d-inline-block h1">${current.temp_c}<sup>o</sup>C</p>
   <div class="forecast-icon d-inline-block">
   <img src="https:${current.condition.icon}" alt="" width=90>
   </div>
   <p class="primary">${current.condition.text}</p>
   <div class="iconDetails">
     <span><i class="fa-solid fa-umbrella mx-2"></i>${
       current.wind_degree
     }</span>
     <span><i class="fa-solid fa-wind mx-2"></i>${current.vis_km}km/h</span>
     <span><i class="fa-regular fa-compass mx-2"></i>East</span>
   </div>
 </div>
</div>
 `;
  document.getElementById("forecast").innerHTML = data;
}

function displayAnotherDays(forecast) {
  let anotherDays = ``;
  for (let i = 1; i < forecast.length; i++) {
    const d = new Date(forecast[i].date);
    anotherDays += `
    <div class="card">
    <div
      class="card-header px-4 d-flex justify-content-between align-items-center">
      <p>${days[d.getDay()]} </p>
      <p>${d.getDate()}${months[d.getMonth()]}</p>
    </div>
    <div class="card-body">
    <div class="forecast-icon">
    <img src="https:${forecast[i].day.condition.icon}" alt="" width=90>
    </div>
      <p class="card-text h1">${forecast[i].day.maxtemp_c}<sup>o</sup>C</p>
      <p class="card-text ">${forecast[i].day.mintemp_c}<sup>o</sup>C</p>
     
      <p class="primary">${forecast[i].day.condition.text}</p>
    </div>
   </div>
    `;
  }

  document.getElementById("forecast").innerHTML += anotherDays;
}

var search = document.getElementById("search");

search.addEventListener("keyup", (e) => {
  getData(e.target.value);
});
