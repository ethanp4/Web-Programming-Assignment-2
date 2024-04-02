$(() => {
  url = "https://wttr.in/?format=j1"
  $.getJSON(url, (weather) => {
    console.log(weather)
    updatePage(weather)
  })


  //add the data to the page
  function updatePage(weather) {
    let outlook = weather.current_condition[0].weatherDesc[0].value
    let city = weather.nearest_area[0].areaName[0].value
    let current = weather.current_condition[0].temp_C
    let high = weather.weather[0].maxtempC
    let low = weather.weather[0].mintempC
    let sunrise = weather.weather[0].astronomy[0].sunrise
    let sunset = weather.weather[0].astronomy[0].sunset

    $("#nogeo").hide()
    $("#header").show()
    $("#content").show()

    $("#header").text(`It's ${current}°C and ${outlook.toLowerCase()} in ${city}`)
    $("#high").text(`${high}°C`)
    $("#low").text(`${low}°C`)

    $("#sunrise").text(sunrise)
    $("#sunset").text(sunset)
  }
})