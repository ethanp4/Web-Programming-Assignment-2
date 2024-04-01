$(() => {
  // if the browser supports geolocation 
  if (navigator.geolocation) {
    //get the location and send it to callback function
    navigator.geolocation.getCurrentPosition(getCoordsFromGeolocation)
  }

  //organise coords and then get the weather
  function getCoordsFromGeolocation(location) {
    let latitude = location.coords.latitude
    let longitude = location.coords.longitude

    console.log(location)

    getWeather(latitude, longitude)
  }

  //if geolocation wasnt used
  function getCoordsFromUser() {

    getWeather(latitude, longitude)
  }

  //finally fetch the url here
  function getWeather(latitude, longitude) {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=1`
    $.getJSON(url, (weather) => {
      console.log(weather)
      updatePage(weather, location)
    })
  }

  //add the data to the page
  function updatePage(weather) {
    outlook = lookupWeatherCode(weather.current.weather_code)
    $("#header").text(`It's currently ${weather.current.temperature_2m}${weather.current_units.temperature_2m} and ${outlook} in your location`)
    $("#high").text(`${weather.daily.temperature_2m_max[0]}${weather.current_units.temperature_2m}`)
    $("#low").text(`${weather.daily.temperature_2m_min[0]}${weather.current_units.temperature_2m}`)

    $("#sunrise").text(`${weather.daily.sunrise}`.substring(11, 16))
    $("#sunset").text(`${weather.daily.sunset}`.substring(11, 16))
  }

  //convert wmo weather code to string https://open-meteo.com/en/docs/#weathervariables
  function lookupWeatherCode(code) {
    switch (code) {
      case 0:
        return "clear";
      case 1:
      case 2:
      case 3:
        return "partly cloudy";
      case 45:
      case 48:
        return "foggy";
      case 51:
      case 53:
      case 55:
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        return "raining";
      case 56:
      case 57:
      case 66:
      case 67:
        return "sleeting";
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return "snowing";
      case 95:
      case 96:
      case 99:
        return "storming";
    }
  }
})