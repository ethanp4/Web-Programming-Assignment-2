$(() => {
  if (localStorage.getItem("location") == null) {
    localStorage.setItem("location", "unset")
  }
  if (localStorage.getItem("alwaysShowWeather") == null) {
    localStorage.setItem("alwaysShowWeather", false)
  }
  if (localStorage.getItem("changeCityRequest") == null) {
    localStorage.setItem("changeCityRequest", false)
  }

  if (localStorage.getItem("alwaysShowWeather") == "true" && localStorage.getItem("changeCityRequest") == "false") {
    $("#userInput").html("Getting weather data...")
    if (localStorage.getItem("location") == "unset") {
      getWeather(false)
    } else {
      getWeather(localStorage.getItem("location"))
    }
  } else {
    $("#alwaysShowWeather").prop('checked', localStorage.getItem("alwaysShowWeather") == "true" ? true : false)
  }

  updateCity()

  $("#changeCity").click(() => {
    localStorage.setItem("changeCityRequest", true)
    location.reload()
  })

  $("#cityForm").submit((event) => {
    event.preventDefault()
    city = $("#cityInput").val()

    localStorage.setItem("location", city)
    updateCity()
  })

  $("#resetLocation").click(() => {
    localStorage.setItem("location", "unset")
    $("#cityInput").val("")
    updateCity()
  })

  $("#getWeather").click(() => {
    $("#userInput").html("Getting weather data...")
    if (localStorage.getItem("location") == "unset") {
      getWeather(false)
    } else {
      getWeather(localStorage.getItem("location"))
    }
  })

  $("#alwaysShowWeather").change(() => {
    localStorage.setItem("alwaysShowWeather", $("#alwaysShowWeather").prop('checked'))
  })

  function getWeather(currentLocation) {
    if (!currentLocation) {
      url = "https://wttr.in/?format=j1"
    } else {
      url = `https://wttr.in/${currentLocation}?format=j1`
    }

    $.getJSON(url, (weather) => {
      updatePage(weather)
    })
  }

  //add the data to the page
  function updatePage(weather) {
    let outlook = weather.current_condition[0].weatherDesc[0].value
    let city = weather.nearest_area[0].areaName[0].value
    let current = weather.current_condition[0].temp_C
    let high = weather.weather[0].maxtempC
    let low = weather.weather[0].mintempC
    let sunrise = weather.weather[0].astronomy[0].sunrise
    let sunset = weather.weather[0].astronomy[0].sunset

    $("#userInput").hide()

    $("#header").show()
    $("#content").show()

    $("#header").text(`It's ${current}°C and ${outlook.toLowerCase()} in ${city}`)
    $("#high").text(`${high}°C`)
    $("#low").text(`${low}°C`)

    $("#sunrise").text(sunrise)
    $("#sunset").text(sunset)

    localStorage.setItem("changeCityRequest", false)
    localStorage.setItem("location", city)
  }

  function updateCity() {
    if (localStorage.getItem("location") == "unset") {
      $("#locationStatus").html("No location is currently set<br>Your current location will be used")
    } else {
      $("#locationStatus").text(`Your current city is ${localStorage.getItem("location")}`)
    }
  }
})