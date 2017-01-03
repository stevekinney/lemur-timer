import Timer from './lib/timer';
import renderTimerElement from './lib/render-timer-element';
import addElementToTimersSection from './lib/append-timer-element';
import fetchTimers from './lib/fetch-timers';
import {
  newTimerForm,
  newTimerFormTitle,
  newTimerFormDue,
  timersSection
} from './lib/selectors';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./worker.js')
      .then(registration => console.log('Registration successful'))
      .catch(error => console.error('Registration failed', error));
  });
}

newTimerForm.addEventListener('submit', (event) => {
  const title = newTimerFormTitle.value;
  const minutesFromNow = parseInt(newTimerFormDue.value, 10);
  const due = Date.now() + (1000 * 60 * minutesFromNow);

  Timer.create({ title, due })
        .then(renderTimerElement)
        .then(addElementToTimersSection)
        .then(clearForm);
});

const clearForm = () => {
  newTimerFormTitle.value = '';
  newTimerFormDue.value = '';
}

window.addEventListener('load', fetchTimers);
