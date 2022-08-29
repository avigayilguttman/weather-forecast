const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7650c9050emshb63252a35e42624p1d101djsn4c3ee8d55df3',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=Jerusalem&days=3', options)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new error('error getting weather info from API')
        }
    })
    .then(data => {
        console.log(data)
        displayCocktail(data)
    })
    .catch(err => console.error(err));


function displayCocktail(data) {
    console.log('Working to display: ' + data)
    const current_data = data['current'];
    console.log(current_data)

    const current_weath_div = document.getElementById("current_weath");

    // NAME AND TEMP
    const city = data['location'].name
    const curr_f_temp = current_data.temp_f;
    const curr_c_temp = current_data.temp_c;
    const heading = document.createElement("h1");
    heading.innerHTML = city + ': ' + curr_f_temp + '&#176; F (' + curr_c_temp + '&#176; C)';
    current_weath_div.appendChild(heading);


    // DESC AND IMAGE 
    const condition = current_data.condition['text']
    var condition_img = current_data.condition['icon']
    const heading2 = document.createElement("h2");
    heading2.innerHTML = condition;
    current_weath_div.appendChild(heading2);

    //img was missing https and would not load
    condition_img = 'https:' + condition_img
    console.log('img: ' + condition_img)

    const current_cond_img = document.createElement("img");
    current_cond_img.src = condition_img
    current_weath_div.appendChild(current_cond_img);
    document.body.style.backgroundImage = "url('" + current_cond_img + "')";

    //WIND SPEED (MPH), WIND DIRECTION, HUMIDITY, FEELS LIKE
    const wind_speed_mph = current_data.gust_mph;
    const wind_direction = current_data.wind_dir;
    const humidity = current_data.humidity;
    const feels_like = current_data.feelslike_f;
    const weath_details = "Wind Speed (mph): " + wind_speed_mph + ", Wind Direction: " + wind_direction + "<br />"
        + "Humidity: " + humidity + ", Feels Like: " + feels_like + '&#176;';
    const heading3 = document.createElement("h2");
    heading3.innerHTML = weath_details
    current_weath_div.appendChild(heading3)


    const forecast = data['forecast'].forecastday
    console.log(forecast)
    let min_temps = forecast.map(a => a['day'].mintemp_f);
    let max_temps = forecast.map(a => a['day'].maxtemp_f);
    console.log('min: ' + min_temps + ', max: ' + max_temps)

    let dates = forecast.map(a=> a['date'])

    //CONFIGURE THE CHART AND ITS DATA HERE
    const ctx = document.getElementById('weather_chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'High Temp',
                data: max_temps,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }, {
                label: 'Low Temp',
                data: min_temps,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }
            ]
        },
        options: {

            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    beginAtZero: true
                }
            }
        }
    });



}

