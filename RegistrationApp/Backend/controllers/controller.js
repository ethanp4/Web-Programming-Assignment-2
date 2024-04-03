const submitForm = async (req, res) => {
  // console.log(req)
  var id = req.body.id
  var fullName = req.body.fullName
  var address = req.body.address
  var status = req.body.status
  var fee = 0

  switch (status) {
    case "student":
      fee = 10
      break
    case "staff":
      fee = 50
      break
    case "volunteer":
      fee = 0
      break
    default:
      fee = -10
  }

  if (fee == -10) {
    res.json("No status has been selected")
  } else {
    res.json(`${fullName} registered! Your fee is $${fee}.`)
  }

}

module.exports = { submitForm }