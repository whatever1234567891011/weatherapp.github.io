const apiKey = '0b4df7190760555b882d46075ca084b6'
function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const currentWeather = document.querySelector('#current-weather');
        currentWeather.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>${new Date().toLocaleDateString()}</p>
          <p>${data.weather[0].description}</>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Feels like: ${data.main.feels_like}°C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind speed: ${data.wind.speed} m/s</p>
        `;
      })
      .catch(error => {
        console.log(error);
        alert('Unable to get weather data. Please try again.');
      });
  
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
        displayForecast(dailyData);
      })
      .catch(error => {
        console.log(error);
        alert('Unable to get forecast data. Please try again.');
      });
  }
  
  function displayForecast(dailyData) {
    const forecastItems = document.querySelector('.forecast-items');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    forecastItems.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Weather</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          ${dailyData.slice(1, 8).map(day => `
            <tr>
              <td>${new Date(day.dt * 1000).toLocaleDateString()}</td>
              <td>${daysOfWeek[new Date(day.dt * 1000).getDay()]}</td>
              <td><img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">${day.weather[0].description}</td>
              <td>${day.main.temp}°C</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  
  const searchBtn = document.querySelector('#search-btn');
  searchBtn.addEventListener('click', () => {
    const cityInput = document.querySelector('#city-input');
    let city = cityInput.value.trim();
    if (city.length === 0) {
      city = 'Delhi';
    }
    getWeatherData(city);
  });
  
  getWeatherData('Delhi');
  