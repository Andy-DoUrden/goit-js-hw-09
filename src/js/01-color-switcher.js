const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

let intervalId = null;

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);

function onStartClick() {
  btnDisabledSwitcher();
  startBgColorSwitcher();
}

function onStopClick() {
  btnDisabledSwitcher();
  clearInterval(intervalId);
}

function btnDisabledSwitcher() {
  if (refs.start.disabled) {
    refs.start.disabled = false;
    refs.stop.disabled = true;
    return;
  }

  refs.start.disabled = true;
  refs.stop.disabled = false;
}

function startBgColorSwitcher() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
