window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDegree = document.querySelector('.temperature-degree')
    let temperatureDescription = document.querySelector('.temperature-description')
    let locationTimezone = document.querySelector('.location-timezone')
    let img = document.querySelector('.img')
    let degreeSection = document.querySelector('.degree-section')
    let degreeSectionSpan = document.querySelector('.degree-section span')


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=75a8d594b0a2141b02960e6f1bdfe36a`;
            fetch(api).then(response => {
                return response.json();
            }).then(response=>{
                let temperature = response.main.temp;
                let summary = response.weather[0].description;
                let location = response.name
                let country = response.sys.country
                let iconId = response.weather[0].icon

                console.log(response)
                console.log(temperature)
                console.log(summary)

                temperatureDegree.textContent = (temperature-273.15).toFixed(1);
                temperatureDescription.textContent = summary.toUpperCase();
                locationTimezone.textContent = `${location}, ${country}`;
                img.innerHTML = `<img src="icons/${iconId}.png"></div>`

                degreeSection.addEventListener('click', ()=>{
                    if(degreeSectionSpan.textContent === 'C'){
                        degreeSectionSpan.textContent = 'F'
                        temperatureDegree.textContent = (((temperature-273.15) * 9/5)+32).toFixed(1)
                    }
                    else{
                        degreeSectionSpan.textContent = 'C'
                        temperatureDegree.textContent = (temperature-273.15).toFixed(1)
                    }

            })

            });
        });
    }

})







