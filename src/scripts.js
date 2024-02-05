window.onload = function() {
    var ball = document.querySelector('.ball');
    var isPressed = false;
  
    ball.addEventListener('mousedown', function() {
      isPressed = true;
    });
  
    ball.addEventListener('mouseup', function() {
      if (isPressed) {
        updateDateDisplay();
        isPressed = false;
      }
    });
  
    function updateDateDisplay() {
      var answers = document.querySelectorAll('.answer');
      var randomDate = generateFutureDate();
      var isUp = Math.random() < 0.5;
  
      answers.forEach(function(answer) {
        answer.textContent = randomDate;
        answer.className = 'answer ' + (isUp ? 'up' : 'down');
      });
    }
  
    function generateFutureDate() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
  
      if (month === 12) {
        month = 1;
        year += 1;
      } else {
        month += getRandomInt(1, 12 - month);
      }
  
      var daysInMonth = getDaysInMonth(month, year);
      day = getRandomInt(1, daysInMonth);
  
      return `${padZero(month)}-${padZero(day)}-${year}`;
    }
  
    function getDaysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
  
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    function padZero(number) {
      return number.toString().padStart(2, '0');
    }
  };
  