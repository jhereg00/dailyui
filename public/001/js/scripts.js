// add .has-value class to inputs
var inputEls = document.querySelectorAll('input');
for (var i = 0, len = inputEls.length; i < len; i++) {
  inputEls[i].addEventListener('change', function (e) {
    if (this.value) {
      this.classList.add('has-value');
    }
    else {
      this.classList.remove('has-value');
    }
  });
  inputEls[i].addEventListener('blur', function (e) {
    this.classList.add('touched');
  });
}

// listen for change to player type
var playerTypeEls = document.getElementsByName('playertype');
var containerEl = document.querySelector('.signup__container');
for (var i = 0, len = playerTypeEls.length; i < len; i++) {
  playerTypeEls[i].addEventListener('change', function (e) {
    for (var j = 0, len = playerTypeEls.length; j < len; j++) {
      if (playerTypeEls[j] !== this) {
        containerEl.classList.remove(playerTypeEls[j].value)
      }
    }
    containerEl.classList.add(this.value)
  });
}
