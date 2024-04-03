$(() => {
  $("#registrationForm").submit((event) => {
    event.preventDefault();

    var id = $("#id").val()
    var fullName = $("#fullName").val()
    var address = $("#address").val()
    var status = $("#status").val()

    var url = "https://web-programming-assignment-2.onrender.com/submitForm"
    // var url = "http://localhost:7000/submitForm"

    if (status == "default") {
      $("#result").text("Please select a status")
      return
    }

    $.ajax({
      type: "POST",
      url: url,
      data: {
        id: id,
        fullName: fullName,
        address: address,
        status: status
      },
      success: (response) => {
        console.log(response)
        $("#userInput").hide()
        $("#result").text(response)
        $("#result").css("margin-top", "10%")
        $("#return").show()
      },
      error: (error) => {
        $("#result").text(error)
      }
    })

  })
})