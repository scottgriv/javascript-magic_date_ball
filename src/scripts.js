window.onload = function () {
  var ball = document.querySelector(".ball")
  var isPressed = false
  var hasActivated = false // Ensures first button press works

  ball.addEventListener("click", function () {
    const randomDate = generateFutureDate()
    triggerAnswerChange(randomDate)
    hasActivated = true
  })

  ball.addEventListener("touchstart", function () {
    const randomDate = generateFutureDate()
    triggerAnswerChange(randomDate)
    hasActivated = true
  })

  function generateFutureDate() {
    const today = new Date()
    const currentYear = today.getFullYear()
    let futureDate

    const start = new Date(today)
    start.setDate(today.getDate() + 1) // Start from tomorrow

    const end = new Date(currentYear, 11, 31) // Dec 31st

    do {
      // Calculate a random time between tomorrow and Dec 31st
      const timeDiff = end.getTime() - start.getTime()
      const randomTimeOffset = Math.floor(Math.random() * timeDiff)
      futureDate = new Date(start.getTime() + randomTimeOffset)

      // Round to nearest whole day
      futureDate.setHours(0, 0, 0, 0)
    } while (
      futureDate.getDay() === 0 || // Sunday
      futureDate.getDay() === 6 // Saturday
    )

    return formatDate(futureDate)
  }

  function generateRandomWeekdayInRange(weeksAhead) {
    var today = new Date()
    var futureDate = new Date(today)

    // Move to the start of the next full week (Monday)
    futureDate.setDate(today.getDate() + (8 - today.getDay()) + weeksAhead * 7)

    // Get a random weekday from Monday to Friday
    var randomOffset = getRandomInt(0, 4)
    futureDate.setDate(futureDate.getDate() + randomOffset)

    return formatDate(futureDate)
  }

  function formatDate(date) {
    var month = date.getMonth() + 1
    var day = date.getDate()
    var year = date.getFullYear()
    return `${padZero(month)}-${padZero(day)}-${year}`
  }

  function padZero(number) {
    return number.toString().padStart(2, "0")
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Event Listeners for Buttons
  function setupButton(buttonId, weeksAhead) {
    document.getElementById(buttonId).addEventListener("click", function () {
      if (!hasActivated) {
        hasActivated = true
      }

      const offsetDate = generateRandomWeekdayInRange(weeksAhead)
      triggerAnswerChange(offsetDate)
    })
  }

  setupButton("btn-next-week", 0)
  setupButton("btn-2-weeks", 1)
  setupButton("btn-3-weeks", 2)
  setupButton("btn-4-weeks", 3)
  setupButton("btn-5-weeks", 4)

  function updateDateDisplayWithOffset(weeksAhead) {
    var answers = document.querySelectorAll(".answer")
    var randomDate = generateRandomWeekdayInRange(weeksAhead)
    var isUp = Math.random() < 0.5

    answers.forEach(function (answer) {
      answer.textContent = randomDate
      answer.className = "answer " + (isUp ? "up" : "down")
    })
  }
}

function triggerAnswerChange(dateText) {
  const answers = document.querySelectorAll(".answer")
  const isUp = Math.random() < 0.5

  answers.forEach(function (answer) {
    answer.style.transition = "opacity 1.5s"
    answer.style.opacity = "0"

    setTimeout(() => {
      answer.textContent = dateText
      answer.className = "answer " + (isUp ? "up" : "down")
      answer.style.opacity = "1"
    }, 1500)
  })
}
