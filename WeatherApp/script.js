$(() => {
  //ensure no localstorage keys are null
  initialiseLocalStorage()

  //depending on the users preferences, go to the weather page or remain on the city page and update the checkbox to reflect its value
  if (localStorage.getItem("alwaysShowWeather") == "true" && localStorage.getItem("changeCityRequest") == "false") {
    $("#userInput").hide()
    if (localStorage.getItem("location") == "unset") {
      getWeather(false)
    } else {
      getWeather(localStorage.getItem("location"))
    }
  } else {
    $("#alwaysShowWeather").prop('checked', localStorage.getItem("alwaysShowWeather") == "true" ? true : false)
  }

  //update the page to match the city in localstorage
  updateCity()

  //event for setting the city
  $("#cityForm").submit((event) => {
    event.preventDefault()
    city = $("#cityInput").val()

    localStorage.setItem("location", city)
    updateCity()
  })

  //event for resetting the location
  $("#resetLocation").click(() => {
    localStorage.setItem("location", "unset")
    $("#cityInput").val("")
    updateCity()
  })

  //event for getting the weather
  $("#getWeather").click(() => {
    $("#userInput").hide()
    if (localStorage.getItem("location") == "unset") {
      getWeather(false)
    } else {
      getWeather(localStorage.getItem("location"))
    }
  })

  //set localstorage when this checkbox is changed
  $("#alwaysShowWeather").change(() => {
    localStorage.setItem("alwaysShowWeather", $("#alwaysShowWeather").prop('checked'))
  })

  //event for changing the city from the weather page
  $("#changeCity").click(() => {
    localStorage.setItem("changeCityRequest", true)
    location.reload()
  })

  //get the data
  function getWeather(currentLocation) {
    if (!currentLocation) {
      url = "https://wttr.in/?format=j1"
    } else {
      url = `https://wttr.in/${currentLocation}?format=j1`
    }

    $("#status").show()
    animateLoadingStatus()

    $.getJSON(url, (weather) => {
      updatePage(weather)
    }).fail(() => {
      $("#locationStatus").text("That's not a valid city")
      $("#userInput").show()
      $("#status").hide()
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

    $("#status").hide()
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
      $("#locationStatus").html("No location is currently set<br>Your current location will be used if you continue anyways")
    } else {
      $("#locationStatus").text(`Your current city is ${localStorage.getItem("location")}`)
    }
  }

  function initialiseLocalStorage() {
    if (localStorage.getItem("location") == null) {
      localStorage.setItem("location", "unset")
    }
    if (localStorage.getItem("alwaysShowWeather") == null) {
      localStorage.setItem("alwaysShowWeather", false)
    }
    if (localStorage.getItem("changeCityRequest") == null) {
      localStorage.setItem("changeCityRequest", false)
    }
  }

  async function animateLoadingStatus() {
    counter = 0
    while (!$("#status").is(":hidden")) {
      switch (counter % 3) {
        case 0:
          $("#status").text("Getting weather data.")
          break
        case 1:
          $("#status").text("Getting weather data..")
          break
        case 2:
          $("#status").text("Getting weather data...")
          break
      }
      counter++
      await new Promise(r => setTimeout(r, 400))
    }
  }
})