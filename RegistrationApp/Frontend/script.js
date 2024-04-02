$(() => {
  $("#registrationForm").submit((event) => {
    event.preventDefault();

    var id = $("#id").val()
    var fullName = $("#fullName").val()
    var address = $("#address").val()
    var status = $("#status").val()

    if (status == "default") {
      $("#result").text("Please select a status")
      return
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:7000/submitForm",
      data: {
        id: id,
        fullName: fullName,
        address: address,
        status: status
      },
      success: (response) => {
        console.log(response)
        $("#result").text(response)
      },
      error: (error) => {
        $("#result").text(error)
      }
    })

  })
})